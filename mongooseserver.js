var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
//import cookieParser from 'cookie-parser';


const express = require('express');
const app = express();
const cors = require('cors');


require("dotenv").config();
//app.use(cookieParser());

//const connectDb = require('./db/database');
const port = process.env.PORT || 5000;
const User = require('./db/user.model');
const Singlefamily = require('./db/user.modelsf');
const Singlefamily2 = require('./db/user.sftwentytwo');
const PrototypeJS = require('./db/user.modelproto');
const { default: mongoose } = require('mongoose'); 
// configure express to use cors()
// ------------------------------------------------------------------

const bodyParser = require('body-parser');
const { nextTick } = require('process');
const { response } = require('express');
const { json } = require('body-parser');
app.use( bodyParser.json()); // to support JSON-encoded bodies 

app.use( bodyParser.urlencoded({ extended: true})); //to support URL-encoded bodies

app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}
));
app.use(express.json()); // meaning - we are going to move data around in the json format...

mongoose.connect('mongodb+srv://nw3377:Whi31560@cluster0.cppma.mongodb.net/nw3377?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const router = express.Router();

//const cookieParser = require('cookie-parser');


//app.use(cookieParser());

 const cookieParser = require('cookie-parser');
 app.use(cookieParser());

app.set('trust proxy', 1); // Enable trust proxy for secure cookies in production...

// router.get('/', (req,res) => {
  //res.status(200).json({message: 'Get Goals' })
//})

//app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
 // next();
 // });




// Import the routes
//const userRoutes = require("./db/routeruser")

// Using routes
//app.use('/api', userRoutes) 








app.get('/users', async (req, res) => { //this is right 
  User.find({}, function (err, users){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(users);

  }); 

});

app.get('/singlefamilys', async (req, res) => { //this is right, year 2021/2022
  Singlefamily.find({}, function (err, singlefamilys){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(singlefamilys);

  }); 

});


app.get('/prototypeJS', async (req, res) => { //this is right, year 2021/2022
  PrototypeJS.find({}, function (err, prototypeJS){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(prototypeJS);

  }); 

});


app.get('/singlefamily2s', async (req, res) => { //this is right, year 2022
  Singlefamily2.find({}, function (err, singlefamily2){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(singlefamily2);
 // res.send(singlefamily2);

  }); 

});








///////////////////////////////////////////////////////////////////////////////////////////////



app.post('/api/register', async (req, res) => {
console.log(req.body)
try{
  
const newPassword = await bcrypt.hash(req.body.password, 10)
const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
})

 //const hash = await bcrypt.hash(password, 13); 
// user.push({name, email, password: hash})
 res.json({ status: 'ok'})
}

catch (err){
  console.log(err)
  res.json({status: 'error', error: 'Dupliucate Email'})
}

});







app.post('/api/forgotpassword', async (req, res) => {
  
  //const isPasswordMatch = await bcrypt.compare(providedPassword, storedHash);

const email = req.body;

try{

  const user = await User.findOne({email: req.body.email})
  if (!user){

    return res.json({message: 'user not registered.'})
  }

  const token = jwt.sign({id: user._id}, process.env.KEY, { expiresIn: '5m' });
  

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'westent297@@gmail.com',
      pass: 'ibqf aygd nalm wrlf'
    }
  });
 // const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
  var mailOptions = {
    from: 'westent297@gmail.com',
    to: user.email,//'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js', 
    text: `http://localhost:3000/resetPassword/${token}`  //'That was easy!' declare in our App.js file new component <Route path="/ForgotPassword" element={<ForgotPassword />} />  <Route path="/ResetPassword/:token" element={<ResetPassword />} />
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.json({message: 'error sending email'});
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({status: true, message: 'email sent'});
    }
  });
  


}
  
  
catch(err){
console.log(err);


}
  });



