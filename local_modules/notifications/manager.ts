import EventAggregator from 'event-aggregator'


type Event = 'open' | 'close'
type SubscribeHandler = (notification: OpenedNotification, notifications: OpenedNotifications) => void
type NotificationProps = { [key: string]: any }
type OpenedNotification = { id: number, name: string, props: NotificationProps }
type OpenedNotifications = OpenedNotification[]

type Notifications = {}


const events = new EventAggregator()
let notifications: OpenedNotifications = []
let notificationId = 1

const subscribe = (event: Event, handler: SubscribeHandler) => {
  events.subscribe(event, handler)
}

const unsubscribe = (event: Event, handler: SubscribeHandler) => {
  events.unsubscribe(event, handler)
}

const openNotification = <K extends keyof Notifications>(name: K, props?: Notifications[K]) => {
  const notification = { id: ++notificationId, name, props }

  notifications = [ ...notifications, notification ]

  events.dispatch('open', notification, notifications)
}

const closeNotification = (id: number): void => {
  const notification = notifications.find((notification) => notification.id === id)

  if (notification) {
    notifications = notifications.filter((notification) => notification.id !== id)
    events.dispatch('close', notification, notifications)
  }
}

const closeAllNotifications = (): void => {
  notifications.forEach((notification) => {
    closeNotification(notification.id)
  })
}


export {
  subscribe,
  unsubscribe,
  openNotification,
  closeNotification,
  closeAllNotifications,
}
