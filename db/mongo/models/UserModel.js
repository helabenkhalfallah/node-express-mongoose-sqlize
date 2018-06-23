//import mongoose
import mongoose from 'mongoose'

//prepare mongoose user schema
let userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    birthday: String,
    job: String,
  },
  {
    collection: 'User'
  })


//export mongoose user schema module 
let UserModel = mongoose.model('User', userSchema)
export default UserModel