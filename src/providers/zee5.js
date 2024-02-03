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
      //console.log("requesting..."+request.url()+" "+request.headers().hotstarauth);
      if (
        request.headers()["x-access-token"]
        //request.url().startsWith("https://persona.hotstar.com/v1/users/")
      ) {
        //console.log(request.url());
        token = request.headers()["x-access-token"];

        //process.exit();
      }
    });
    await page.goto("https://www.zee5.com/myaccount/subscription", {
      waitUntil: "networkidle0",
    });
    await page.evaluate((_) => {
      // this will be executed within the page, that was loaded before
      //document.body.style.background = '#000';
    });
    const cookies = await page.cookies();
    let tokenCookie = cookies.filter((c) => c.name == "xaccesstoken");
    token = tokenCookie[0].value;
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
