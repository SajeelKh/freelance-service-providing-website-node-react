function leaf(err, req, res, next){
    res.json({
        message: err.message,
        status: err.status || 500,
    });
}

module.exports = {
    leaf,
}