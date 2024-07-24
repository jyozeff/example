import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'

interface Param {
  required?: boolean
  redirectTo?: string
  queryConfig?: UseQueryOptions<Session | null>
}

async function fetchSession() {
  const res = await fetch('/api/auth/session')
  const session: Session = await res.json()
  if (Object.keys(session).length) {
    return session
  }
  return null
}

export function useSession({
  required = false,
  redirectTo = '/api/auth/signin?error=SessionExpired',
  queryConfig = {},
}: Param) {
  const router = useRouter()
  const query = useQuery(['session'], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) {
        queryConfig.onSettled(data, error)
      }
      if (data || !required) {
        return
      }
      router.push(redirectTo).catch(err => console.error(err))
    },
  })
  const res: [Session | null, boolean] = [
    query.data,
    query.status === 'loading',
  ]
  return res
}
