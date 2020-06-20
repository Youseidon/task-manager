const totalBill = (total, tipPercent = .25) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8

const celsiusToFahrenheit = (temp) => (temp * 1.8) + 32

const add = (num1, num2) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num1 + num2)
        }, 2000);
    })
}
module.exports = {
    totalBill,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}