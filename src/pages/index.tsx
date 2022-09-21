import Form from '@/components/Form'
import 'the-new-css-reset/css/reset.css'
import App, { Product } from '@/components/App'
import { css } from '@emotion/css'
import { useState } from 'react'
import { ProductList } from '@/components/ProductList'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [isFetched, setIsFetched] = useState(false)
  return (
    <App>
      <>
        <header className={styles.header}>
          <h2 className={styles.title}>成分比較</h2>
        </header>
        <main className={styles.main}>
          <section>
            <p>
              <a href="https://www.cosme.com/" target="_blank" rel="noreferrer">
                @cosmeshopping
              </a>
              の商品を比較します。商品URLを入力してください。
            </p>
            <div className={styles.formWrapper}>
              <Form setProducts={setProducts} setIsFetched={setIsFetched} />
            </div>
          </section>

          {isFetched && (
            <section className={styles.listWrapper}>
              <ProductList products={products} />
            </section>
          )}
        </main>
      </>
    </App>
  )
}

const styles = {
  header: css`
    padding: 20px;
    width: 100%;
  `,
  title: css`
    font-size: 1.5em;
    text-align: center;
    font-weight: bold;
  `,
  main: css`
    min-width: 350px;
    max-width: 960px;
    margin: 0 auto;
    padding: 10px 20px;
  `,
  formWrapper: css`
    margin-top: 20px;
  `,
  listWrapper: css`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
}
