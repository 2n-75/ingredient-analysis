import { FC, ReactNode } from 'react'
import '@/styles/global'

export type Product = {
  id: number
  name: string
  price: string
  ingredients: string | null
  url: string
}

export type Props = {
  children: ReactNode
}
const App: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default App
