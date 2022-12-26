import React from 'react'
import classes from './ContentContainer.module.scss'

function ContentContainer(props) {
  return (
    <div className={classes.ContentContainer} style={{backgroundColor: props.color}}>
        {props.children}
    </div>
  )
}

export default ContentContainer