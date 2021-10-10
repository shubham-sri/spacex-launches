import puppeteer, {Browser, Page} from "puppeteer";

jest.setTimeout(200000)

function getRandom(arr: (string | null)[], n: number) {
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

describe("App.js", () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  it("contains the welcome text", async () => {
    await page.goto("http://localhost:3000")
    await page.waitForSelector(".table-body")
    await page.waitForSelector(".data")
    const data = await page.$eval('.table-body', (e) => e.childElementCount)

    expect(data).toBe(100)

    const rowIds = await page.$$eval('.row-id', elements => elements.map(e => e.textContent))

    const ids = getRandom(rowIds ? rowIds : [], 2)

    expect(ids.length).toBe(2)

    await page.click(`#check-${ids[0]}`)
    await page.click(`#check-${ids[1]}`)
    await page.click('#compare-button')

    await page.waitForSelector(`.compare-container`)
    await page.waitForSelector(`.data-compare`)

    await page.goBack()
  });

  afterAll(() => browser.close())
});
