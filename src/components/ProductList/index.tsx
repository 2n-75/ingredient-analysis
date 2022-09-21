import { FC, useMemo, useState } from 'react'
import { Product } from '../App'
import Presentation from './presentation'

type Props = {
  products: Product[]
}
export const ProductList: FC<Props> = ({ products }) => {
  const [enableHighlight, setEnableHighlight] = useState(false)
  const formattedProducts = useMemo(
    () =>
      products.map(product => {
        return { ...product, ingredients: product.ingredients ? product.ingredients.split(',') : [] }
      }),
    [products]
  )

  const commonElements = useMemo(() => {
    /**
     * ハイライトするために共通の成分を探す
     * 共通要素を返す
     */
    return []
  }, [])

  if (products.length === 0) {
    return <p>商品情報が存在しません</p>
  }
  return (
    <Presentation
      products={formattedProducts}
      commonIngredients={[]}
      enableHighlight={enableHighlight}
      handleHighlight={() => setEnableHighlight(!enableHighlight)}
    />
  )
}
