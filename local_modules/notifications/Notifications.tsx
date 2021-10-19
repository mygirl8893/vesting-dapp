import React, { useState, useCallback, useEffect } from 'react'

import { subscribe, unsubscribe, closeNotification } from './manager'


type NotificationProps = {
  id: number
  component: React.FunctionComponent<any>
  componentProps: { [key: string]: any }
}

const Notification: React.FunctionComponent<NotificationProps> = ({ id, component, componentProps }) => {
  const handleClose = useCallback(() => {
    closeNotification(id)
  }, [ id ])

  return React.createElement(component, {
    ...componentProps,
    closeNotification: handleClose,
  })
}


type NotificationsProps = {
  className?: string
  templates?: {
    [key: string]: React.FunctionComponent<any>
  }
}

const Notifications: React.FunctionComponent<NotificationsProps> = (props) => {
  const { className, templates } = props

  const [ notifications, setNotifications ] = useState([])

  useEffect(() => {
    const openHandler = (_, notifications) => {
      setNotifications(notifications)
    }

    const closeHandler = (_, notifications) => {
      setNotifications(notifications)
    }

    subscribe('open', openHandler)
    subscribe('close', closeHandler)

    return () => {
      unsubscribe('open', openHandler)
      unsubscribe('close', closeHandler)
    }
  }, [])

  return (
    <div className={className}>
      {
        notifications.map(({ id, name, props }) => {
          const component = templates[name]

          if (!component) {
            return null
          }

          return (
            <Notification
              key={id}
              id={id}
              component={component}
              componentProps={props}
            />
          )
        })
      }
    </div>
  )
}


export default React.memo(Notifications)
