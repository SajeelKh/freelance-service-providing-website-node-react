const jwt = require('jsonwebtoken');

function jwtVerify(req, res, next){
    jwt.verify(res.token, config.secret, () => {
        
    })
}

module.exports = {
    jwtVerify,
}