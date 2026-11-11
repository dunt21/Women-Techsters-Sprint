import {
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME } from "../config/storage.js";

/**
 * Upload a file/buffer to Neon Object Storage
 */
export async function uploadFile(key, body, contentType = "application/octet-stream") {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  return await s3Client.send(command);
}

/**
 * List files in the bucket
 */
export async function listFiles(prefix = "") {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });
  return await s3Client.send(command);
}

/**
 * Get an object stream from the bucket
 */
export async function getFile(key) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  return await s3Client.send(command);
}

/**
 * Delete an object from the bucket
 */
export async function deleteFile(key) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  return await s3Client.send(command);
}

/**
 * Verify end-to-end object storage connectivity
 */
export async function testStorageConnection() {
  const testKey = `test-health-${Date.now()}.txt`;
  // 1. Put test object
  await uploadFile(testKey, "Neon Object Storage Connected", "text/plain");
  // 2. List objects
  const listResult = await listFiles();
  // 3. Delete test object
  await deleteFile(testKey);

  return {
    status: "ok",
    bucket: BUCKET_NAME,
    objectCount: listResult.KeyCount ?? 0,
  };
}

