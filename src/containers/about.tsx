import React from 'react'
import AppBar from '../containers/appBar'
import styles from '../styles/containers/simple.module.scss'
import Head from 'next/head'
import { t } from 'i18next'
import AppFooter from '../containers/appFooter'

const About = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>{t('about')}</title>
      </Head>
      <AppBar />
      <div className={styles.container}></div>
      <AppFooter />
    </div>
  )
}

export default About
