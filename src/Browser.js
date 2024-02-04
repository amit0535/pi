import puppeteer from "puppeteer-core";
import { BROWSER_ENDPOINT } from "./config";
class Browser {
  static async getPage() {
    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_ENDPOINT,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36"
    );
    page.setDefaultNavigationTimeout(0);
    await page.setRequestInterception(true);
    return page;
  }
}
export default Browser;
