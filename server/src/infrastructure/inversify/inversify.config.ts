import 'reflect-metadata'
import { Container } from 'inversify'

import Application, { IApplication } from '@/Application'
import MongoDatabase from '@/infrastructure/db/mongodb/mongoose.db'
import Morgan from '@/infrastructure/logger/morgan'
import { IMongooseRepository } from '@/infrastructure/db/repositories/MongooseRepository'

import { TYPES } from './inversify.types'

const container = new Container()

// // Bind the infrastructure to the container
container.bind<IApplication>(TYPES.Application).to(Application).inSingletonScope()
container.bind<Morgan>(TYPES.Morgan).to(Morgan).inSingletonScope()
container.bind<IMongooseRepository>(TYPES.Database).to(MongoDatabase).inSingletonScope()

export default container
