export class Query {
  private query: string = 'g'

  static get g() {
    return new Query()
  }

  V(id?: string) {
    let params = id ? id : ''
    this.query += `.V('${params}')`
    return this
  }

  addV(label: string) {
    this.query += `.addV('${label}')`
    return this
  }

  addE(label: string) {
    this.query += `.addE('${label}')`
    return this
  }

  to(target: string | Query) {
    let params = target instanceof Query ? target.query : target
    this.query += `.to(${params})`
    return this
  }

  outE(edgeLabel?: string) {
    this.query += `.outE('${edgeLabel}')`
    return this
  }

  inV() {
    this.query += '.inV()'
    return this
  }

  has(property: string, propValue: string) {
    this.query += `.has('${property}', '${propValue}')`
    return this
  }

  property(property: string, propValue: string) {
    this.query += `.property('${property}', '${propValue}')`
    return this
  }

  properties(properties: {[key: string]: string}) {
    for (let propName in properties) {
      this.property(propName, properties[propName])
    }
    return this
  }

  count() {
    this.query += `.count()`
    return this
  }

  toString() {
    return this.query
  }
}
