import axios from 'axios'
import nock = require('nock')

async function getCurrencyRate(currency: string): Promise<number> {
  try {
    const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${currency}`)
    return response.data.rates[currency]
  } catch (error) {
    console.error('Error fetching currency rate:', error)
    throw error
  }
}

(async () => {
  nock('https://api.exchangeratesapi.io')
  .get('/latest')
  .query({base: 'USD', symbols: 'RUB'})
  .reply(200, {
    rates: {
      EUR: 0.9,
      RUB: 92.2
    },
    base: 'USD',
    date: '2024-05-10',
  })

  const rateRUB = await getCurrencyRate('RUB')
  console.log('Mocked RUB rate:', rateRUB)
})()