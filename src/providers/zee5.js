import Browser from "../Browser";

const allowedResourseTypes = ["fetch", "xhr", "script", "document", "other"];
export async function getToken() {
  let token;
  try {
    const page = await Browser.getPage();
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (!allowedResourseTypes.includes(request.resourceType())) {
        request.abort();
      } else request.continue();
      if (request.headers()["x-access-token"]) {
        //console.log(request.url());
        token = request.headers()["x-access-token"];
      }
    });
    await page.goto("https://www.zee5.com/myaccount/subscription", {
      waitUntil: "networkidle0",
    });
    await page.evaluate((_) => {});
    const cookies = await page.cookies();
    let tokenCookie = cookies.filter((c) => c.name == "xaccesstoken");
    token = tokenCookie[0]?.value;
  } catch (e) {
    console.log(e);
  } finally {
  }
  console.log(token);
  return token;
}

//module.exports.getToken();
