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
    const { id } = req.params;
    console.log(typeof id);
    const data = await route53
      .listResourceRecordSets({
        HostedZoneId: id,
      })
      .promise();
    const records = data.ResourceRecordSets;

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const createDnsRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recordName, recordType, value, ttl, alias } = req.body;
    //console.log(recordName, recordType, value, ttl, alias);

    const params = {
      ChangeBatch: {
        Changes: [
          {
            Action: "CREATE",
            ResourceRecordSet: {
              Name: recordName,
              Type: recordType,
              TTL: ttl, // TTL in seconds
              ResourceRecords: [{ Value: value }],
            },
          },
        ],
      },
      HostedZoneId: id,
    };
    const response = await route53.changeResourceRecordSets(params).promise();
    console.log(response, "e]re]s");
    return res.status(200).json({ message: "Successfully created the record" });
  } catch (error) {
    next(error);
  }
};
export const updateDnsRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldRecord, newRecord } = req.body;
    console.log("update - ", req.body);
    if (oldRecord.Type !== "SOA") {
      const params = {
        HostedZoneId: id,
        ChangeBatch: {
          Changes: [
            {
              Action: "DELETE",
              ResourceRecordSet: {
                Name: oldRecord.Name,
                Type: oldRecord.Type,
                TTL: oldRecord.TTL,
                ResourceRecords: oldRecord.ResourceRecords
              },
            },
          ],
        },
      };
      const newparams = {
        HostedZoneId: id,
        ChangeBatch: {
          Changes: [
            {
              Action: 'UPSERT',
              ResourceRecordSet: {
                Name: newRecord.recordName,
                Type: newRecord.recordType,
                TTL: newRecord.ttl,
                ResourceRecords: [{Value : newRecord.values}],
              },
            },
          ],
        }}
        await route53.changeResourceRecordSets(params).promise();
      await route53.changeResourceRecordSets(newparams).promise();

      res.json({ message: "DNS record updated successfully" });
  }} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDnsRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Type, TTL, ResourceRecords } = req.body;
    console.log("delete", );
    if (Type !== "SOA") {
      const params = {
        HostedZoneId: id,
        ChangeBatch: {
          Changes: [
            {
              Action: "DELETE",
              ResourceRecordSet: {
                Name: Name,
                Type: Type,
                TTL: TTL,
                ResourceRecords: ResourceRecords,
              },
            },
          ],
        },
      };

      await route53.changeResourceRecordSets(params).promise();

      res.json({ message: "DNS record deleted successfully" });
    } else {
      res
        .status(400)
        .json({
          message:
            "Cannot delete the SOA record. Hosted zone must contain exactly one SOA record.",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
