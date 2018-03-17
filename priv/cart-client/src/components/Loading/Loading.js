import React from 'react';
import styles from './Loading.css'
import Loadable from 'react-loading-overlay'

const Loading = () => <div className={styles.content}>
    <Loadable
      active
      spinner={true}
      background={'#19572e'}
      className={styles.loadingOverlay}
      text='加载中...'
      >
      <div className={styles.content}/>
    </Loadable>
  </div>
export default Loading;