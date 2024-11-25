const ResponseAPI = require("../utils/response");


const authorizeRoles = (allowedRoles) => {
    console.log(allowedRoles);

    return (req, res, next) => {
        let authorized = false

        for (const roles of allowedRoles) {
            
            if(req.user.role === roles) {
                authorized = true
            }
        }

        if(authorized) {
            next()
            return
        }

        return ResponseAPI.forbidden(res, 'This role is not allowed to access this endpoint.')
    }
};

module.exports = authorizeRoles