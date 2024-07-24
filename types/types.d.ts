interface User {
  name?: string
  email?: string
  id?: string
  token?: string
  createdAt?: number
}

interface Partner {
  picture?: string
  firstName?: string
  gender?: string
  countryCode?: string
  country?: string
  age?: number
}

interface JwtResponse {
  didCreate?: boolean
  token?: string
  refreshToken?: string
  tokenExpiresAt?: number
  refreshTokenExpiresAt?: number
  email?: string
  error?: string
}

interface UserDetails {
  alias: string
  gender: string
  birthDate: string
  status: string
  firstName?: string
  lastName?: string
  email?: string
}

interface Product {
  id: string
  title: string
  priceCents: number
  priceStr: string
}
