const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require("dotenv");
dotenv.config();
const initializeDatabase = require("./config/db");
const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const md5 = require("md5"); // Level 2 Hash method
const bcrypt = require("bcrypt");
const saltRounds = 10; //Level 3 slating + Hash
const sgMail = require('@sendgrid/mail');
const otpGenerator = require('otp-generator');
const multer = require('multer');


// storgae & file name setting
let storage = multer.diskStorage({
  destination:'public/backend/images/',
  filename: (req, file, cb)=>{
    // cb(null, Data.now(+file+originalname)),
    cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage
})



const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
});

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
});
/////////////////////////////////////////////////////////////////////////////////////

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: {
//     files: 5
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////////
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const houseSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  bhk: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  rent_amount: {
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
  A_Type: {
    type: String,
    required: true
  },
  F_Su: {
    type: String,
    required: true
  },
  T_Pu: {
    type: String,
    required: true
  },
  T_Fu: {
    type: String,
    required: true
  },
  bathrooms: {
    type: String,
    required: true
  }



  // pincode: String,
  // email: String,
  // city: String,
  // state: String,
  // address: String,
  // house_No: String,
  // landmark: String,
});

initializeDatabase();

const User = new mongoose.model("User", userSchema);
const House = new mongoose.model("House", houseSchema);
const Tenant = new mongoose.model("Tenant", tenantSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/Landlord_login", (req, res) => {
  res.render("Landlord_login");

  // res.render("filter");
  // app.get("/forget_pass",(request,render)=>{
  //   render.render("forget_pass");
  // });
});



app.get("/Landlord_house",(req, res)=>{
  res.render("Landlord_house");
});

// app.get("/Tenant", (req,res)=>{
//   // res.render("Tenant");
//   const profiles = House.find({}, (err, profiles) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     // Render the profile template with the profiles data
//     res.render("Tenant", { profiles });
//     // res.status(200).json({profiles});
//     // res.render("rand",{ profiles });
   
//   });

