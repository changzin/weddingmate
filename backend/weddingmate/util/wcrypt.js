const bcrypt = require('bcrypt');

exports.encrypt = (data)=>{
    return bcrypt.hashSync(data, 10);
}

exports.equals = (data, encryptedData) => {
    return bcrypt.compareSync(data, encryptedData);
}