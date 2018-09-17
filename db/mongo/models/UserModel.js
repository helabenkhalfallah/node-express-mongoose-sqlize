//import mongoose
import mongoose from 'mongoose'

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

//export mongoose user schema module 
let UserModel = mongoose.model('User', userSchema)
export default UserModel