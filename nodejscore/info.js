const os = require('os');
const path = require('path')
const process = require('process')

// console.log(os.freemem())
// console.log(os.homedir())
// console.log(os.platform())
// console.log(os.hostname())
// console.log(os.networkInterfaces())
// console.log(os.userInfo().username)

// console.log(path.basename(__dirname))
// console.log(path.basename(__filename))
// console.log(path.join(__dirname, 'path', 'test.js'))
// console.log(path.normalize('////path'))

// console.log(process.argv)

// function graveValue(key) {
//     const index = process.argv.indexOf(key)
//     return index !== -1 ? process.argv[index + 1] : null
// }

// const firstName = graveValue('--firstName')
// const lastName = graveValue('--lastName')

// if (!firstName || !lastName) {
//     console.log('please provide nessary information')
// } else {
//     console.log(`My name is ${firstName} ${lastName}`)
// }

// process.stdout.write('hello \n')
// process.stdout.write('world \n')
// process.stdin.on('data', (data) => {
//     if (data.toString().trim().toLowerCase() === "exit") {
//         process.exit()
//     } else {
//         console.log(data.toString())
//     }
// })

// process.on('exit', () => {
//     console.log('you are exit')
// })

const questions = ['what is your name?', 'how old are you?']

process.stdout.write(questions[0])