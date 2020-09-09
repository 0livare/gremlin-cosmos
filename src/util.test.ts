import {isAPromise, quoteAndCombine} from './util'

describe('isAPromise', () => {
  it('returns false for an object', () => {
    let iut = {}
    expect(isAPromise(iut)).toBeFalsy()
  })

  it('returns false for a function', () => {
    let iut = () => {}
    expect(isAPromise(iut)).toBeFalsy()
  })

  it('returns false for a number', () => {
    let iut = 4
    expect(isAPromise(iut)).toBeFalsy()
  })

  it('returns false for a string', () => {
    let iut = 'zach'
    expect(isAPromise(iut)).toBeFalsy()
  })

  it('returns true for a promise', () => {
    let iut = new Promise(() => {})
    expect(isAPromise(iut)).toBeTruthy()
  })
})

describe('quoteAndCombine', () => {
  describe('when passing multiple arguments', () => {
    it('quotes a single argument', () => {
      expect(quoteAndCombine('zach')).toEqual("'zach'")
    })

    it('quotes joins two arguments', () => {
      expect(quoteAndCombine('zach', 'ryan')).toEqual("'zach', 'ryan'")
    })

    it('quotes joins three arguments', () => {
      expect(quoteAndCombine('zach', 'ryan', 'lola')).toEqual(
        "'zach', 'ryan', 'lola'",
      )
    })
  })

  describe('when explicitly passing an array', () => {
    it('quotes a single argument', () => {
      expect(quoteAndCombine(['zach'])).toEqual("'zach'")
    })

    it('quotes joins two arguments', () => {
      expect(quoteAndCombine(['zach', 'ryan'])).toEqual("'zach', 'ryan'")
    })

    it('quotes joins three arguments', () => {
      expect(quoteAndCombine(['zach', 'ryan', 'lola'])).toEqual(
        "'zach', 'ryan', 'lola'",
      )
    })
  })
})
