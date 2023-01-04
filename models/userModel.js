const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email"
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "password must be minimum 6 characters"],
    // maxlength: [23, "password must be maximum 23 characters"]
  },
  photo: {
    type: String,
    required: [true, "Please add a photo"],
    default: "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
  },
  phone: {
    type: String,
    default: "+91"
  },
  bio: {
    type: String,
    maxlength: [250, "Bio most not be more than 250 characters"],
    default: "bio"
  }
}, {
    timestamps: true,
});


// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
      return next();
  }


  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
