const mongoose = require('mongoose');

module.exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/notes-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('bd connection succefully')
    } catch (e) {
        console.log(e)
    }
}
