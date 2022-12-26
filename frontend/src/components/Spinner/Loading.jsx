import React from 'react'
import classes from './Loading.module.scss'

function Loading() {
  return (
    <React.Fragment>
        <div className={classes.Backdrop}></div>
        <div className={classes.Spinner}><div></div><div></div><div></div><div></div></div>
    </React.Fragment>
  )
}

export default Loading