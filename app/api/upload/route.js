import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const ext = file.name.split('.').pop();
    const newFileName = uniqid() + '.' + ext;

    const buffer = await file.arrayBuffer();  // Get file as array buffer

    const bucketName = 'hikeko-web-admin';
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file.type,
      Body: Buffer.from(buffer),  // Convert array buffer to Buffer
    });

    await s3Client.send(command);

    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    return new Response(JSON.stringify({ link }), { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
