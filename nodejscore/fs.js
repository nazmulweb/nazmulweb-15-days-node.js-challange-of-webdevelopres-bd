const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'hello.txt')
const newPathFile = path.join(__dirname, 'hello2.txt')

// create file 
if (fs.existsSync(pathFile)) {
    fs.writeFile(pathFile, 'hello world', () => {
        fs.appendFile(pathFile, ' new word input into hello.txt file. another data inserted', () => {
            console.log('new word added')
        })
        console.log('Data is inserted')
    })
} else {
    fs.writeFile(pathFile, 'hello world', () => {
        console.log('file inserted')
    })
}

// delete file 
if (fs.existsSync(pathFile)) {
    fs.unlink(pathFile, function () {
        console.log('file is deleted succefully')
    })
} else {
    console.log('file is already deleted')
}

// rename file 
if (fs.existsSync(pathFile)) {
    fs.rename(pathFile, newPathFile, () => {
        console.log('file has been renamed')
    })
} else {
    console.log('file not found in this directory')
}