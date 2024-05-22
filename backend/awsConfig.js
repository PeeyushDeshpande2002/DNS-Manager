import AWS from 'aws-sdk';
import 'dotenv/config';

const configureAWS = () => {
    try {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'ap-south-1',
        });
        console.log('AWS configured successfully!');
    } catch (error) {
        console.log('AWS auth failed connecting - ', error.message);
    }
};
//configureAWS();
export default configureAWS;

const testConnection = () => {
  const route53 = new AWS.Route53();
  route53.listHostedZones({}, (err, data) => {
      if (err) {
          console.log('Error:', err);
      } else {
          console.log('Hosted Zones:', data.HostedZones);
      }
  });
};

//testConnection();