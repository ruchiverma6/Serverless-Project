import * as AWS from 'aws-sdk'
import { String } from 'aws-sdk/clients/cloudsearch';
//import * as AWSXRay from 'aws-xray-sdk'
const urlExp = process.env.SIGNED_URL_EXPIRATION
//const XAWS = AWSXRay.captureAWS(AWS)
const S3 = new  AWS.S3({
    signatureVersion: 'v4'
})
const bucket = process.env.ATTACHMENT_S3_BUCKET
// TODO: Implement the fileStogare logic
export async function createUploadPresignedUrl(todoId:string): Promise<String>{
   
    const uploadUrl = await S3.getSignedUrl("putObject", {
        Bucket: bucket,
        Key: todoId,
        Expires: parseInt(urlExp)
    });
    console.log('createUploadPresignedUrl'+uploadUrl)
    return uploadUrl;
    }