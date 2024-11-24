const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { randomBytes } = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const region = 'ap-southeast-1';
const bucketName = 'scenesnap-buckets';

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function generateUploadURL() {
  const rawBytes = randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new PutObjectCommand(params);

  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return uploadURL;
}

module.exports = { generateUploadURL };