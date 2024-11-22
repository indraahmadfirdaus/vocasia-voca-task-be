require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8080,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    imgbbSecretKey: process.env.IMGBB_SECRET_KEY,
    imgbbBaseUrl:process.env.IMGBB_BASE_URL
};