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
      if (
        request.url().startsWith("https://ap2-prod-direct.discoveryplus.in")
      ) {
      }
    });

    await page.goto("https://www.discoveryplus.in/", {
      waitUntil: "networkidle0",
    });
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
