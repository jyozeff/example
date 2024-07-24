import React from 'react'
import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'

interface Props {
  statusCode: number
}

const CustomErrorComponent = ({ statusCode }: Props) => {
  return <Error statusCode={statusCode} />
}

CustomErrorComponent.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return await Error.getInitialProps(contextData)
}

export default CustomErrorComponent
