const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DBCONECTION);
        console.log('DB ONLINE')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar a la base de datos');
    }
}

module.exports = {
    dbConnection
};