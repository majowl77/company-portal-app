// function sayHello(name) {
//   const capName = capitalize(name)
//   console.log(`Hello ${capName}`)
// }

// function capitalize(str) {
//   const result = str.charAt(0).toUpperCase() + str.slice(1)
//   return result
// }
// sayHello('javascript')

// function sayHi(name) {
//   const capName = capitalizeMe(name)
//   setTimeout(function timeout() {
//     console.log(`Hello ${capName}`)
//   }, 5000)
// }

// function capitalizeMe(str) {
//   const result = str.charAt(0).toUpperCase() + str.slice(1)
//   return result
// }
// sayHello('Majedah matar')

// setTimeout(function timeout() {
//   console.log('bye')
// }, 0)
// console.log('hello')

// let stop = false
// setTimeout(function () {
//   stop = true
// }, 100)
// while (stop == true) {
//   console.log('hi owl')
// }

const http = require('http')
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.write('Home Page ')
    res.end()
  } else if (req.method === 'GET' && reg.url === '/about') {
    res.write('About Page')
    res.end()
  }
})

server.listen(8000, (error) => {
  console.log('Failed to listen server on port : 3000 ')
})
