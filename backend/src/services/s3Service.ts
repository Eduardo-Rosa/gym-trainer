import AWS from 'aws-sdk';
import { config } from 'dotenv';

config();

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
  httpOptions: { timeout: 5000 },
  maxRetries: 3
});

export const getSignedImageUrl = async (s3Key: string): Promise<string> => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: s3Key,
      Expires: parseInt(process.env.S3_SIGNED_URL_EXPIRE || '300')
    };

    return await s3.getSignedUrlPromise('getObject', params);
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate signed URL');
  }
};

export const uploadImageToS3 = async (file: Express.Multer.File, userId: string) => {
  try {
    const key = `exercises/${userId}-${Date.now()}-${file.originalname}`;

    await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'private'
    }).promise();

    return key;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload image');
  }
};