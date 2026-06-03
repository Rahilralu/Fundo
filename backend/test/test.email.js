import '../src/worker/emailWorker.js'
import { emailQueue } from '../src/queues/emailQueue.js'

await emailQueue.add('sendConfirmation', {
  to: 'tested.3.3.54@gmail.com',
  userName: 'Test User',
  eventName: 'Test Event',
  amount: 499
})

console.log('Job added to queue')