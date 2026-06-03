import { io } from '../../index.js'

export function emitPaymentConfirmed(eventId, { userName, amount }) {
  io.to(eventId).emit('payment:confirmed', { userName, amount })
}

export function emitEventCreated(eventData) {
  io.emit('event:created', eventData)
}