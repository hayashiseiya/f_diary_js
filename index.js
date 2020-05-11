const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.freitag.ch/ja/shop/bags");

  const bagsSelector = ".neo-unikat-model";
  const bags = await page.$$eval(bagsSelector, nodes => {
    return nodes.map(node => { // node: HTMLElement ( ElementHandle ではなく )
      const bagNameWithType = node.querySelector(".content-wrapper h3").textContent;
      const bagType = bagNameWithType.split(" ")[0];
      const bagName = bagNameWithType.split(" ")[1];

      const bagPrice = node.querySelector(".content-wrapper .field-commerce-price").textContent.trim(); // 不要な空白が入っていたため
      const bagUrl = node.querySelector(".linked-image a").getAttribute("href");
      const bagImage = node.querySelector(".linked-image a img").getAttribute("src");

      return {
        bagType: bagType,
        bagName: bagName,
        bagPrice: bagPrice,
        bagUrl: bagUrl,
        bagImage: bagImage,
      }
    });
  });

  console.log(bags);

  await browser.close();
})();


