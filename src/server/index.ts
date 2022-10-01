import axios from 'axios'

type ResponseProduct = {
  name: string
  price: string
  ingredients: string | null
  url: string
}

type Props = {
  ids: string[]
  onSuccess: (data: ResponseProduct[]) => void
  onError: () => void
}

export const getProducts = async ({ ids, onSuccess, onError }: Props) => {
  Promise.all(ids.map(id => getProduct({ id })))
    .then(result => {
      // FIXME: asやめる
      onSuccess(result as ResponseProduct[])
    })
    .catch(err => {
      console.log({ err })
      onError()
    })
}

type Request = {
  id: string
}
const getProduct = async (params: Request) => {
  // TODO: npm run serveだとenvがproductionになるのでLOCAL_URLにリクエストできていないのを修正する
  const LOCAL_URL = 'http://localhost:5001/ingredient-analysis-2bfe5/us-central1'
  const PRODUCTION_URL = 'https://us-central1-ingredient-analysis-2bfe5.cloudfunctions.net'
  const env = process.env.NODE_ENV ?? 'development'
  const isProduction = env === 'production'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- FIXME
  const requestUrl = isProduction ? PRODUCTION_URL : LOCAL_URL
  try {
    const { data } = await axios.get<ResponseProduct>(`${PRODUCTION_URL}/getProduct`, { params })

    return data
  } catch (error) {
    console.error(error)
    return error
  }
}
