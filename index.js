const amz = require("./amazon");

(async () => {
  await amz.initialize();

  const product = await amz.getProductDetails(
    "https://www.amazon.com/CanaKit-Raspberry-Starter-Premium-Black/dp/B07BCC8PK7/"
  );
  console.log(product);

  // await amz.end();
})();
