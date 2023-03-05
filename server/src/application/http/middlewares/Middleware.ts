import { HandleContext } from '@/infrastructure/HandleContext'

export interface Middleware {
  handle: HandleContext
}
