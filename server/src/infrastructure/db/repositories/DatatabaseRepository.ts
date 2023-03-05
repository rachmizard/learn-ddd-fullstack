export interface IDatabaseRespository {
  connect(): void
  disconnect(): void
  isConnected(): boolean
}
