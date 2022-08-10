const ApiError = require('../error/ApiError')

module.exports = function (err, req, res) {
  if(err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message
    })
  }
  return res.status(200).json({message: 'Непредвиденная ошибка!'})
}