// });
app.get('/Tenant', async (req, res) => {
  try {
    const profiles = await House.find();
    res.render('Tenant', { profiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



app.get('/housefortenant/:id',async(req,res)=>{

  try {
    const profiles = await House.findById(req.params.id);
    if (!profiles) {
      return res.status(404).json({ error: 'House not found' });
    }
    res.render('housefortenant', { profiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
  
  // console.log(EventEmitter.target.href);
  // const {address} = req.query
  // const {address} = req.query.buttonValue;

  // const house = await House.findOne({ });

  // res.status(200).json({house});

  // const buttonValue = req.body.buttonValue;
  // console.log('Button value:', buttonValue);

//  res.render("housefortenant");
// });

// app.post("/housefortenant",async(req,res)=>{
//   const {address} = req.query;

//   const house = await House.findOne({ address });

//   res.status(200).json({house});
//  });


app.post("/Tenant", (req,res)=>{
  
});


// app.get("/Landlord_Profile",async(req,res)=>{
//   // const email = req.body.useremail;
//   // const email = req.query.email;
//   const {email} = req.query;

//   // // Verify that the email exists in both databases
//   // const user =  User.findOne({email});
//   const house = await House.findOne({ email });

//   // const user = await User.findOne({email: "house1july@gmail.com"});
//   res.status(200).json({house});

//   // if (!user || !house) {
//   // if (!user ) {
//   //   // If email does not exist in both databases, send an error response
//   //   return res.status(400).send('Invalid email.');
//   // }

//   //////////////////////////////////////////////////////////////////////////////////
 
//   //////////////////////////////////////////////////////////////////////////////////

  

//   // If profile is found, render the profile data to the profile page
//   // res.send(`
//   //   <h1>${profile.name}</h1>
//   //   <p>${profile.bio}</p>
//   // `);

//   // If email exists in both databases, render the profile page with the data from the profile database
//   // res.send(`
//   //   ml gya chutaya
//   // `);

  
//   // res.render("profile",{profile});
//   // res.render("randa",{user});
  
//   // console.log(house);
//   // res.render("Landlord_Profile",{house});
// });

  


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database by email
  const user = await User.findOne({ email });

  if (!user) {
    // If user is not found, send an error response
    return res.status(400).send('Invalid email or password.');
  }

  // If user is found, compare the password with the hashed password in the database
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    // If password is incorrect, send an error response
    return res.status(400).send('Invalid email or password.');
  }

  // If email and password are valid, send a success response
  // res.send('Login successful!');
  // res.redirect('Landlord_Profile?email=${email}');
  // res.redirect("Landlord_Profile");
  const house = await House.findOne({ email });
  // res.status(200).json({house});
  res.render("Landlord_profile",{house});

});

app.get("/tenantlogin",(req,res)=>{
  res.render("tenantlogin");
});

app.post("/loginT",async(req,res)=>{
  const { email, password } = req.body;

  // Find the user in the database by email
  const user = await Tenant.findOne({ email });

  if (!user) {
    // If user is not found, send an error response
    return res.status(400).send('Invalid email.');
  }

  // If user is found, compare the password with the hashed password in the database
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    // If password is incorrect, send an error response
    return res.status(400).send('Invalid password.');
  }

  // If email and password are valid, send a success response
  // res.send('Login successful!');
  // res.redirect('Landlord_Profile?email=${email}');
  // res.redirect("Landlord_Profile");
  const house = await Tenant.findOne({ email });
  // res.status(200).json({house});
  res.render("tenant_profile",{house});
});

app.get("/tenant_profile", (req, res) => {
  res.render('tenant_profile');
});



// app.get("/forget_password", (req,res)=>{
//   res.render("forget_pass");
// });

app.get("/forget_password", (req, res) => {
  res.render('forget_pass');
});

// Route for sending OTP
app.post("/send_otp", async (req, res) => {
  try {
    // Check if email exists in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('Email not found');
    }

    // Generate OTP and store in session
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    req.session.otp = otp;
    req.session.email = req.body.email;

    // Send OTP to user's email using SendGrid API
    const msg = {
      to: req.body.email,
      from: 'noreply@myapp.com',
      subject: 'One Time Password',
      text: `Your OTP is ${otp}.`,
      html: `Your OTP is <strong>${otp}</strong>.`
    };
    await sgMail.send(msg);

    res.redirect("/verify_otp");
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

// Route for verifying OTP
app.post("/verify_otp", (req, res) => {
  const otp = req.body.otp;
  if (otp === req.session.otp && req.body.email === req.session.email) {
    res.redirect('/reset_password');
  } else {
    res.render('verify_otp', { message: 'Invalid OTP' });
  }
});

// Route for reset password page
// app.get("/reset_password", (req, res) => {
//   res.render('reset_password');
// });

app.get("/reset_password", (req, res) => {
  const email = req.session.email;
  res.render('reset_password', { email: email });
});

// Route for updating password
app.post("/update_password", async (req, res) => {
  try {
    // Update password in database
    const user = await User.findOne({ email: req.session.email });
    user.password = req.body.password;
    await user.save();

    // Clear session
    delete req.session.otp;
    delete req.session.email;

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});



app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      const newUser = new User({
        name: req.body.userfname,
        phone: req.body.userphone,
        email: req.body.useremail,
        password: hash,
      });

      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("Landlord_house");
        }
      });
    } else {
      res.send(err);
    }
  });
});

app.post("/registertenant", (req, res) => {
  bcrypt.hash(req.body.passwordT, saltRounds, (err, hash) => {
    if (!err) {
      const newUser = new Tenant({
        name: req.body.userfnameT,
        phone: req.body.userphoneT,
        email: req.body.useremailT,
        password: hash,
      });

      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("Tenantlogin");
        }
      });
    } else {
      res.send(err);
    }
  });
});

app.post("/house", upload.single('userphoto'), (req, res) => {
  const newUser = new House({

    name: req.body.username,
    email: req.body.useremail,
    phone_number: req.body.userphone,
    pincode: req.body.userpincode,
    bhk: req.body.userbhk,
    picture: req.file.filename,
    state: req.body.userstate,
    city: req.body.usercity,
    address: req.body.useraddress,
    description: req.body.userdes,
    rent_amount: req.body.useramount,
    size: req.body.usersize, 
    A_Type: req.body.userarea,
    F_Su: req.body.userfur,
    T_Pu: req.body.usertenant,
    T_Fu: req.body.userfloor,
    bathrooms: req.body.userbathroom

    // pincode: req.body.userpincode,
    // email: req.body.useremail,
    // city: req.body.usercity,
    // state: req.body.userstate,
    // address: req.body.useraddress,
    // house_No: req.body.userhouseno,
    // landmark: req.body.userlandmark
  });

  newUser.save((err) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.render("index");
    }
  });

  // const files = req.files;
  // const images = [];

  // for (const file of files) {
  //   images.push({
  //     filename: file.filename,
  //     url: '/uploads/' + file.filename
  //   });
  // }

  // res.send(images);
});

// app.post('/upload', upload.array('images', 5), (req, res) => {
//   const files = req.files;
//   const images = [];

//   for (const file of files) {
//     images.push({
//       filename: file.filename,
//       url: '/uploads/' + file.filename
//     });
//   }

//   res.send(images);
// });








app.get("/health", (req, res) => {
  res.send("Backend server is active status: Active & Time: " + new Date());
});
const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log("Express server listening at http://" + host + ":" + port);
});
