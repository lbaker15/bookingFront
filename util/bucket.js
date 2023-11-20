import * as dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk';

export const bucket = 'photos';


export const s3 = new AWS.S3({
  endpoint: 'http://s3-eu-west-2.amazonaws.com/imageuploads1892',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sslEnabled: false,
  s3ForcePathStyle: true,
});
