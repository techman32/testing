import {ShoppingCart} from './shoppingCart'

const MAX_COUNT_ITEMS: number = 10000
const MAX_PRICE_ITEM: number = 1000000000

describe('ShoppingCart', () => {
  let cart: ShoppingCart

  beforeEach(() => {
    cart = new ShoppingCart()
  })

  it('should initialize with empty items', () => {
    expect(cart.items.length).toBe(0)
  })

  it('should add item to cart', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    expect(cart.items.length).toBe(1)
    expect(cart.items[0]).toEqual({id: 1, name: 'Product 1', price: 10, quantity: 2})
  })

  it('should remove item from cart', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.removeItem(1)
    expect(cart.items.length).toBe(0)
  })

  it('should calculate total price correctly', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.addItem(2, 'Product 2', 20, 1)
    expect(cart.getTotalPrice()).toBe(40)
  })

  it('should negative price badly', () => {
    cart.addItem(1, 'Product 1', -20, 3)
    expect(cart.items[0].price).toBe(0)
  })

  it('should negative quantity badly', () => {
    cart.addItem(1, 'Product 1', 240, -4)
    expect(cart.items[0].quantity).toBe(0)
  })

  it('should update quantity of item in cart', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.updateQuantity(1, 7)
    expect(cart.items[0].quantity).toBe(7)
  })

  it('should clear cart', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.clearCart()
    expect(cart.items.length).toBe(0)
  })

  it('should one product of many quantity', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.addItem(1, 'Product 1', 10, 2)
    expect(cart.items[0].quantity).toBe(4)
  })

  it('should add a new item if id is unique', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 1.5, quantity: 3}])
  })

  it('should increase quantity if id already exists', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    cart.addItem(1, 'Apple', 1.5, 2)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 1.5, quantity: 5}])
  })

  it('should increase quantity if id already exists', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    cart.addItem(1, 'Apple', 1.5, 2)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 1.5, quantity: 5}])
  })


  it('should assign a new id if id exists but name is different', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    cart.addItem(1, 'Green Apple', 1.5, 2)
    const newId = cart.items.find(item => item.name === 'Green Apple')?.id
    expect(cart.items).toEqual([
      {id: 1, name: 'Apple', price: 1.5, quantity: 3},
      {id: newId, name: 'Green Apple', price: 1.5, quantity: 2},
    ])
    expect(newId).toBeDefined()
    expect(newId).not.toBe(1)
  })

  it('should add a new item if id is new but name already exists', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    cart.addItem(2, 'Apple', 2.0, 1)
    expect(cart.items).toEqual([
      {id: 1, name: 'Apple', price: 1.5, quantity: 3},
      {id: 2, name: 'Apple', price: 2.0, quantity: 1},
    ])
  })

  it('should not add an item if id is negative', () => {
    cart.addItem(-1, 'Apple', 1.5, 3)
    expect(cart.items).toEqual([])
  })

  it('should set quantity to 0 if quantity is less than 0', () => {
    cart.addItem(1, 'Apple', 1.5, -3)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 1.5, quantity: 0}])
  })

  it('should set price to 0 if price is less than 0', () => {
    cart.addItem(1, 'Apple', -1.5, 3)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 0, quantity: 3}])
  })

  it('should correctly handle multiple addItem operations', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    cart.addItem(2, 'Banana', 1.0, 2)
    cart.addItem(1, 'Apple', 1.5, 2)
    cart.addItem(3, 'Orange', 2.0, 1)
    cart.addItem(2, 'Banana', 1.0, -1)
    cart.addItem(4, 'Apple', 2.0, 4)
    expect(cart.items).toEqual([
      {id: 1, name: 'Apple', price: 1.5, quantity: 5},
      {id: 2, name: 'Banana', price: 1.0, quantity: 2},
      {id: 3, name: 'Orange', price: 2.0, quantity: 1},
      {id: 4, name: 'Apple', price: 2.0, quantity: 4},
    ])
  })

  it('should handle updating quantity to maximum value', () => {
    cart.addItem(1, 'Apple', 1.5, 3)
    cart.updateQuantity(1, MAX_COUNT_ITEMS)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 1.5, quantity: MAX_COUNT_ITEMS}])
  })

  it('should handle updating price to maximum value', () => {
    const maxPrice = Number.MAX_SAFE_INTEGER
    cart.addItem(1, 'Apple', 1.5, 3)
    const item = cart.items.find(item => item.id === 1)
    if (item) {
      item.price = maxPrice
    }
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: maxPrice, quantity: 3}])
  })

  it('should handle adding an item with quantity just above maximum', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
    })
    cart.addItem(1, 'Apple', 1.5, MAX_COUNT_ITEMS + 1)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: 1.5, quantity: MAX_COUNT_ITEMS}])
    expect(consoleWarnSpy).toHaveBeenCalledWith('Maximum item quantity reached. Cannot add more of this product.')
    consoleWarnSpy.mockRestore()
  })

  it('should handle updating price to maximum + 1 value', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
    })
    cart.addItem(1, 'Apple', MAX_PRICE_ITEM + 1, 3)
    const item = cart.items.find(item => item.id === 1)
    expect(cart.items).toEqual([{id: 1, name: 'Apple', price: MAX_PRICE_ITEM, quantity: 3}])
    expect(consoleWarnSpy).toHaveBeenCalledWith('Maximum item price reached. Cannot set price above this value.')
    consoleWarnSpy.mockRestore()
  })
})