import IORedis from 'ioredis'

const client = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
})

client.on('error', (err) => {
  console.error('Redis error:', err)
})

export async function redisConnection() {
  console.log('✅ Redis connected')
}

export default client