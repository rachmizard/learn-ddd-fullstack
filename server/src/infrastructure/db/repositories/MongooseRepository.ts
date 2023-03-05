import { Collection, Document } from 'mongoose'
import { IDatabaseRespository } from './DatatabaseRepository'

export interface IMongooseRepository extends IDatabaseRespository {
  getCollection<D extends Document>(collectionName: string): Collection<D>
  getCollectionNames(): Promise<string[]>
}
