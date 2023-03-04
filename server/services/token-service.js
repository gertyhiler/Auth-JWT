const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

    return {accessToken, refreshToken}
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId});
    if(tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken});
    return token;
  }

  async removeToken(refreshToken) {
    const token = tokenModel.deleteOne({refreshToken});
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const token = tokenModel.findOne({refreshToken});
    return token;
  }

}

module.exports = new TokenService();