export function on(
  target: EventTarget,
  eventName: keyof GlobalEventHandlersEventMap,
  handler: EventListenerOrEventListenerObject | null,
  options: boolean
) {
  target.addEventListener(eventName, handler,options)
}