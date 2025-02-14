const mongoose = require('mongoose');

const Multifamily = new mongoose.Schema({
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
  townstate: {
    type: String,
},
description: {
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
{ collection: 'multifamily'}
)

const model = mongoose.model('multiFamily', Multifamily)

module.exports = model