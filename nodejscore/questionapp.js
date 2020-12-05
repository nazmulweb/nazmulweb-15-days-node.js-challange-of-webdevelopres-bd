const { exit } = require("process")
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

// const questions = ['what is your name?', 'how old are you?']
// const answare = []

// process.stdout.write(questions[0])

// process.stdin.on('data', (data) => {
//     answare.push(data.toString())
//     if (answare.length < questions.length) {
//         console.log(answare.length)
//         process.stdout.write(questions[answare.length])
//     } else {
//         process.exit()
//     }
// })

// process.on('exit', (exit) => {
//     for (let i = 0; i < answare.length; i++) {
//         process.stdout.write(answare[i])
//     }
// })


const questions = ['what is your name?', 'how old are you?']
const answare = []

rl.question(questions[0], data => {
    answare.push(data)
    if (answare.length < questions.length) {
        rl.setPrompt(questions[answare.length])
        rl.prompt()
        rl.on('line', (data) => {
            if (data.trim().toLowerCase() === 'exit') {
                rl.close();
                return
            }
            rl.setPrompt("What else?(wire exit to leave)")
            rl.prompt();
            answare.push(data)
        })
    }
})