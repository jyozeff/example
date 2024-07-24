import React from 'react'
import ReactLoading from 'react-loading'
import styles from '../styles/components/loading.module.scss'
import variables from '../styles/common/variables.module.scss'

const Loading = ({ partial }: { partial?: boolean }) => {
  return (
    <div className={partial ? styles.partial : styles.fullScreen}>
      <div className={styles.inner}>
        <ReactLoading
          type="spin"
          color={variables.primary}
          height="10vw"
          width="10vw"
        />
      </div>
    </div>
  )
}

export default Loading
