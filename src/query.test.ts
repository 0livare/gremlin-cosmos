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
