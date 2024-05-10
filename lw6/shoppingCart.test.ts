import {ShoppingCart} from './shoppingCart'

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

  it('should update quantity of item in cart', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.updateQuantity(1, 5)
    expect(cart.items[0].quantity).toBe(5)
  })

  it('should clear cart', () => {
    cart.addItem(1, 'Product 1', 10, 2)
    cart.clearCart()
    expect(cart.items.length).toBe(0)
  })
})