// src/index.ts
// GoldnGoose main entry point — starts agent AND API server

import 'dotenv/config'
import { initAgent, runQuery, healthCheck } from './agent/index.js'
import { startServer } from './api/server.js'
import { logger } from './utils/logger.js'

const PORT = parseInt(process.env.PORT ?? '3000', 10)

async function main() {
  logger.info('Starting GoldnGoose...')

  try {
    // Initialize the agent
    await initAgent()
    logger.info('Agent initialized successfully')

    // Run health check
    const health = await healthCheck()
    logger.info('Health check results', { health })

    // Start API server
    const server = await startServer(PORT)
    logger.info(`API server started on http://localhost:${PORT}`)

    // If a query is provided as argument, run it
    const queryArg = process.argv[2]
    if (queryArg) {
      logger.info('Running query from command line', { question: queryArg })

      const result = await runQuery(queryArg)
      logger.info('Query completed', {
        answer: result.answer.substring(0, 200) + '...',
        sources: result.sources,
        confidence: result.confidence,
        steps: result.steps.length,
      })

      console.log('\n=== ANSWER ===')
      console.log(result.answer)
      console.log('\n=== SOURCES ===')
      result.sources.forEach((source, i) => console.log(`${i + 1}. ${source}`))
      console.log('\n=== CONFIDENCE ===')
      console.log(result.confidence)
    }

    console.log(`\n🚀 GoldnGoose API running on http://localhost:${PORT}`)
    console.log('Press Ctrl+C to stop')

    // Keep process alive
    process.on('SIGINT', () => {
      logger.info('Shutting down...')
      server.close()
      process.exit(0)
    })
  } catch (error) {
    logger.error('Failed to run GoldnGoose', { error })
    process.exit(1)
  }
}

main()