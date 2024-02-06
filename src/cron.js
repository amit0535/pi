const cron = require("node-cron");
import { refreshToken } from "./tokens.js";
cron.schedule("5 */15 * * * *", async () => {
  await refreshToken("SL");
});
cron.schedule("10 */15 * * * *", async () => {
  await refreshToken("SL");
});
cron.schedule("15 */15 * * * *", async () => {
  await refreshToken("HS");
});
cron.schedule("25 */15 * * * *", async () => {
  await refreshToken("z5");
});
cron.schedule("35 */15 * * * *", async () => {
  await refreshToken("DP");
});
