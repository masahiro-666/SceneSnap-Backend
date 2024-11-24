const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

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

async function generateUploadURL(contentType = 'image/jpeg') {
  try {
    // Generate random image name
    const rawBytes = await randomBytes(16);
    const imageName = `${Date.now()}-${rawBytes.toString('hex')}`; // Add timestamp to avoid collisions

    // Create S3 upload parameters
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: imageName,
      ContentType: contentType, // Dynamically set the content type
    });

    // Generate the signed URL for upload
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return uploadURL;
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw new Error('Error generating upload URL');
  }
}

module.exports = { generateUploadURL };