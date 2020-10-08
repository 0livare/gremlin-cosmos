import {Query} from './query'

describe('.V()', () => {
  it('takes no arguments', () => {
    let q = Query.g.V()
    expect(q.toString()).toBe('g.V()')
  })

  it('takes a single argument', () => {
    let q = Query.g.V('zach')
    expect(q.toString()).toBe("g.V('zach')")
  })

  it('takes multiple arguments', () => {
    let q = Query.g.V('zach', 'ryan', 'lola')
    expect(q.toString()).toBe("g.V('zach', 'ryan', 'lola')")
  })

  it('returns a Query', () => {
    expect(Query.g.V()).toBeInstanceOf(Query)
  })
})

describe('.E()', () => {
  it('takes no arguments', () => {
    let q = Query.g.E()
    expect(q.toString()).toBe('g.E()')
  })

  it('takes a single argument', () => {
    let q = Query.g.E('zach')
    expect(q.toString()).toBe("g.E('zach')")
  })

  it('returns a Query', () => {
    expect(Query.g.E()).toBeInstanceOf(Query)
  })
})

describe('.addV()', () => {
  it('takes a single argument', () => {
    let q = Query.g.addV('zach')
    expect(q.toString()).toBe("g.addV('zach')")
  })

  it('returns a Query', () => {
    expect(Query.g.addV('zach')).toBeInstanceOf(Query)
  })
})

describe('.addE()', () => {
  it('takes a single argument', () => {
    let q = Query.g.addE('zach')
    expect(q.toString()).toBe("g.addE('zach')")
  })

  it('returns a Query', () => {
    expect(Query.g.addE('zach')).toBeInstanceOf(Query)
  })
})

describe('.count()', () => {
  it('takes no arguments', () => {
    let q = Query.g.count()
    expect(q.toString()).toBe('g.count()')
  })

  it('returns a Query', () => {
    expect(Query.g.count()).toBeInstanceOf(Query)
  })
})

describe('.group()', () => {
  it('takes no arguments', () => {
    let q = Query.g.group()
    expect(q.toString()).toBe('g.group()')
  })

  it('returns a Query', () => {
    expect(Query.g.group()).toBeInstanceOf(Query)
  })
})

describe('.id()', () => {
  it('takes no arguments', () => {
    let q = Query.g.id()
    expect(q.toString()).toBe('g.id()')
  })

  it('returns a Query', () => {
    expect(Query.g.id()).toBeInstanceOf(Query)
  })
})

describe('.property()', () => {
  it('takes a key and a value', () => {
    let q = Query.g.property('foo', 'bar')
    expect(q.toString()).toBe("g.property('foo', 'bar')")
  })

  it('ignores null', () => {
    let q = Query.g.property(null)
    expect(q.toString()).toBe('g')
  })

  it('ignores an array', () => {
    let q = Query.g.property([] as any)
    expect(q.toString()).toBe('g')
  })

  it('accepts an object', () => {
    let q = Query.g.property({foo: 'oof', bar: 'rab'})
    expect(q.toString()).toBe("g.property('foo', 'oof').property('bar', 'rab')")
  })

  it('ignores null values within an object', () => {
    let q = Query.g.property({foo: 'bar', bar: null})
    expect(q.toString()).toBe("g.property('foo', 'bar')")
  })

  it('ignores undefined values within an object', () => {
    let q = Query.g.property({foo: 'bar', bar: undefined})
    expect(q.toString()).toBe("g.property('foo', 'bar')")
  })
})

describe('.as()', () => {
  it('it takes a label as a string', () => {
    let q = Query.g.V('foo').as('bar')
    expect(q.toString()).toBe("g.V('foo').as('bar')")
  })
})

describe('.by()', () => {
  it('it takes a label as a string', () => {
    let q = Query.g.V('foo').by('bar')
    expect(q.toString()).toBe("g.V('foo').by('bar')")
  })
})

describe('.by()', () => {
  it('it takes a key as a string', () => {
    let q = Query.g.V('foo').by('bar')
    expect(q.toString()).toBe("g.V('foo').by('bar')")
  })
})

describe('.from()', () => {
  it('it takes a target as a string', () => {
    let q = Query.g.V('foo').addE('bar').from('source')
    expect(q.toString()).toBe("g.V('foo').addE('bar').from('source')")
  })

  it('it takes a target as a query', () => {
    let target = Query.g.V('target')
    let q = Query.g.V('foo').addE('bar').from(target)
    expect(q.toString()).toBe("g.V('foo').addE('bar').from(g.V('target'))")
  })
})

describe('.to()', () => {
  it('it takes a target as a string', () => {
    let q = Query.g.V('foo').addE('bar').to('source')
    expect(q.toString()).toBe("g.V('foo').addE('bar').to('source')")
  })

  it('it takes a target as a query', () => {
    let target = Query.g.V('target')
    let q = Query.g.V('foo').addE('bar').to(target)
    expect(q.toString()).toBe("g.V('foo').addE('bar').to(g.V('target'))")
  })
})
