import React from 'react'
import styles from '../styles/components/error.module.scss'

const Error = ({ message }: { message: string }) => {
  if (!message) {
    return null
  }

  return (
    <div data-test="form-error" className={styles.container}>
      {message}
    </div>
  )
}

export default Error
