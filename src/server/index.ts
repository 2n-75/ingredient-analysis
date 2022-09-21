import axios from 'axios'

type Props = {
  params: {
    ids: string[]
  }
}
export const getProduct = async ({ params }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- envの設定を追加する
  const LOCAL_URL = 'http://localhost:5001/ingredient-analysis-2bfe5/us-central1/getProduct'
  const PRODUCTION_URL = 'https://us-central1-ingredient-analysis-2bfe5.cloudfunctions.net/getProduct'
  try {
    const { data } = await axios.get(PRODUCTION_URL, {
      params,
    })

    return data
  } catch (error) {
    console.error(error)
    return error
  }
}
