const allowedResourseTypes = ["fetch", "xhr", "script", "document", "other"];
export async function getToken() {
  let token;
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
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
    await page.evaluate((_) => {
      // this will be executed within the page, that was loaded before
      //document.body.style.background = '#000';
    });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }
  //await page.screenshot({ path: "example.png" });

  console.log(token);
  return token;
}
//module.exports.getToken();
