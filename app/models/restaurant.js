'use strict';

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  // TODO come back and determine if min/max length required for notes TODO //
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  achieved: {
    type: Boolean,
    required: true,
    default: false,
  },
  location: {
    type: String,
    required:true,
  },
  type: {
    type: String,
    required: true,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});

// restaurantSchema.virtual('length').get(function length() {
//   return this.text.length;
// });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
