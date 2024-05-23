import AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

var route53 = new AWS.Route53();

export const getDomains = async(req, res, next) => {
    try {
        const domains = await route53.listHostedZones().promise();
        console.log(domains);
        return res.status(200).json(domains.HostedZones)
    } catch (error) {
        next(error)
    }
}
export const createHostedZone = async (req,res)=>{
    try {
      const {domainName,description} = req.body;
      console.log(req.body)
      if (!domainName){
        return res.status(400).json("Domain name is required");
        }

        const params = {
            CallerReference: `${Date.now()}`,
            Name: domainName,
            HostedZoneConfig: {
              Comment: description
            }
          };
          
  
      const result = await route53.createHostedZone(params).promise();
      return res.status(201).json(result.HostedZone.Id)
    } catch (error) {
      console.error('Error creating hosted zone:', error);
      return res.status(500).json('Error deleting hosted zone:', error);
      
    }
  }
  
  export const deleteHostedZone = async (req,res) => {
    try {
      const {hostedZoneId} = req.params
      console.log('id- ',req.params)
      const params = {
        Id: hostedZoneId, 
      };
      const result = await route53.deleteHostedZone(params).promise();
      console.log('Hosted zone deleted:', hostedZoneId);
      return res.status(200).json("Successfully Deleted the Record")
    } catch (error) {
      return  res.status(500).json({'Error deleting hosted zone' : error});
    }
  }