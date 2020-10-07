import {Index} from './types'
import {quoteAndCombine} from './util'

export class Query {
  private query: string = 'g'

  static get g() {
    return new Query()
  }

  /** Get the string representation of the query. */
  toString() {
    return this.query
  }

  //////////////////////
  // Start steps
  /////////////////////

  /** Get all vertices, or the vertex with a specific id. */
  V(...ids: string[]) {
    this.query += `.V(${quoteAndCombine(ids)})`
    return this
  }

  /** Get all edges, or the edge with a specific id. */
  E(id?: string) {
    this.query += `.E(${quoteAndCombine(id)})`
    return this
  }

  /**
   * Create a vertex with the specified label.
   * Query returns the newly created vertex
   * for adding properties.
   */
  addV(label: string) {
    this.query += `.addV('${label}')`
    return this
  }

  /**
   * Create a edge with the specified label.
   * Query returns the newly created edge
   * for adding properties.
   */
  addE(label: string) {
    this.query += `.addE('${label}')`
    return this
  }

  //////////////////////
  // Map steps
  /////////////////////

  /** Count the size of the current selection. */
  count() {
    this.query += `.count()`
    return this
  }

  /**
   * Organizes the objects according to some
   * function of the object. Should be
   * followed with `by()`.
   */
  group() {
    this.query += `.group()`
    return this
  }

  /** Extracts the identifier. */
  id() {
    this.query += `.id()`
    return this
  }

  /** Takes a property and extracts the key from it. */
  key() {
    this.query += `.key()`
    return this
  }

  /** Takes an element and extracts the label from it. */
  label() {
    this.query += `.label()`
    return this
  }

  /**
   * Sort the current selection in ascending order.
   * If the selection is made of elements, `order()`
   * should be followed with `by('<KEY>')`.
   */
  order() {
    this.query += `.order()`
    return this
  }

  /** The history of the traverser is realized by examining its path. */
  path() {
    this.query += `.path()`
    return this
  }

  /**
   * Select steps that were previously labeled
   * with `as` in the traversal.
   */
  select(...labels: string[]) {
    this.query += `.select(${quoteAndCombine(labels)})`
    return this
  }

  /** Sums a stream of numbers. */
  sum() {
    this.query += `.sum()`
    return this
  }

  /** Sums a stream of numbers. */
  value() {
    this.query += `.value()`
    return this
  }

  /** Extracts the values of properties from a selection of elements. */
  values(...keys: string[]) {
    this.query += `.values(${quoteAndCombine(keys)})`
    return this
  }

  //////////////////////
  // Vertex steps
  /////////////////////

  /** Move to the outgoing adjacent vertices given the edge labels. */
  out(...edgeLabels: string[]) {
    this.query += `.out(${quoteAndCombine(edgeLabels)})`
    return this
  }

  /** Move to the incoming adjacent vertices given the edge labels. */
  in(...edgeLabels: string[]) {
    this.query += `.in(${quoteAndCombine(edgeLabels)})`
    return this
  }

  /**
   * Move to both the incoming and outgoing
   * adjacent vertices given the edge labels.
   */
  both(...edgeLabels: string[]) {
    this.query += `.both(${quoteAndCombine(edgeLabels)})`
    return this
  }

  /** Move to the outgoing incident edges given the edge labels. */
  outE(...edgeLabels: string[]) {
    this.query += `.outE(${quoteAndCombine(edgeLabels)})`
    return this
  }

  /** Move to the incoming incident edges given the edge labels. */
  inE(...edgeLabels: string[]) {
    this.query += `.inE(${quoteAndCombine(edgeLabels)})`
    return this
  }

  /**
   * Move to both the incoming and outgoing incident edges given the edge labels.
   */
  bothE(...edgeLabels: string[]) {
    this.query += `.bothE(${quoteAndCombine(edgeLabels)})`
    return this
  }

  /** Move to the outgoing vertex. */
  outV() {
    this.query += `.outV()`
    return this
  }

  /** Move to the incoming vertex. */
  inV() {
    this.query += `.inV()`
    return this
  }

  /** Move to both vertices. */
  bothV() {
    this.query += `.bothV()`
    return this
  }

  /** Move to the vertex that was not the vertex that was moved from. */
  otherV() {
    this.query += `.otherV()`
    return this
  }

  //////////////////////
  // Filter steps
  /////////////////////

  /**
   * Filter a selection of vertices, edges, or properties
   * to only those with a certain key, and optionally a
   * certain value for that key.
   */
  has(key: string, value?: string) {
    this.query += `.has(${quoteAndCombine(key, value)})`
    return this
  }

  /**
   * Filter a selection of vertices, edges, or properties
   * to only those with one of the provided labels.
   */
  hasLabel(...labels: string[]) {
    this.query += `.hasLabel(${quoteAndCombine(labels)})`
    return this
  }

