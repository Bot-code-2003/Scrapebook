import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize the client
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadToR2(buffer, filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await r2Client.send(command);
    return `${process.env.R2_PUBLIC_URL}/${filename}`;
  } catch (error) {
    console.error("R2 Upload Error:", error);
    throw error;
  }
}

export async function deleteFromR2(filename) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
    });

    try {
        await r2Client.send(command);
        console.log(`Deleted ${filename} from R2`);
        return true;
    } catch (error) {
        console.error("R2 Delete Error:", error);
        // Don't throw, just log so we don't block DB delete
        return false;
    }
}
