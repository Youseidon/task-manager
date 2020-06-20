const { totalBill, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Calculate the tip', () => {
    const total = totalBill(10, .3);
    expect(total).toBe(13)
})

test('Should calculate with default tip', () => {
    const total = totalBill(10);
    expect(total).toBe(12.5)
})

test('Should Convert 32 F to 0 C', () => {
    const result = fahrenheitToCelsius(32);
    expect(result).toBe(0);
})

test('Should Convert 0 C to 32 F', () => {
    const result = celsiusToFahrenheit(0);
    expect(result).toBe(32)
})

// test('Axync Testing', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000);
// })

test('Testing add with promises', (done) => {
    add(10, 5).then((value) => {
        expect(value).toBe(15)
        done()
    })
})

test('Testind add using async awiat', async() => {
    const result = await add(7, 8);
    expect(result).toBe(15)
})