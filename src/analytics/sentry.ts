import constants from '../lib/constants'
import packageJson from '../../package.json'
import * as Sentry from '@sentry/nextjs'

const captureException = (
  e: any,
  eventParams?: {
    [key: string]: any
  },
) => {
  try {
    if (typeof window === 'undefined') {
      return
    }

    Sentry.captureException(e, {
      extra: {
        platform: constants.web,
        bundleVersion: packageJson?.version,
        ...(eventParams || {}),
      },
    })
  } catch (err) {
    console.error('Sentry captureException error', err)
  }
}

export default captureException
