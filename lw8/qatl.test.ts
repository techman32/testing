import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {Qatl, Product} from './Qatl'
import {products} from './cases/products.json'

const API_URL = 'http://shop.qatl.ru/api'

describe('Qatl class', () => {
  let qatl: Qatl
  let mock: MockAdapter

  beforeEach(() => {
    qatl = new Qatl()
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  // 1. Тест для addProduct с успешным ответом
  test('addProduct should return status from API response', async () => {
    const product = products[0]
    mock.onPost(`${API_URL}/addproduct`).reply(200, {status: 'success'})

    const status = await qatl.addProduct({product})
    expect(status).toBe('success')
  })

  // 2. Тест для addProduct с ошибкой от API
  test('addProduct should throw error on API failure', async () => {
    const product =  products[0]
    mock.onPost(`${API_URL}/addproduct`).reply(500)

    await expect(qatl.addProduct({product})).rejects.toThrow()
  })

  // 3. Тест для deleteProduct с успешным ответом
  test('deleteProduct should return status from API response', async () => {
    const productId = 1
    mock.onGet(`${API_URL}/deleteproduct?id=${productId}`).reply(200, {status: 'deleted'})

    const status = await qatl.deleteProduct(productId)
    expect(status).toBe('deleted')
  })

  // 4. Тест для deleteProduct с ошибкой от API
  test('deleteProduct should throw error on API failure', async () => {
    const productId = 1
    mock.onGet(`${API_URL}/deleteproduct?id=${productId}`).reply(500)

    await expect(qatl.deleteProduct(productId)).rejects.toThrow()
  })

  // 5. Тест для editProduct с успешным ответом
  test('editProduct should return status from API response', async () => {
    const product =  products[0]
    const productId = 1
    mock.onPost(`${API_URL}/editproduct`).reply(200, {status: 'updated'})

    const status = await qatl.editProduct({product, id: productId})
    expect(status).toBe('updated')
  })

  // 6. Тест для editProduct с ошибкой от API
  test('editProduct should throw error on API failure', async () => {
    const product =  products[0]
    const productId = 1
    mock.onPost(`${API_URL}/editproduct`).reply(500)

    await expect(qatl.editProduct({product, id: productId})).rejects.toThrow()
  })

  // 7. Тест для getAllProducts с успешным ответом
  test('getAllProducts should return an array of products', async () => {
    const allNewProducts = [
      products[0],
      products[1]
    ]
    mock.onGet(`${API_URL}/products`).reply(200, allNewProducts)

    const result = await qatl.getAllProducts()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual(allNewProducts)
    result.forEach((product: Product) => {
      expect(product).toHaveProperty('category_id')
      expect(product).toHaveProperty('title')
      expect(product).toHaveProperty('content')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('old_price')
      expect(product).toHaveProperty('status')
      expect(product).toHaveProperty('keywords')
      expect(product).toHaveProperty('description')
      expect(product).toHaveProperty('hit')
    })
  })

  // 8. Тест для getAllProducts с пустым массивом
  test('getAllProducts should return an empty array if no products are found', async () => {
    mock.onGet(`${API_URL}/products`).reply(200, [])

    const result = await qatl.getAllProducts()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toEqual([])
  })

  // 9. Тест для getAllProducts с ошибкой от API
  test('getAllProducts should handle errors and throw an exception', async () => {
    mock.onGet(`${API_URL}/products`).reply(500)

    await expect(qatl.getAllProducts()).rejects.toThrow()
  })

  // 10. Тест для getAllProducts с частично корректными данными
  test('getAllProducts should handle partially valid data', async () => {
    const partialData = [
      products[0],
      {}
    ]
    mock.onGet(`${API_URL}/products`).reply(200, partialData)

    const result = await qatl.getAllProducts()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
    expect(result[0]).toHaveProperty('category_id')
    expect(result[1]).not.toHaveProperty('category_id')
  })
})