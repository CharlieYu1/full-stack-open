import { createContext, useReducer, useContext } from 'react'

const notificaionReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [message, notificationDispatch] = useReducer(notificaionReducer, '')

  return (
    <NotificationContext.Provider value={[message, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext