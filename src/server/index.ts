import axios from 'axios'

type Props = {
  params: {
    ids: string[]
  }
}
export const getProduct = async ({ params }: Props) => {
  try {
    const { data } = await axios.get('http://localhost:5001/ingredient-analysis-2bfe5/us-central1/getProduct', {
      params,
    })

    return data
  } catch (error) {
    console.error(error)
    return error
  }
}
