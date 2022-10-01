import Presentation from './presentation'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Product } from '../App'
import { getProducts } from '@/server'

export type FormValue = {
  url1: string
  url2: string
}

type Props = {
  setProducts: Dispatch<SetStateAction<Product[]>>
  setIsFetched: Dispatch<SetStateAction<boolean>>
}
const Form: FC<Props> = ({ setProducts, setIsFetched }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onSubmit: SubmitHandler<FormValue> = async data => {
    if (!data.url1 || !data.url2) {
      return
    }
    setIsFetched(false)
    setProducts([])
    setIsSubmitting(true)
    await getProducts({
      ids: formatParams([data.url1, data.url2]),
      onSuccess: data => {
        const products = data.map((product, index) => {
          return {
            ...product,
            id: index,
          }
        })
        setProducts(products)
        setIsFetched(true)
        setIsSubmitting(false)
      },
      onError: () => {
        setIsFetched(true)
        setIsSubmitting(false)
      },
    })
  }

  const formatParams = (urls: string[]) => {
    return urls.map(url => url.replace('https://www.cosme.com/products/detail.php?product_id=', ''))
  }

  return <Presentation onSubmit={onSubmit} isSubmitting={isSubmitting} />
}

export default Form
