import { User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user?: User
    error?: string
    imageUrl?: string
    statusExpiresAt?: number
    accessTokenExpires?: number
    refreshTokenExpires?: number
    hasRefreshToken?: boolean
    didCreate?: booleaen
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    accessTokenExpires?: number
    refreshToken?: string
    refreshTokenExpires?: number
    user?: User
    error?: string
    imageUrl?: string
    statusExpiresAt?: number
    didCreate?: booleaen
  }
}
