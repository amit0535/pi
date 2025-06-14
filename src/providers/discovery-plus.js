import Browser from "../Browser";

const allowedResourseTypes = ["fetch", "xhr", "script", "document", "other"];
export async function getToken() {
  let token;

  try {
    const page = await Browser.getPage();
    page.on("request", (request) => {
      if (!allowedResourseTypes.includes(request.resourceType())) {
        request.abort();
      } else request.continue();
    });

    await page.goto("https://www.discoveryplus.in/", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForRequest((request) =>
      request.url().startsWith("https://ap2-prod-direct.discoveryplus.in/cms")
    );
    await page.evaluate((_) => {});
    const cookies = await page.cookies(
      "https://ap2-prod-direct.discoveryplus.in"
    );
    token = cookies.filter((c) => c.name == "st")[0].value;
  } catch (e) {
    console.log(e);
  }
  // console.log(token);
  return token;
}
