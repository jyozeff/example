import React from 'react'

interface Props {
  children?: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: unknown) {
    return { hasError: true }
  }

  logError = (error: unknown, errorInfo: unknown) => {
    console.error(error)
    console.error(errorInfo)
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    this.logError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong...</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
