//import mongoose
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import bcrypt from 'bcrypt'

//prepare mongoose user schema
let userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true // required
    },
    lastName: {
      type: String,
      required: true // required
    },
    password: {
      type: String,
      required: true // required
    },
    email: {
      type: String,
      required: true, // required
      unique: true, // unique email
      trim: true
    },
    username: {
      type: String,
      unique: true, // unique username
      required: true, // required
      trim: true
    },
    birthday: String,
    job: String,
  },
  {
    collection: 'User'
  })

// pre saving user
userSchema.pre('save', function (next) {

  // arrow function not work with pre :/
  let user = this

  // only hash the password if it has been modified (or is new)
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (error, salt) {
      // handle error
      if (error) return next(error)

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function (error, hash) {
        // handle error
        if (error) return next(error)

        // override the cleartext password with the hashed one
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

// post saving user
userSchema.post('save', function (user, next) {
  // arrow function not work with post :/
  next()
})

// compare password
userSchema.methods.comparePassword = function (passw, cb) {
  // arrow function not work with compare :/ 
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

// pass passport-local-mongoose plugin 
// in order to handle password hashing
userSchema.plugin(passportLocalMongoose)

//export mongoose user schema module 
let UserModel = mongoose.model('User', userSchema)
export default UserModel