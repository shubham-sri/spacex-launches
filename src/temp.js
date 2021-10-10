const puppeteer = require( "puppeteer");
function getRandom(arr, n) {
    const result = new Array(n)
    let len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
async function T() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto("http://localhost:3000")
    await page.waitForSelector(".table-body")
    await page.waitForSelector(".data")
    const data = await page.$eval('.table-body', (e) => e.childElementCount)
    const rowIds = await page.$$eval('.row-id', elements => elements.map(e => e.textContent))

    const ids = getRandom(rowIds || [], 2)

    console.log(ids)
    console.log(data)
}

T().then(()=>console.log('done'))
