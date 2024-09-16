const reviewers = require("./reviewers.json");

const prData = {
  title: process.env.PR_TITLE,
  author: process.env.PR_AUTHOR,
  url: process.env.PR_URL,
  head: process.env.PR_HEAD,
};

const requiredReviewers = process.env.REQUIRED_REVIEWERS;

const author = reviewers.find((d) => d.github === prData.author).gchat;

const filtered = reviewers.filter((d) => d.github !== prData.author);
const selected = filtered.sort(() => Math.random() - 0.5).slice(0, requiredReviewers);
const selectedReviewers = selected.map((d) => d.gchat);

const body = {
  text:
    selectedReviewers.map((s) => `<users/${s}>`).join("さん、") +
    "さん、こんにちは！\n<users/" +
    author +
    ">が発行したPull Request「" +
    prData.title +
    "」のレビューをお願いします！\nURL: " +
    prData.url,
};
console.log(body);

fetch(process.env.GCHAT_WEBHOOK_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
}).then((res) => {
  console.log("Response Code: ", res.status);
  console.log("選ばれたのは、", reviewers.filter((d) => d.gchat === selectedReviewers[0])[0].github + "さんでした。");
});
