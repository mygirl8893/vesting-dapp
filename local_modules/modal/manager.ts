type OpenModalOpts = { [key: string]: any }
type OpenedModals = string[]
type WaitingModals = { [key: string]: OpenModalOpts }
type Handler = (isVisible: boolean, props?: any) => void
type Subscribers = { [key: string]: Handler }


let openedModals: OpenedModals = []
let waitingModals: WaitingModals = {}

const subscribers: Subscribers = {}

const subscribe = (modalName: string, handler: Handler) => {
  if (subscribers[modalName]) {
    console.error(`Multiple modals with same name: ${modalName}`)
  }

  subscribers[modalName] = handler

  if (modalName in waitingModals) {
    // if there is an unopened modal, open it
    openModal(modalName, waitingModals[modalName])
  }
}

const unsubscribe = (modalName: string) => {
  delete subscribers[modalName]
}

const openModal = <TProps extends {}>(name: string, props?: TProps & OpenModalOpts) => {
  if (typeof subscribers[name] === 'function') {
    openedModals.push(name)
    subscribers[name](true, props)
    delete waitingModals[name]

    return
  }

  // sometimes openModal can be called before subscribe,
  // so we need to save them to show later
  waitingModals[name] = props
}

const closeModal = (name?: string): void => {
  const modalName = name || openedModals[openedModals.length - 1]

  if (typeof subscribers[modalName] === 'function') {
    openedModals = openedModals.filter((v) => v !== modalName)
    subscribers[modalName](false)
  }

  delete waitingModals[modalName]
}

const closeAllModals = (): void => {
  openedModals.forEach((name) => {
    if (typeof subscribers[name] === 'function') {
      subscribers[name](false)
    }
  })

  openedModals = []
  waitingModals = {}
}

const getOpenedModals = (): OpenedModals => openedModals


export {
  subscribe,
  unsubscribe,
  openModal,
  closeModal,
  closeAllModals,
  getOpenedModals,
}
