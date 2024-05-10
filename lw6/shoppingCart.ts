export class ShoppingCart {
  private _items: { id: number, name: string, price: number, quantity: number }[]

  constructor() {
    this._items = []
  }

  get items(): { id: number, name: string, price: number, quantity: number }[] {
    return this._items
  }

  addItem(id: number, name: string, price: number, quantity: number): void {
    const existingItem = this._items.find(item => item.id === id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this._items.push({id, name, price, quantity})
    }
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