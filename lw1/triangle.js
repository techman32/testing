if (process.argv.length !== 5) {
    console.log('Ошибка') // Формат запуска: node triangle.js a b c, где a, b, c - стороны треугольника
    process.exit(1)
}

const a = parseFloat(process.argv[2])
const b = parseFloat(process.argv[3])
const c = parseFloat(process.argv[4])

if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0 || a > Number.MAX_VALUE || b > Number.MAX_VALUE || c > Number.MAX_VALUE) {
    console.log('Ошибка') // Стороны треугольника должны быть положительными числами
    process.exit(1)
}

if (a + b <= c || a + c <= b || b + c <= a) {
    console.log('Не-треугольник')
} else if (a === b && b === c) {
    console.log('Равносторонний')
} else if (a === b || a === c || b === c) {
    console.log('Равнобедренный')
} else {
    console.log('Обычный')
}