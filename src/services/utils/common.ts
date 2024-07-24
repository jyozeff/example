import packageJson from '../../../package.json'

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  appversion: packageJson?.version,
}

export function getHeaders(token: string) {
  return {
    ...jsonHeaders,
    Authorization: `Bearer ${token}`,
    appversion: packageJson?.version,
  }
}

export function checkFetchRes(res: Response) {
  if (res.status !== 200) {
    throw new Error('request error')
  }
}
