import Browser from "../Browser";
export async function getToken() {
  let localStorage = {};
  try {
    const page = await Browser.getPage();
    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
    await page.goto("https://www.sonyliv.com/signin", {
      waitUntil: "networkidle0",
    });

    localStorage = await page.evaluate(() =>
      Object.assign({}, window.localStorage)
    );
  } catch (e) {
    console.log(e);
  } finally {
  }
  const token = localStorage.security_token;
  return token;
}
//module.exports.getToken();
