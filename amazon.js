const puppeteer = require("puppeteer");

const BASE_URL = "https://www.amazon.com/";
let page = null;
let browser = null;

const amazon = {
  initialize: async () => {
    console.log("Starting the scraper..");
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: "networkidle2" });
    console.log("Initialization completed");
  },

  getProductDetails: async link => {
    console.log("Going to the Product Page...");
    await page.goto(link, { waitUntil: "networkidle2" });
    const productInfo = await page.evaluate(() => {
      const getInnerText = selector => {
        return document.querySelector(selector)
          ? document.querySelector(selector).textContent.trim()
          : false;
      };

      return {
        title: getInnerText("#productTitle"),
        owner: getInnerText("#bylineInfo"),
        price: getInnerText("#priceblock_ourprice,#priceblock_dealprice")
      };
    });

    return productInfo;
  },

  end: async () => {
    console.log("Stopping the scraper...");
    await browser.close();
  }
};

module.exports = amazon;
