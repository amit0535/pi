//const cron = require("node-cron");
import { refreshToken } from "../tokens";
try {
  setTimeout(() => {
    process.exit(1);
  }, 1000 * 100);
  runJobs();
} catch (e) {
  console.log(e);
  process.exit(1);
}
async function runJobs() {
  console.log("running every hour");
  await refreshToken("SL");
  await refreshToken("HS");
  await refreshToken("Z5");
  await refreshToken("DP");
  console.log("cron completed");
  process.exit(0);
}
/*
cron.schedule("10 * * * *", async () => {
  
});
*/
//refreshToken("HS");
