const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const saltRounds = 10;
userSchema.pre('save', function (next) {
    let user = this;
    // 비밀번호가 변경될 때만
    if (user.isModified('password')) {
        // salt를 생성합니다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = (plainPassword, cb) => {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
})
}

const User = mongoose.model('User', userSchema);



module.exports = User;
