import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  
    const data = await req.formData();
    
    if (data.get('file')) {
    const file = data.get('file');

    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const bucketName = 'hikeko-web-admin';
   await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file.type,
      Body: buffer,
    }));

  
    const link = 'https://'+bucketName+'.s3.amazonaws.com/'+newFileName;
    return Response.json(link)
  }
    return Response.json(true);
}