app.post('/api/resetpassword/:token', async (req, res) => {
  
  const {token} = req.params;
  const {password} = req.body
try{

 const decoded = await jwt.verify(token, process.env.KEY)
 const id = decoded.id
 const hashPassword = await bcrypt.hash(password, 10);

 await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
 return res.json({status: true, message: 'updated password'})

} catch(err) { 

return res.json('invalid token');
console.log(err);

}



});




//////////////////////////////////////////////////////////////////////////////
app.post('//login/', async (req, res) => {
  
  //const isPasswordMatch = await bcrypt.compare(providedPassword, storedHash);
  
  const user = await User.findOne({
          email: req.body.email,
        //  password: req.body.password,  //bcrypt
  }).then(function (user) {
    if (!user || !user.password) {
   // res.redirect('/login');
      return res.json({message: 'user not registered.'})
    
    } else {

      bcrypt.compare(req.body.password, user.password, function (err, result){

        if (result === true){
          console.log('hello')
         // res.redirect('/singlefamily');
         return res.json({ status: 'ok', user: true })
        } else{
          console.log('Incorrect Password')
         // res.redirect('/login');
        }
        const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '1hr'});
        res.cookie('token', token, { httpOnly: true, maxAge: 36000000}) 
        return res.json({status: true, message: 'login successfully'})
      })
    }

  }) 
});


////////////////////////////////////////////////////////////////////////////////////////////////




const verifyUser = async (req, res, next) => {
 try{
  const token = req.cookies.token;

  if(!token){
return res.json({status: 'false', message: 'no token'});
} 
const decoded = await jwt.verify(token, process.env.KEY);

next();

} catch(err) {

return res.json(err);

  }

}


app.get('/api/verify', verifyUser, (req, res) => {

  return res.json({status: true, message: 'authorized'});
  
  })



app.post('/api/login', async (req,res) => {

const {email, password} = req.body;
const user = await User.findOne({
  email
})

if(!user){

  return res.json({ message: 'user is not registered'})

}

const validPassword = await bcrypt.compare(req.body.password, user.password)
if(!validPassword){
  return res.json({message: 'password is incorrect'})
}

const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '1hr'}) 
res.cookie('token', token, {
  httpOnly: true,
  maxAge: 3600000,
  secure: true,
 // sameSite: none,
  domain: '.netlify.app'
})
return res.json({status: true, message: 'login successfully'})

})



 


  







app.post('/user/login', async (req, res) => { //this is right
    const user = await User.findOne({
        email: req.body.email
        //password: req.body.password
    })
    res.json(user);
    if (user){
        console.log('status ok') 
    }else{
        console.log('status error, no email available')
    }
})

app.post('/user/logout', async (req, res) => { //this is right
    const user = await User.findOne({
        email: req.body.email
        //password: req.body.password
    })
    res.json(user);
    if (user){
        console.log('status ok') 
    }else{
        console.log('status error, no email available')
    }
})



app.post('/user/balance', async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        //const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email;
    
    const user = await User.findOne(
        {email: email}
    )
    //return res.json({status = 'ok', balance: user.balance})
    } catch(error) {
    res.json({status: 'error', error: 'invalid token'})
}
})




app.get("/user/balance", async (req, res) => {
    try {
        let myquery = { email: req.params.email, balance: req.params.balance };
    const user = await User.updateOne(myquery, {$set: {balance: req.body.balance}}
        )
    return console.log('1 document updated'); // no matter what 
    res.json(result);
    //res.json(users);
    }catch(error){
        console.log('status error');
    }
  });





  






app.get('/users-delete', async (req, res) => {
  await User.deleteMany({}).then(() => console.log('Users deleted'));

  res.send('Users deleted \n');
});

app.get('/', (req, res) => {
  res.send('Hello from Node.js app');
});

// start server
// -----------------------
app.listen(process.env.PORT || 5000, function () {
 // app.listen(5001, function () {
  console.log('Running on port 5000!');
 // connectDb().then(() => console.log('MongoDb connected'));
});