  /**
   * Filter a selection of vertices, edges, or properties
   * to only those with one of the provided ids.
   */
  hasId(...labels: string[]) {
    this.query += `.hasId(${quoteAndCombine(labels)})`
    return this
  }

  /**
   * Filter a selection of vertices, edges, or properties
   * to only those with **all** of the provided keys.
   */
  hasKey(...keys: string[]) {
    this.query += `.hasKey(${quoteAndCombine(keys)})`
    return this
  }

  /**
   * Filter a selection of vertices, edges, or properties
   * to only those with **all** of the provided values.
   */
  hasValue(...values: string[]) {
    this.query += `.hasValue(${quoteAndCombine(values)})`
    return this
  }

  /**
   * Filter a selection of vertices, edges, or properties
   * to only those without a certain key.
   */
  hasNot(key: string) {
    this.query += `.hasNot('${key}')`
    return this
  }

  /**
   * Filter a selection of values to only those that
   * are equal to a value.
   */
  is(eq: number) {
    this.query += `.is(${eq})`
    return this
  }

  /**
   * Filter a selection of values to only those that
   * are greater than a value.
   */
  isGt(min: number) {
    this.query += `.is(gt(${min}))`
    return this
  }

  /**
   * Filter a selection of values to only those that
   * are less than a value.
   */
  isLt(max: number) {
    this.query += `.is(lt(${max}))`
    return this
  }

  /**
   * Filter a selection of values to only those that
   * are greater than or equal to a value.
   */
  isGte(min: number) {
    this.query += `.is(gte(${min}))`
    return this
  }

  /**
   * Filter a selection of values to only those that
   * are less than or equal to a value.
   */
  isLte(max: number) {
    this.query += `.is(lte(${max}))`
    return this
  }

  /**
   * Filter a selection of values to only those that
   * are between two values.
   */
  isInside(min: number, max: number) {
    this.query += `.is(inside(${min}))`
    return this
  }

  /**
   * Filter a selection of elements to only those
   * that have not already appeared in the selection.
   */
  dedup() {
    this.query += `.dedup()`
    return this
  }

  /**
   * Filter a selection of elements to only those
   * that lie within a particular index range of
   * the current selection.
   */
  range(minIndex: number, maxIndex: number) {
    this.query += `.range(${minIndex}, ${maxIndex})`
    return this
  }

  /**
   * Filter a selection of elements to only the
   * first n elements.
   */
  limit(n: number) {
    this.query += `.limit(${n})`
    return this
  }

  /**
   * Filter a selection of elements to only the
   * last n elements.
   */
  tail(n: number) {
    this.query += `.tail(${n})`
    return this
  }

  //////////////////////
  // Side effect steps
  /////////////////////

  /**
   * Add a property to an element.
   *
   * An object can optionally be passed to this function.
   * Each key-value pair that exists in the object will
   * be added as if it were called with `.property(key, value)`
   * unless the value is `null` or `undefined`, in which
   * case it will not be added.
   */
  property(key: string | Index, value?: string | number | boolean) {
    if (typeof key === 'string') {
      this.query += `.property(${quoteAndCombine(key, value)})`
      return this
    }

    let map: Index = key
    if (typeof map !== 'object' || map === null || Array.isArray(map))
      return this

    for (let key in map) {
      let value = map[key]
      if (value === null || value === undefined) continue
      this.property(key, value)
    }

    return this
  }

  /**
   * Extracts all properties from each element
   * in the current selection. Returns a single
   * array of all properties.
   */
  properties(key?: string) {
    this.query += `.properties(${quoteAndCombine(key)})`
    return this
  }

  /**
   * Extracts all properties from each element in the
   * current selection as a map. Returns one map per element.
   */
  propertyMap() {
    this.query += `.propertyMap()`
    return this
  }

  /**
   * Removes all elements and their properties in the current
   * selection from the graph.
   */
  drop() {
    this.query += `.drop()`
    return this
  }

  //////////////////////
  // Step modulators
  /////////////////////

  /**
   * Provide a label to the step that can be accessed
   * by later steps that make use of such labels,
   * e.g. `select()`, `match()`.
   */
  as(label: string) {
    this.query += `.as(${quoteAndCombine(label)})`
    return this
  }

  /**
   * If a step is able to accept traversals, functions,
   * comparators, etc. then by() is the means by which
   * they are added.
   */
  by(key: string) {
    this.query += `.by(${quoteAndCombine(key)})`
    return this
  }

  /** Specify the source vertex of an edge. */
  from(target: string | Query) {
    this.query += `.from(${quoteAndCombine(target.toString())})`
    return this
  }

  /** Specify the destination vertex of an edge. */
  to(target: string | Query) {
    this.query += `.to(${quoteAndCombine(target.toString())})`
    return this
  }
}
