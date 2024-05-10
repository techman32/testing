const fs = require('fs')
const {spawnSync} = require('child_process')

const testCases = fs.readFileSync('test-cases.txt', 'utf8').trim().split('\n')
const results = testCases.map((testCase, index) => {
    const [a, b, c, expected] = testCase.split(' ')

    if (!expected || !isNaN(parseFloat(expected))) {
        return 'success'
    }

    const {stdout, stderr} = spawnSync('node', ['triangle.js', a, b, c])

    if (stderr.toString() !== '') {
        return 'error'
    }
    return stdout.toString().trim() === expected ? 'success' : 'error'
})

fs.writeFileSync('results.txt', results.join('\n'))
console.log('Проверка завершена. Результаты записаны в results.txt')