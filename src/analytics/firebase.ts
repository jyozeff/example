import { initializeApp, FirebaseOptions } from 'firebase/app'
import { getAnalytics, Analytics, logEvent } from 'firebase/analytics'
import get from '../config/configManager'
import constants from '../lib/constants'
import packageJson from '../../package.json'
import { isProd } from '../lib/utils'

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let analytics: Analytics

if (typeof window !== 'undefined') {
  const firebaseConfig = get('firebaseConfig') as FirebaseOptions

  const app = initializeApp(firebaseConfig)
  analytics = getAnalytics(app)

  console.log('Initialized Firebase')
}

const _logEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: any
  },
) => {
  try {
    if (!analytics || !isProd()) {
      return
    }

    logEvent(analytics, eventName, {
      platform: constants.web,
      bundleVersion: packageJson?.version,
      ...eventParams,
    })
  } catch (err) {
    console.error('Firebase logEvent error', err)
  }
}

export default _logEvent
