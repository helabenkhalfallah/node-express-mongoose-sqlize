// import mongoose
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';

const {
  Schema,
} = mongoose;

// prepare mongoose user schema
// eslint-disable-next-line new-cap
const userSchema = Schema(
    {
      firstName: {
        type: String,
        required: true, // required
      },
      lastName: {
        type: String,
        required: true, // required
      },
      password: {
        type: String,
        required: true, // required
      },
      email: {
        type: String,
        required: true, // required
        unique: true, // unique email
        trim: true,
      },
      username: {
        type: String,
        unique: true, // unique username
        required: true, // required
        trim: true,
      },
      birthday: String,
      job: String,
    },
    {
      collection: 'User',
    });

// pre saving user
userSchema.pre('save', function(next) {
  // eslint-disable-next-line no-invalid-this
  const user = this;

  // only hash the password if it has been modified (or is new)
  // eslint-disable-next-line no-invalid-this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(error, salt) {
      // handle error
      if (error) return next(error);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(error, hash) {
        // handle error
        if (error) return next(error);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// post saving user
userSchema.post('save', function(user, next) {
  next();
});

// compare password
userSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// pass passport-local-mongoose plugin
// in order to handle password hashing
userSchema.plugin(passportLocalMongoose);

// export mongoose user schema module
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
