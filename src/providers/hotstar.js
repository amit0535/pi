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
      if (
        request.headers().hotstarauth &&
        request.url().startsWith("https://persona.hotstar.com/v1/users/")
      ) {
        token = request.headers().hotstarauth;
      }
    });
    await page.goto("https://www.hotstar.com/in", {
      waitUntil: "networkidle0",
    });
    await page.evaluate((_) => {});
  } catch (e) {
    console.log(e);
  } finally {
  }
  //await page.screenshot({ path: "example.png" });

  console.log(token);
  return token;
}
//module.exports.getToken();
