import axios from 'axios'

export type Product = {
  category_id: number,
  title: string,
  content: string,
  price: number,
  old_price: number,
  status: number,
  keywords: string,
  description: string,
  hit: number
}

export class Qatl {
  private apiUrl = 'http://shop.qatl.ru/api'

  async addProduct({product}: { product: Product }) {
    const response = await axios.post(`${this.apiUrl}/addproduct`, product)
    return response.data.status
  }

  async deleteProduct(id: number) {
    const response = await axios.get(`${this.apiUrl}/deleteproduct?id=${id}`)
    return response.data.status
  }

  async editProduct({product, id}: { product: Product, id: number }) {
    const updatedProduct = {
      id: id,
      ...product
    }
    const response = await axios.post(`${this.apiUrl}/editproduct`, updatedProduct)
    return response.data.status
  }

  async getAllProducts() {
    const response = await axios.get(`${this.apiUrl}/products`)
    return response.data
  }
}