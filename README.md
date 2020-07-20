# gremlin-cosmos

gremlin-cosmos wraps the JavaScript implementation of [gremlin](https://www.npmjs.com/package/gremlin) to make interacting with the Gremlin API of a Cosmos DB less painful.

## Install

```bash
# Install with yarn
yarn add gremlin-cosmos

# Or install with npm
npm i gremlin-cosmos
```

## Why

Cosmos DB [does not support](https://docs.microsoft.com/en-us/azure/cosmos-db/gremlin-compatibility#unsupported-features) all features of Gremlin. Most notably, it does not support Gremlin [bytecode](https://tinkerpop.apache.org/docs/current/tutorials/gremlin-language-variants), despite that being the [recommended](http://tinkerpop.apache.org/docs/current/reference/#_submitting_scripts_4) way to use Gremlin. It also does not support the [standard way to connecting](http://tinkerpop.apache.org/docs/current/reference/#_connecting_4) to a Gremlin database.

Microsoft [has documented](https://docs.microsoft.com/en-us/samples/azure-samples/azure-cosmos-db-graph-nodejs-getting-started/developing-nodejs-gremlin) how they intend for you to connect to, and query a Gremlin database. Because Cosmos doesn't support bytecode, you're forced you to submit Gremlin queries as strings; not a very robust solution.

This library provides:

- A strongly typed API for creating Gremlin queries
- A simplified means of connecting to a Cosmos DB's Gremlin API
- A convenient way of submitting created Gremlin queries to Cosmos

## Example Usage

```ts
import {DbConnection, Query, GremlinNode} from 'gremlin-cosmos'

let db = new DbConnection({
  endpoint: 'wss://my-cosmos-1.gremlin.cosmos.azure.com:443',
  primaryKey: 'HfjhjyfgUYGutyfTKWOMjojwgLYGTDaKLBOPihFTrdyTERlw==',
  database: 'my-db-1',
  collection: 'myCollection',
})

let query = Query.g.V('a@b.com').outE('owns').inV().has('label', 'report')

let response = await db.execute<GremlinNode>(query)
```

You'll notice that the syntax for creating a query via the `Query` object is very close the the syntax used with Gremlin bytecode.

## Types

### `DbConnection`

| Method signature                                                  | Description                                                                        |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `constructor(config: DbConfig)`                                   | Instantiate a `DbConnection` object, but do not actually connect to the database   |
| `open(): Promise`                                                 | Connect to the database                                                            |
| `close(): Promise`                                                | Close connection to the database                                                   |
| `runQuery<T>: Promise<GremlinResponse<T>>`                        | Run a Gremlin query against the database                                           |
| `use(callback: (db: DbConnection) => void): Promise<void>`        | A convenience method for automatically opening and closing the database connection |
| `execute<T>(query: string \| Query): Promise<GremlinResponse<T>>` | Opens the database, runs the specified query, then closes the database             |

### `Query`

| Property name | Type    | Description                  |
| ------------- | ------- | ---------------------------- |
| `g`           | `Query` | Creates a new `Query` object |

| Method signature                                  | Description                                                                                                                                                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toString()`                                      | Get the string representation of the query                                                                                                                             |
| `V(id?: string)`                                  | Get all vertices, or the vertex with a specific id                                                                                                                     |
| `addV(label: string)`                             | Create a vertex with the specified label. Query returns the newly created vertex for adding properties                                                                 |
| `addE(label: string)`                             | Create an edge from the current selection with the specified label. Query returns the newly created vertex for adding properties and specifying the destination vertex |
| `to(target: string \| Query)`                     | Specify the destination vertex of an edge                                                                                                                              |
| `outE(edgeLabel?: string)`                        | Find all edges that go out from the current selection                                                                                                                  |
| `inV()`                                           | Transform an edge selection to the destination vertices of those edges                                                                                                 |
| `has(property: string, propValue: string)`        | Filter the current selection to only those with a certain property value                                                                                               |
| `property(property: string, propValue: string)`   | Add a property to a node                                                                                                                                               |
| `properties(properties: {[key: string]: string})` | Add multiple properties to a node as specified by a JavaScript object                                                                                                  |
| `count()`                                         | Count the size of the current selection                                                                                                                                |
