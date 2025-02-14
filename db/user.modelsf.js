const mongoose = require('mongoose'); // this is all right and does not need to be touched...

const Singlefamily = new mongoose.Schema({
  MLS: {
    type: Number,
    //required: true,
  },
  status: {
    type: String,
    //unique: true,
  },
  address: {
    type: String,
    //requried: true,
},
  description: {
    type: String,
},
townstate: {
    type: String,
    //required: true,
  },
  DOM: {
    type: Number,
    //unique: true,
  },
  listprice: {
    type: Number,
    //requried: true,
},
  saleprice: {
    type: Number,
},
differential: {
    type: Number,
    //required: true,
  },
  county: {
    type: String,
    //unique: true,
  },
  propertytype: {
    type: String,
    //requried: true,
},
  year: {
    type: Number,
},
  milminus: {
    type: String,
    //unique: true,
  },
  milplus: {
    type: String,
    //requried: true,
},
  saledate: {
    type: String,
}


},
{ collection: 'singlefamily2122'}
)

const model = mongoose.model('singlefamily2122', Singlefamily)

module.exports = model
