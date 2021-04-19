const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null) return res.sendStatus(401)

  //we know we have a valid token, so we need to verify
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    const requestAccount = req.params.account_id || req.body.account
    if(err) return res.status(404).json({
            error: { message: `the token is invalid` }
          })
    if(requestAccount != user.user.id){
      return res.status(404).json({
        error: { message: `you don't not have access` }
      })
    }
    
      req.user = user
      next()
  })
}