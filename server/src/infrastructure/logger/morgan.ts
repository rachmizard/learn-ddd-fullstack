import { injectable } from 'inversify'
import morgan from 'morgan'
import { HandleContext } from '@/../src/infrastructure/HandleContext'

import { env } from '@/../src/shared/config/env'
import winston from './winston'

@injectable()
class Morgan {
  public use: HandleContext = (req, res, next) => {
    const stream = {
      write: (message: string) => winston.http(message),
    }

    const skip = () => {
      return env.NODE_ENV !== 'development'
    }

    const options = {
      stream,
      skip,
    }

    return morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', options)(req, res, next)
  }
}

export default Morgan
