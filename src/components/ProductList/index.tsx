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

  /**
   * ハイライトするために共通の成分を探す
   * 共通要素を返す
   */
  const commonIngredients = useMemo(() => {
    return formattedProducts[0].ingredients.filter(ingredient => formattedProducts[1].ingredients.includes(ingredient))
  }, [formattedProducts])

  return (
    <Presentation
      products={formattedProducts}
      commonIngredients={commonIngredients}
      enableHighlight={enableHighlight}
      handleHighlight={() => setEnableHighlight(!enableHighlight)}
    />
  )
}
