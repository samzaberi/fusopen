
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  if (notification !== null) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return null

}

export default Notification