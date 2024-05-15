const MAX_COUNT_ITEMS: number = 10000
const MAX_PRICE_ITEM: number = 1000000000

export class ShoppingCart {
  private _items: { id: number, name: string, price: number, quantity: number }[]

  constructor() {
    this._items = []
  }

  get items(): { id: number, name: string, price: number, quantity: number }[] {
    return this._items
  }

  addItem(id: number, name: string, price: number, quantity: number): void {
    if (id < 0) return
    if (quantity < 0) quantity = 0
    if (price < 0) price = 0
    if (price > MAX_PRICE_ITEM) {
      price = MAX_PRICE_ITEM
      console.warn('Maximum item price reached. Cannot set price above this value.')
    }

    const existingItemById = this._items.find(item => item.id === id)

    if (existingItemById) {
      if (existingItemById.name === name) {
        existingItemById.quantity += quantity
        if (existingItemById.quantity > MAX_COUNT_ITEMS) {
          existingItemById.quantity = MAX_COUNT_ITEMS
          console.warn('Maximum item quantity reached. Cannot add more of this product.')
        }
      } else {
        const newId = this._getNextId()
        if (quantity > MAX_COUNT_ITEMS) {
          quantity = MAX_COUNT_ITEMS
          console.warn('Maximum item quantity reached. Cannot add more of this product.')
        }
        this._items.push({id: newId, name, price, quantity})
      }
    } else {
      const existingItemByName = this._items.find(item => item.name === name)
      if (existingItemByName) {
        if (quantity > MAX_COUNT_ITEMS) {
          quantity = MAX_COUNT_ITEMS
          console.warn('Maximum item quantity reached. Cannot add more of this product.')
        }
        this._items.push({id, name, price, quantity})
      } else {
        if (quantity > MAX_COUNT_ITEMS) {
          quantity = MAX_COUNT_ITEMS
          console.warn('Maximum item quantity reached. Cannot add more of this product.')
        }
        this._items.push({id, name, price, quantity})
      }
    }
  }

  private _getNextId(): number {
    const ids = this._items.map(item => item.id)
    let newId = Math.max(0, ...ids) + 1
    while (ids.includes(newId)) {
      newId += 1
    }
    return newId
  }

  removeItem(id: number): void {
    this._items = this._items.filter(item => item.id !== id)
  }

  getTotalPrice(): number {
    return this._items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  updateQuantity(id: number, newQuantity: number): void {
    const itemIndex = this._items.findIndex(item => item.id === id)
    if (itemIndex !== -1) {
      this._items[itemIndex].quantity = newQuantity
    }
  }

  clearCart(): void {
    this._items = []
  }
}