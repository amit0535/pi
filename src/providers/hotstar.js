import Browser from "../Browser";
const allowedResourseTypes = ["fetch", "xhr", "script", "document", "other"];

export async function getToken() {
  let token;

  try {
    const page = await Browser.getPage();
    page.on("request", (request) => {
      if (!allowedResourseTypes.includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
      const headers = request.headers();
      const userAccessToken = headers["x-hs-usertoken"];
      const isApiUrl = request
        .url()
        .startsWith("https://bifrost-api.hotstar.com");
      if (userAccessToken && isApiUrl) {
        token = userAccessToken;
      }
    });
    await page.goto("https://www.hotstar.com/in");
    await page.evaluate((_) => {});
  } catch (e) {
    console.log(e);
  } finally {
  }

  return token;
}
