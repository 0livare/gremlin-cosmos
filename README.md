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

Cosmos DB [does not support](https://docs.microsoft.com/en-us/azure/cosmos-db/gremlin-compatibility#unsupported-features) all features of Gremlin. Most notably, it does not support Gremlin [bytecode](https://tinkerpop.apache.org/docs/current/tutorials/gremlin-language-variants), despite that being the [recommended](http://tinkerpop.apache.org/docs/current/reference/#_submitting_scripts_4) way to use Gremlin. It also does not support the [standard way to connecting](http://tinkerpop.apache.org/docs/current/reference/#_connecting_4) to a Gremlin database, or many types of Gremlin queries.

Microsoft [has documented](https://docs.microsoft.com/en-us/samples/azure-samples/azure-cosmos-db-graph-nodejs-getting-started/developing-nodejs-gremlin) how they intend for you to connect to, and query a Gremlin database. Because Cosmos doesn't support bytecode, you're forced you to submit Gremlin queries as strings; not a very robust solution.

This library provides:

- A strongly typed API for creating Gremlin queries
- A simplified means of connecting to a Cosmos DB's Gremlin API
- A convenient way of submitting created Gremlin queries to Cosmos

## Example Usage

```ts
import {DbConnection, Query, GremlinElement} from 'gremlin-cosmos'

let db = new DbConnection({
  endpoint: 'wss://my-cosmos-1.gremlin.cosmos.azure.com:443',
  primaryKey: 'superSuperSecretKey==',
  database: 'my-db-1',
  collection: 'myCollection',
})

let query = Query.g.V('a@b.com').outE('owns').inV().has('label', 'report')

let response = await db.execute<GremlinElement>(query)
```

You'll notice that the syntax for creating a query via the `Query` object is very close the the syntax used with Gremlin bytecode.

## `DbConnection`

| Method signature                                                  | Description                                                                        |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `constructor(config: DbConfig)`                                   | Instantiate a `DbConnection` object, but do not actually connect to the database   |
| `open(): Promise`                                                 | Connect to the database                                                            |
| `close(): Promise`                                                | Close connection to the database                                                   |
| `runQuery<T>: Promise<GremlinResponse<T>>`                        | Run a Gremlin query against the database                                           |
| `use(callback: (db: DbConnection) => void): Promise<void>`        | A convenience method for automatically opening and closing the database connection |
| `execute<T>(query: string \| Query): Promise<GremlinResponse<T>>` | Opens the database, runs the specified query, then closes the database             |

## `Query`

| Property name | Type    | Description                  |
| ------------- | ------- | ---------------------------- |
| `g`           | `Query` | Creates a new `Query` object |

### Methods

- `toString()`: Get the string representation of the query.

#### [Start Steps](https://tinkerpop.apache.org/docs/current/reference/#start-steps)

- `V(id?: string)`: Get all vertices, or the vertex with a specific id.
- `E(id?: string)`: Get all edges, or the edge with a specific id.
- [`addV(label: string)`](https://tinkerpop.apache.org/docs/current/reference/#addvertex-step): Create a vertex with the specified label. Query returns the newly created vertex for adding properties.
- [`addE(label: string)`](https://tinkerpop.apache.org/docs/current/reference/#addedge-step): Create an edge from the current selection with the specified label. Query returns the newly created edge for adding properties and specifying the destination vertex.

#### Map Steps

- `count()`: Count the size of the current selection.
- `group()`: Organizes the objects according to some function of the object. Should be followed with `by()`.
- `id()`: Extracts the identifier.
- `key()`: Takes a property and extracts the key from it.
- `label()`: Takes an element and extracts the label from it.
- `order()`: Sort the current selection in ascending order. If the selection is made of elements, `order()` should be followed with `by('<KEY>')`.
- [`path()`](https://tinkerpop.apache.org/docs/current/reference/#path-step): The history of the traverser is realized by examining its path.
- [`select(...labels: string[])`](https://tinkerpop.apache.org/docs/current/reference/#select-step): Select steps that were previously labeled with `as` in the traversal.
- `sum()`: Sums a stream of numbers.
- `value()`: c
- `values(...keys?: string[])` - Extracts the values of properties from a selection of elements.

#### [Vertex Steps](https://tinkerpop.apache.org/docs/current/reference/#vertex-steps)

- `out(...edgeLabels?: string[])`: Move to the outgoing adjacent vertices given the edge labels.
- `in(...edgeLabels?: string[])`: Move to the incoming adjacent vertices given the edge labels.
- `both(...edgeLabels?: string[])`: Move to both the incoming and outgoing adjacent vertices given the edge labels.
- `outE(...edgeLabels?: string[])`: Move to the outgoing incident edges given the edge labels.
- `inE(...edgeLabels?: string[])`: Move to the incoming incident edges given the edge labels.
- `bothE(...edgeLabels?: string[])`: Move to both the incoming and outgoing incident edges given the edge labels.
- `outV()`: Move to the outgoing vertex.
- `inV()`: Move to the incoming vertex.
- `bothV()`: Move to both vertices.
- `otherV()` Move to the vertex that was not the vertex that was moved from.

#### [Filter Steps](https://tinkerpop.apache.org/docs/current/reference/#has-step)

Filter a selection of vertices, edges, or properties to only those:

- `has(key: string, value?: string)`: With a certain key, and optionally a certain value for that key.
- `hasLabel(...labels: string[])`: With one of the provided labels.
- `hasId(...ids: string[])`: With one of the provided ids.
- `hasKey(...keys: string[])`: With **all** of the provided keys.
- `hasValue(...values: string[])`: With **all** of the provided values.
- `hasNot(key)`: Without a certain key.

Filter a selection of values to only those that are:

- `is(eq: number)`: Equal to a value.
- `isGt(min: number)`: Greater than a value.
- `isLt(max: number)`: Less than a value.
- `isGte(min: number)`: Greater than or equal to a value.
- `isLte(max: number)`: Less than or equal to a value.
- `isInside(min: number, max: number)`: Between two values.

Filter a selection of elements to:

- `dedup()`: Those that have not already appeared in the selection.
- `range(minIndex: number, maxIndex: number)`: Those that lie within a particular index range of the current selection.
- `limit(n: number)`: The first n elements.
- `tail(n: number)`: The last n elements.

#### Side Effect Steps

- [`property(key: string, value: string)`](https://tinkerpop.apache.org/docs/current/reference/#addproperty-step): Add a property to an element.
- `property(map: {[key: string]: string})`: Add multiple properties to an element as specified by a JavaScript object.

- [`properties(key?: string)`](https://tinkerpop.apache.org/docs/current/reference/#properties-step): Extracts all properties from each element in the current selection. Returns a single array of all properties.
- `propertyMap()`: Extracts all properties from each element in the current selection as a map. Returns one map per element.

- [`drop()`](https://tinkerpop.apache.org/docs/current/reference/#drop-step): Removes all elements and their properties in the current selection from the graph.

#### Step Modulators

- [`as(label: string)`](https://tinkerpop.apache.org/docs/current/reference/#as-step): Provide a label to the step that can be accessed by later steps that make use of such labels, e.g. `select()`, `match()`.

- [`by(key: string)`](https://tinkerpop.apache.org/docs/current/reference/#by-step): If a step is able to accept traversals, functions, comparators, etc. then by() is the means by which they are added.

- `from(source: string \| Query)`: Specify the source vertex of an edge.
- `to(target: string \| Query)`: Specify the destination vertex of an edge.
