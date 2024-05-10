import axios from 'axios'

const BASE_URL = 'http://shop.qatl.ru/'

describe('Product API Tests', () => {
  let productId: number

  afterAll(async () => {
    await axios.get(`${BASE_URL}/api/deleteproduct?id=${productId}`)
  })

  test('Add Product', async () => {
    const productData = {
      category_id: 1,
      title: 'Test Product',
      content: 'Test description',
      price: 100,
      old_price: 90,
      status: 1,
      keywords: 'test, product',
      description: 'Test product description',
      hit: 0
    }

    const response = await axios.post(`${BASE_URL}/api/addproduct`, productData)
    expect(response.status).toBe(200)
    productId = response.data.id
  })

  test('Edit Product', async () => {
    const updatedProductData = {
      id: productId,
      category_id: 2,
      title: 'Updated Test Product',
      content: 'Updated test description',
      price: 120,
      old_price: 110,
      status: 1,
      keywords: 'updated, test, product',
      description: 'Updated test product description',
      hit: 0
    }

    const response = await axios.post(`${BASE_URL}/api/editproduct`, updatedProductData)
    expect(response.status).toBe(200)
  })

  test('Delete Product', async () => {
    const response = await axios.get(`${BASE_URL}/api/deleteproduct?id=${productId}`)
    expect(response.status).toBe(200)
  })
})
