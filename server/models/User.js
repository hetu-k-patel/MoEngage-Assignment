const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema(
   {
      first_name: {
         type: String,
         required: [true, "can't be blank"],
      },
      last_name: {
         type: String,
         required: [true, "can't be blank"],
      },
      user_name: {
         type: String,
         lowercase: true,
         unique: true,
         required: [true, "can't be blank"],
         index: true,
      },
      password: {
         type: String,
         required: true,
         trim: true,
      },
   },
   {
      collection: 'User',
   }
);

module.exports = mongoose.model('User', UserSchema);
