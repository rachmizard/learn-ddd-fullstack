import * as http from 'http'
import express, { Express } from 'express'
import { inject, injectable } from 'inversify'

import winston from '@/infrastructure/logger/winston'
import Morgan from '@/infrastructure/logger/morgan'
import MongoDatabase from '@/infrastructure/db/mongodb/mongoose.db'
import { TYPES } from '@/infrastructure/inversify/inversify.types'
import { env } from '@/shared/config/env'

export interface IApplication {
  start(): void
}

@injectable()
class Application implements IApplication {
  @inject(TYPES.Morgan) private readonly _morgan: Morgan = new Morgan()
  @inject(TYPES.Database) private readonly _database: MongoDatabase = new MongoDatabase()

  private readonly _express: Express = express()
  private readonly _server: http.Server = http.createServer(this._express)
  private readonly _port: number = env.PORT.toString() ? parseInt(env.PORT.toString()) : 3000

  public start(): void {
    this._express.use(this._morgan.use)

    this._server.listen(this._port, () => {
      winston.info(`Server started on port ${this._port}`)
    })

    this._database.connect()

    process.on('exit', (code) => {
      winston.info(`Process exited with code ${code}`)
    })
  }
}

export default Application
