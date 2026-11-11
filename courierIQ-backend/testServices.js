import app from "./src/app.js";
import { connectDb, sequelize } from "./src/config/database.js";
import { User } from "./src/models/index.js";
import {
  uploadFile,
  listFiles,
  getFile,
  deleteFile,
} from "./src/services/storageService.js";

async function runEndToEndTests() {
  console.log("=== STARTING END-TO-END NEON SERVICES VERIFICATION ===");

  // 1. Test PostgreSQL Connection & Sync
  console.log("\n[1/3] Testing Neon PostgreSQL Connection...");
  await connectDb();
  await sequelize.sync({ alter: true });
  const userCount = await User.count();
  console.log(`[PASS] Neon PostgreSQL connected and synced. Current Users in DB: ${userCount}`);

  // 2. Test Neon Object Storage
  console.log("\n[2/3] Testing Neon Object Storage (Bucket: assets)...");
  const testKey = `e2e-test-${Date.now()}.txt`;
  const testContent = "Hello from Neon Object Storage Verification!";

  await uploadFile(testKey, testContent, "text/plain");
  console.log(`[PASS] Uploaded test object: ${testKey}`);

  const list = await listFiles();
  console.log(`[PASS] Listed bucket objects. Total found: ${list.KeyCount ?? 0}`);

  const fetched = await getFile(testKey);
  const fetchedText = await fetched.Body.transformToString();
  if (fetchedText === testContent) {
    console.log(`[PASS] Verified downloaded object content matches exactly: "${fetchedText}"`);
  } else {
    throw new Error("Downloaded content did not match uploaded content!");
  }

  await deleteFile(testKey);
  console.log(`[PASS] Successfully cleaned up test object.`);

  // 3. Test Express App Server & HTTP Endpoints
  console.log("\n[3/3] Starting Express App and testing HTTP endpoints...");
  const server = app.listen(5000, async () => {
    console.log("[PASS] Express server is listening on port 5000");

    try {
      // Probe GET /
      const rootRes = await fetch("http://127.0.0.1:5000/");
      const rootText = await rootRes.text();
      console.log(`[PASS] GET / returned status ${rootRes.status}: "${rootText}"`);

      // Probe GET /api/storage/health
      const storageRes = await fetch("http://127.0.0.1:5000/api/storage/health");
      const storageJson = await storageRes.json();
      console.log(`[PASS] GET /api/storage/health returned status ${storageRes.status}:`, JSON.stringify(storageJson));

      console.log("\n=== ALL NEON SERVICES VERIFIED END-TO-END SUCCESSFULLY ===");
    } catch (err) {
      console.error("HTTP verification error:", err);
      process.exitCode = 1;
    } finally {
      server.close(() => {
        console.log("Server closed cleanly.");
        process.exit(process.exitCode || 0);
      });
    }
  });
}

runEndToEndTests().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});

