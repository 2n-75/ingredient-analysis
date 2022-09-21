import Presentation from './presentation'
import { Dispatch, FC, SetStateAction } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Product } from '../App'
import { getProduct } from '@/server'

export type FormValue = {
  url1: string
  url2: string
}

type Props = {
  setProducts: Dispatch<SetStateAction<Product[]>>
  setIsFetched: Dispatch<SetStateAction<boolean>>
}
const Form: FC<Props> = ({ setProducts, setIsFetched }) => {
  const onSubmit: SubmitHandler<FormValue> = async data => {
    if (!data.url1 || !data.url2) {
      return
    }

    await getProduct({
      params: { ids: formatParams([data.url1, data.url2]) },
    })
      .then(result => {
        console.log({ result })
        const products = result.products.map(
          (
            product: {
              name: string
              price: string
              ingredients: string | null
              url: string
            },
            index: number
          ) => {
            return {
              ...product,
              id: index,
            }
          }
        )
        setProducts(products)
        setIsFetched(true)
      })
      .catch(() => {
        setIsFetched(true)
      })
  }

  const formatParams = (urls: string[]) => {
    return urls.map(url => url.replace('https://www.cosme.com/products/detail.php?product_id=', ''))
  }

  return <Presentation onSubmit={onSubmit} />
}

export default Form
