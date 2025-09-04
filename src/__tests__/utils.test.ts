import { formatPrice, slugify, generateOrderNumber } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(99.99)).toBe('$99.99')
      expect(formatPrice(0)).toBe('$0.00')
      expect(formatPrice(1000)).toBe('$1,000.00')
    })

    it('should format price with different currency', () => {
      expect(formatPrice(99.99, 'EUR')).toBe('€99.99')
      expect(formatPrice(99.99, 'GBP')).toBe('£99.99')
    })
  })

  describe('slugify', () => {
    it('should create URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Product Name!')).toBe('product-name')
      expect(slugify('Multiple   Spaces')).toBe('multiple-spaces')
    })
  })

  describe('generateOrderNumber', () => {
    it('should generate unique order numbers', () => {
      const order1 = generateOrderNumber()
      const order2 = generateOrderNumber()
      
      expect(order1).toMatch(/^DD-[a-z0-9]+-[a-z0-9]+$/i)
      expect(order2).toMatch(/^DD-[a-z0-9]+-[a-z0-9]+$/i)
      expect(order1).not.toBe(order2)
    })
  })
})
