import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import '../styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '../components/layout'
import ErrorBoundary from '../components/errorBoudary'
import '../i18n/config'
import { SessionProvider } from 'next-auth/react'
import '../analytics/firebase'
import { GlobalProvider } from '../context/global'
import GlobalDisplay from '../containers/globalDisplay'
// import get from '../config/configManager'
import constants from '../lib/constants'
import variables from '../styles/common/variables.module.scss'
import Head from 'next/head'
import { t } from 'i18next'

const theme = createTheme({
  palette: {
    primary: {
      main: variables.primary,
    },
    error: {
      main: variables.error,
    },
  },
  typography: {
    fontFamily: 'Verdana,Tahoma,sans-serif,Arial',
  },
})

const queryClient = new QueryClient({
  defaultOptions: constants.defaultQueryOptions,
})

// if (get('env') === constants.prod) {
//   console.log('Disabling console output')
//   console.log = function () {}
//   console.error = function () {}
// }

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <ErrorBoundary>
              <SessionProvider session={session}>
                <GlobalProvider>
                  <GlobalDisplay>
                    <Head>
                      <title>{t('defaultTitle')}</title>
                      <meta
                        name="description"
                        content={t('defaultMeta')}
                        key="desc"
                      />
                    </Head>
                    <Component {...pageProps} />
                  </GlobalDisplay>
                </GlobalProvider>
              </SessionProvider>
            </ErrorBoundary>
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
