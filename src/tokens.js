import * as sony from "./providers/sony";
import * as hotstar from "./providers/hotstar";
import * as zee5 from "./providers/zee5.js";
import * as discovery from "./providers/discovery-plus";
import { postJSON } from "./functions";
export async function refreshToken(source) {
  let f;
  if (source == "SL") {
    f = sony;
  } else if (source == "HS") {
    f = hotstar;
  } else if (source == "Z5") {
    f = zee5;
  } else if (source == "DP") {
    f = discovery;
  }
  let token = await f.getToken();
  let data = {};
  data.source = source;
  data.token = token;
  let json = await postJSON("http://do24.plns.in:3000/webhook/token", data);
  console.log(json);
  if (json.status == "OK") {
    console.log("success");
    return true;
  } else {
    console.log("failed");
    return false;
  }
}
