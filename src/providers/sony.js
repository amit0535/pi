import Browser from "../Browser";

const puppeteer = require("puppeteer");
export async function getToken() {
  const browser = await puppeteer.launch();
  let localStorage;
  try {
    const page = await Browser.getPage();
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      //console.log(req.resourceType());
      console.log(req.url());
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
    /*  let json = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      json[key] = localStorage.getItem(key);
    }
    console.log(json);
    return json;
    // this will be executed within the page, that was loaded before
    //document.body.style.background = '#000';
  });
*/
    localStorage = await page.evaluate(() =>
      Object.assign({}, window.localStorage)
    );
    //await page.screenshot({ path: "example.png" });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }
  console.log("closed");
  const token = localStorage.security_token;
  console.log(token);
  return token;
}
//module.exports.getToken();
