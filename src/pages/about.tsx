import React from 'react'
import AboutContainer from '../containers/about'
import ErrorBoundary from '../components/errorBoudary'

const About = () => {
  return (
    <ErrorBoundary>
      <AboutContainer />
    </ErrorBoundary>
  )
}

export default About
