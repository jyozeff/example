const constants = {
  web: 'web',

  dev: 'dev',
  prod: 'prod',

  useSessionConfig: {
    queryConfig: {
      refetchInterval: 120000, // 2 minutes
    },
  },

  defaultQueryOptions: {
    queries: {
      retry: 2, // Number of retries for failed queries
      staleTime: 10000, // how long (in millisecons) data is considered fresh (not stale)
      // Don't change cacheTime unless there is good reason to (https://tkdodo.eu/blog/practical-react-query#the-defaults-explained)
    },
  },

  publicPaths: ['/sign_in', '/sign_up'],
  
  snackbarDurationMillis: 4000,

  maxEmailLength: 254,

  queryKeyGetSubs: 'subs',
  queryKeyGetProducts: 'products',

  female: 'female',
  male: 'male',

  minAge: 18,
  maxAge: 99,
}

export default constants
