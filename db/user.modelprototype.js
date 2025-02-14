const mongoose = require('mongoose'); // this is all right and does not need to be touched...

const PrototypeJSCB = new mongoose.Schema({
  WebsiteLink:{
    type: String,
  },
    beds: {
    type: Number,
    //required: true,
  },
   baths: {
    type: Number,
    //unique: true,
  },
  livingArea: {
    type: Number,
    //requried: true,
},
  propertytype2: {
    type: String,
},
yearbuilt: {
    type: Number,
    //required: true,
  },
  heating: {
    type: String,
    //unique: true,
  },
  status: {
    type: String,
    //requried: true,
},
  architecture: {
    type: String,
},
town: {
    type: String,
    //required: true,
  },

  county: {
    type: String,
    //unique: true,
  },
  url: {
    type: String,
    //requried: true,
},
  yearBuilt: {
    type: Number,
},
  saledate: {
    type: String,
    //unique: true,
  },
  saleprice: {
    type: Number,
    //requried: true,
},
  saledate2: {
    type: String,
},
saleprice2: {
    type: Number,
},
 listdate3: {
    type: String,
},
listprice: {
    type: Number,
},
DOM: {
    type: Number,
},
differential: {
    type: Number,
},
address: {
    type: String,
},
townstate: {
    type: String,
},
zipcode: {
    type: String,
},
year: {
    type: Number,
},
month:{
    type: Number,
},
yearmonth: {
    type: Number,
},
state: {
    type: String,
},
photosMAIN: {
    type: Array,
},
photos: {
    type: Array,
},
latitude: {
    type: Number,
},
longitude: {
    type: Number
}

},
{ collection: 'prototypeJSCB'}
)

const model = mongoose.model('prototypeJSCB', PrototypeJSCB)

module.exports = model
