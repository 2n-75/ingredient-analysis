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
  timeoutSeconds: 300,
  memory: '512MB',
}
exports.getProduct = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
  const PRODUCT_URL = 'https://www.cosme.com/products/detail.php'
  // パラメータバリデーション
  const id = req.query.id
  if (!id) {
    return res
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .status(400)
      .send({ message: 'idを指定してください' })
      .end()
  }

  const selector = {
    name: '#inr__wrap-info > div.product__wrap-main-info > h1',
    price: '#inr__wrap-info > dl > dd.mg-bottom-0 > p > span:nth-child(2)',
    productDetail: '#product-detail > div.contents > div > div > div:nth-child(3) > dl',
  }

  // ページから商品情報を取得する
  const browser = await puppeteer.launch()
  const requestUrl = `${PRODUCT_URL}?product_id=${id}`
  const page = await browser.newPage()
  await page.goto(requestUrl, { waitUntil: 'load', timeout: 0 })
  const product = await page.evaluate(selector => {
    // 商品の詳細テーブルの内容
    const productDetailContents = document.querySelector(selector.productDetail).children
    const productDetailContentsTexts = Array.from(productDetailContents).map(element => element.innerText)

    return {
      name: document.querySelector(selector.name).textContent,
      price: document.querySelector(selector.price).textContent,
      // 成分の隣のセルのテキストを返す
      ingredients: productDetailContentsTexts[productDetailContentsTexts.indexOf('成分') + 1],
    }
  }, selector)
  await browser.close()

  if (product.name === null) {
    return res
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .status(400)
      .send({ message: '商品情報が存在しません' })
      .end()
  }
  return res
    .set('Access-Control-Allow-Headers', '*')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET')
    .status(201)
    .send({
      ...product,
      url: requestUrl,
    })
    .end()
})
