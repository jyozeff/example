import React from 'react'
import HomeContainer from '../containers/home'
import ErrorBoundary from '../components/errorBoudary'

const Index = () => {
  return (
    <ErrorBoundary>
      <HomeContainer />
    </ErrorBoundary>
  )
}

export default Index
