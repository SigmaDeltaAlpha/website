let mongoose    = require('mongoose')
let bcrypt      = require('bcrypt-nodejs')

let userSchema = mongoose.Schema({
    email       : { type : String },
    password    : { type : String },
    photoURL    : { type : String },
    isAdmin     : { type : Boolean}
})

// generate the password hash
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = {
    Schema : userSchema,
    Model  : mongoose.model('User', userSchema)
}
