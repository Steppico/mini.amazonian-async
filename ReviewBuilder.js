const fs = require("fs");
const fsPromises = require("fs").promises;

const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return new Promise((resolve, reject) => {
      Promise.all([
        fsPromises.readFile("./data/products.json", "utf8"),
        fsPromises.readFile("./data/reviews.json", "utf8"),
        fsPromises.readFile("./data/users.json", "utf8"),
      ])
        .then((results) => {
          const products = JSON.parse(results[0]);
          const reviews = JSON.parse(results[1]);
          const users = JSON.parse(results[2]);
          resolve(produceResult({ products, reviews, users }));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async buildReviewsAsyncAwait() {
    const results = await Promise.all([
      fsPromises.readFile("./data/products.json", "utf8"),
      fsPromises.readFile("./data/reviews.json", "utf8"),
      fsPromises.readFile("./data/users.json", "utf8"),
    ]);
    const products = JSON.parse(results[0]);
    const reviews = JSON.parse(results[1]);
    const users = JSON.parse(results[2]);
    return produceResult({ products, reviews, users });
  }
}

module.exports = ReviewBuilder;
