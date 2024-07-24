import React from 'react'
import Document, { Html, Main, NextScript } from 'next/document'

class ExampleDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ExampleDocument
