import container from '@/infrastructure/inversify/inversify.config'
import { IApplication } from '@/Application'
import { TYPES } from '@/infrastructure/inversify/inversify.types'

const server = container.get<IApplication>(TYPES.Application)
server.start()
