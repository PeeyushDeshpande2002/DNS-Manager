import AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

var route53 = new AWS.Route53();

export const getHostedZones = async (req, res) => {
    try {
        const {hostedZoneId} =  req.params;
        console.log(hostedZoneId);
        const { HostedZones } = await route53.listHostedZones().promise();
        // const hostedZoneId = HostedZones[0].Id; 
        
        const params = {
          HostedZoneId: hostedZoneId
        };
    
        const data = await route53.listResourceRecordSets(params).promise();
        const records = data.ResourceRecordSets;
    
        res.json(records);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
};
export const createDnsRecord = () => {};
export const updateDnsRecord = () => {};
export const deleteDnsRecord = () => {};
