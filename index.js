const Nightmare = require('nightmare');
const moment = require('moment');
const fs = require('fs');

const n1 = Nightmare();
const n2 = Nightmare();

let getData = async () => {
  let text = await n1
    .goto("https://mbsdisclosure.fanniemae.com/PoolTalk/index.html")
    .type("#loginUsername", process.argv[2])
    .type("#loginPassword", process.argv[3])
    .click("#isTermsAndConditionsSelected")
    .click("#loginBtn")
    .wait(2000)
    .click('#tab_2 > a > span')
    .wait(2000)
    .evaluate(() => document
      .querySelector('#downloadnips > tbody')
      .querySelectorAll('tr')[0]
      .querySelectorAll('td')[1]
      .querySelector('a').innerText
    )
    .end();
  return await n2
    .goto("https://mbsdisclosure.fanniemae.com/PoolTalk/index.html")
    .type("#loginUsername", "durga@pre-rec.com")
    .type("#loginPassword", "@Establish1")
    .click("#isTermsAndConditionsSelected")
    .click("#loginBtn")
    .wait(3000)
    .goto(`https://mbsdisclosure.fanniemae.com/PoolTalk/publish?file=${text}`)
    .evaluate(() => (
      document.querySelector('body > pre').innerText
    ))
    .end();
};

getData()
  .then(text => {
    const stream = fs.createWriteStream(`${moment().format('h-mm-ss_MMM_Do_YYYY')}.txt`);
    stream.once('open', () => {
      stream.write(text);
      stream.end();
    });
  })
  .catch(err => console.error(err));
