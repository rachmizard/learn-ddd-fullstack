import { injectable } from 'inversify'
import mongoose, { Collection, Document } from 'mongoose'

import { IMongooseRepository } from '../repositories/MongooseRepository'
import winston from '@/infrastructure/logger/winston'
import { env } from '@/shared/config/env'

@injectable()
export default class MongoDatabase implements IMongooseRepository {
  public connect(): void {
    mongoose.connect(env.MONGO_URI)
    mongoose.connection.on('error', (err) => {
      winston.error(`Mongoose connection error: ${err}`)
    })
    mongoose.connection.on('connected', () => {
      winston.info('Mongoose connected')
    })
  }

  public disconnect(): void {
    mongoose.disconnect()
  }
  public isConnected(): boolean {
    return mongoose.connection.readyState === 1
  }

  public getCollection<D extends Document>(collectionName: string): Collection<D> {
    return mongoose.connection.collection(collectionName)
  }

  async getCollectionNames(): Promise<string[]> {
    return mongoose.connection.db
      .listCollections()
      .toArray()
      .then((collections) => {
        return collections.map((collection) => collection.name)
      })
  }
}
