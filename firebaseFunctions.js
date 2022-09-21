const { join } = require('path')
const functions = require('firebase-functions')
const { default: next } = require('next')

const nextjsDistDir = join('src', require('./src/next.config.js').distDir)

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
})
const nextjsHandle = nextjsServer.getRequestHandler()

const puppeteer = require('puppeteer')

exports.nextjsFunc = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '512MB',
}
exports.getProduct = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
  const PRODUCT_URL = 'https://www.cosme.com/products/detail.php'
  if (!req.query.ids) {
    return res
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .status(400)
      .send({ message: 'idを指定してください' })
      .end()
  }
  const requestUrls = []
  req.query.ids.forEach(id => {
    requestUrls.push(`${PRODUCT_URL}?product_id=${id}`)
  })

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const products = []
  const xpath = {
    name: '//*[@id="inr__wrap-info"]/div[1]/h1',
    price: '//*[@id="inr__wrap-info"]/dl/dd[1]/p/span[2]',
    ingredients: '//*[@id="product-detail"]/div[5]/div/div/div[3]/dl/dd[6]',
  }

  // TODO: ここの書き方直す
  // 1つめ
  if (requestUrls[0]) {
    await page.goto(requestUrls[0])
    const name1 = await getText(page, xpath.name)
    if (!name1) {
      return undefined
    }
    products.push({
      price: await getText(page, xpath.price),
      ingredients: await getText(page, xpath.ingredients),
      name: name1,
      url: requestUrls[0],
    })
  }

  // 2つめ
  if (requestUrls[1]) {
    await page.goto(requestUrls[1])
    const name2 = await getText(page, xpath.name)
    if (!name2) {
      return undefined
    }
    products.push({
      price: await getText(page, xpath.price),
      ingredients: await getText(page, xpath.ingredients),
      name: name2,
      url: requestUrls[1],
    })
  }

  await browser.close()
  return res
    .set('Access-Control-Allow-Headers', '*')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET')
    .status(201)
    .send({ products })
    .end()
})

const getText = async (page, xpath) => {
  const elems = await page.$x(xpath)
  if (elems.length === 0) return ''
  const jsHandle = await elems[0].getProperty('textContent')
  return await jsHandle.jsonValue()
}
