import get from '../config/configManager'
import { jsonHeaders, getHeaders, checkFetchRes } from './utils/common'

const apiUrl = get('apiUrl') as string

export async function updateMyInfo(
  token: string,
  params: { gender?: string; birthDate?: string },
) {
  const res = await fetch(`${apiUrl}/users/me`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify(params),
  })

  checkFetchRes(res)

  return (await res.json()) as UserDetails
}

export async function getJwt(credentials: {
  provider: string
  token?: string
  email?: string
  password?: string
}) {
  const res = await fetch(`${apiUrl}/jwt`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(credentials),
  })

  // don't throw error when http code is not 200

  return (await res.json()) as JwtResponse
}

export async function getSelfDetails(
  token?: string,
): Promise<null | UserDetails> {
  if (!token) {
    return null
  }
  const res = await fetch(`${apiUrl}/users/me`, {
    method: 'GET',
    headers: await getHeaders(token),
  })

  checkFetchRes(res)

  return (await res.json()) as UserDetails
}
