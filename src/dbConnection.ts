import * as Gremlin from 'gremlin'

import {DbConfig, GremlinResponse} from './types'
import {isAPromise} from './util'
import {Query} from './query'

export class DbConnection {
  private client: Gremlin.driver.client

  constructor(config: DbConfig) {
    const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(
      `/dbs/${config.database}/colls/${config.collection}`,
      config.primaryKey,
    )

    this.client = new Gremlin.driver.Client(config.endpoint, {
      authenticator,
      traversalsource: 'g',
      rejectUnauthorized: true,
      mimeType: 'application/vnd.gremlin-v2.0+json',
    })
  }

  async open() {
    await this.client.open()
  }

  async close() {
    await this.client.close()
  }

  async runQuery<T = GremlinResponse>(
    query: string | Query,
    data = {},
  ): Promise<T> {
    let strQuery = query instanceof Query ? query.toString() : query
    return await this.client.submit(strQuery, data)
  }

  async use(callback: (db: DbConnection) => void): Promise<void> {
    await this.open()

    let r = callback(this)
    if (isAPromise(r)) await r

    await this.close()
  }
}
