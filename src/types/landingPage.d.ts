export type ColorScheme =
  | 'blue'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'indigo'
  | 'red'

export interface ColorClass {
  bg: string
  border: string
  text: string
  icon: string
  button: string
  accent: string
}

export interface Route {
  id: string
  title: string
  description: string
  icon: ReactNode
  color: ColorScheme
  features: string[]
  useCase: string
  path: string
  isAvailable: boolean
}
