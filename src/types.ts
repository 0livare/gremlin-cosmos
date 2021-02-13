export type DbConfig = {
  endpoint: string // e.g. 'wss://my-cosmos-db.gremlin.cosmos.azure.com:443'
  primaryKey: string // e.g. 'abcd123==',
  database: string
  collection: string
}

export type GremlinNode = {
  id: string
  label: string
  type: 'vertex' | 'edge'
  properties: {[key: string]: Array<{id: string; value: string}>}
}

export type GremlinResponse<T = GremlinNode> = {
  _items: T[]
  length: number
  attributes: {
    'x-ms-status-code': number
    'x-ms-request-charge': number
    'x-ms-total-request-charge': number
    'x-ms-server-time-ms': number
    'x-ms-total-server-time-ms': number
    'x-ms-activity-id': string
  }
}

export type Index = {[key: string]: string | number | boolean}
