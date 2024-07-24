import React, { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from '../lib/auth/nextauth-react-query'
import { isAuthenticated, isValidEmail } from '../lib/utils'
import constants from '../lib/constants'
import EmailButton from '../components/emailButton'
import GoogleButton from '../components/googleButton'
import TextField from '../components/textField'
import Loading from '../components/loading'
import NoSSR from 'react-no-ssr'
import { t } from 'i18next'
import styles from '../styles/containers/signIn.module.scss'
import Button from '../components/button'
import { getMagicLink } from '../services/user'
import logEvent from '../analytics/firebase'
import Link from 'next/link'
import { AppStoreDownload } from '../assets/svgs'
import { useGlobal } from '../context/global'
import captureException from '../analytics/sentry'

interface Props {
  redirectPath?: string
}

const appLinkStyle = { width: '240px', margin: 0 }

const SignIn = ({ redirectPath }: Props) => {
  const [session] = useSession(constants.useSessionConfig)

  const [showMoreOptions, setShowMoreOptions] = useState(true)
  const [isUsingEmail, setIsUsingEmail] = useState(false) // always show
  const [email, setEmail] = useState('')
  const [isMagicLinkRequested, setIsMagicLinkRequested] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shouldFixEmail, setShouldFixEmail] = useState(false)

  const {
    snackbar: { setMessage: setSnackbarMessage },
  } = useGlobal()

  useEffect(() => {
    logEvent(constants.eventScreenLoaded, { name: 'SignIn' })
  }, [])

  const signInGoogle = async () => {
    try {
      logEvent(constants.eventAuthStart, { authProvider: 'google' })

      await signIn(
        'google',
        redirectPath ? { callbackUrl: redirectPath } : undefined,
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmitEmail = async () => {
    try {
      if (!isValidEmail(email)) {
        setShouldFixEmail(true)
        return
      }
      setShouldFixEmail(false)

      setLoading(true)

      await getMagicLink(email)

      setIsMagicLinkRequested(true)

      logEvent(constants.eventMagicLinkSent)
    } catch (err) {
      setSnackbarMessage(t('error'))
      console.error(err)
      logEvent(constants.eventMagicLinkError, { error: err })
      captureException(err, { name: constants.eventMagicLinkError })
    } finally {
      setLoading(false)
    }
  }

  const handleAppLinkClick = (type: string) => {
    logEvent(constants.eventAppLinkClicked, {
      type,
    })
  }

  const signInEmail = () => {
    setIsUsingEmail(true)

    logEvent(constants.eventAuthStart, { authProvider: 'email' })
  }

  const renderMain = () => {
    return (
      <div className={styles.container}>
        <Link
          onClick={() => handleAppLinkClick('ios')}
          href={constants.appStoreUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AppStoreDownload style={appLinkStyle} />
        </Link>
        <div style={{ margin: '10px 0', fontSize: '20px' }}>
          <b>{t('or')}</b>
        </div>
        <GoogleButton
          text={t('auth.signInWithGoogle')}
          onClick={signInGoogle}
          style={{ marginBottom: '15px' }}
        />
        {!showMoreOptions && (
          <Button
            style={{
              marginBottom: '15px',
              fontSize: '15px',
            }}
            text={t('auth.moreOptions')}
            onClick={() => setShowMoreOptions(true)}
            variant="text"
          />
        )}
        {showMoreOptions && (
          <EmailButton
            text={t('auth.continueWithEmail')}
            onClick={signInEmail}
          />
        )}
      </div>
    )
  }

  const renderEmailSignin = () => {
    if (isMagicLinkRequested) {
      return renderMagicLinkRequested()
    }

    return (
      <div className={styles.container2}>
        <h2>{t('auth.myEmail')}</h2>
        <p>{t('auth.getMagicLink')}</p>
        {shouldFixEmail && (
          <p className={styles.error}>{t('auth.enterValidEmail')}</p>
        )}
        <TextField
          label="Email"
          style={{
            width: '200px',
            marginBottom: '60px', // MUI elements are relatively positioned so without a big margin it would overlap with the button below
          }}
          onChange={arg => setEmail(arg.target.value)}
          onEnter={handleSubmitEmail}
          type="email"
          maxLength={254}
        />
        <Button
          style={{
            marginBottom: '15px',
            fontSize: '15px',
          }}
          text={'Submit'}
          onClick={handleSubmitEmail}
          variant="contained"
        />
      </div>
    )
  }

  const renderMagicLinkRequested = () => {
    return (
      <div className={styles.container2}>
        <h2>{t('auth.magicLinkSent')}</h2>
        <p style={{ marginBottom: '30px' }}>
          {t('auth.checkEmail', { email })}
        </p>
      </div>
    )
  }

  const render = () => {
    if (isAuthenticated(session)) {
      return undefined
    }

    if (!isUsingEmail) {
      return renderMain()
    }
    return renderEmailSignin()
  }

  return (
    <NoSSR>
      {render()}
      {loading && <Loading />}
    </NoSSR>
  )
}

export default SignIn
