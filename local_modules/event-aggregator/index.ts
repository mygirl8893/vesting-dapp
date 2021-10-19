class Event {

  name: string
  handlers: Array<Function>

  constructor(name: string) {
    this.name = name
    this.handlers = []
  }

  /**
   * Add handler to current Event
   */
  addHandler(handler: Function) {
    this.handlers.push(handler.bind({
      unsubscribe: () => {
        this.removeHandler(handler)
      },
    }))
  }

  /**
   * Remove handler from current Event
   */
  removeHandler(handler: Function) {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }

  /**
   * Call all handlers in all priorities of current Event
   */
  call(...eventArgs: Array<any>) {
    this.handlers.forEach((handler) => {
      try {
        handler(...eventArgs)
      }
      catch (err) {
        console.error(err)
      }
    })
  }
}

class EventAggregator {

  events: object

  constructor() {
    this.events = {}
  }

  /**
   * Get Event by name
   */
  getEvent(name: string): Event {
    let event = this.events[name]

    if (!event) {
      event = new Event(name)
      this.events[name] = event
    }

    return event
  }

  subscribe(name: string, handler: Function): () => void {
    const event = this.getEvent(name)

    event.addHandler(handler)

    return () => {
      this.unsubscribe(name, handler)
    }
  }

  unsubscribe(name: string, handler: Function) {
    const event = this.getEvent(name)

    event.removeHandler(handler)
  }

  dispatch(name: string, ...eventArgs: Array<any>) {
    const event = this.getEvent(name)

    if (event) {
      event.call(...eventArgs)
    }
  }
}

export const events = new EventAggregator()

export default EventAggregator
