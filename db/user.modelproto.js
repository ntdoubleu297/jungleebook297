const mongoose = require('mongoose'); // this is all right and does not need to be touched...

const PrototypeJS = new mongoose.Schema({
  address: {
    type: String,
    //required: true,
  },
  city: {
    type: String,
    //unique: true,
  },
  state: {
    type: String,
    //requried: true,
},
  zipcode: {
    type: String,
},
townstate: {
    type: String,
    //required: true,
  },
  county: {
    type: String,
    //unique: true,
  },
  bedrooms: {
    type: Number,
    //requried: true,
},
  bathrooms: {
    type: Number,
},
listprice: {
    type: Number,
    //required: true,
  },
  saleprice: {
    type: Number,
    //unique: true,
  },
  differential: {
    type: Number,
    //requried: true,
},
  yearBuilt: {
    type: Number,
},
  latitude: {
    type: Number,
    //unique: true,
  },
  longitude: {
    type: Number,
    //requried: true,
},
  status: {
    type: String,
},
description: {
    type: String,
},
livingArea: {
    type: Number,
},
saledate: {
    type: String,
},
year: {
    type: Number,
},
propertytype: {
    type: String,
},
DOM: {
    type: Number,
},
url: {
    type: String,
},
photosMAIN: {
    type: Array,
},
photos: {
    type: Array,
}



},
{ collection: 'prototypeJS'}
)

const model = mongoose.model('prortotypeJS', PrototypeJS)

module.exports = model
