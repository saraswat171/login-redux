// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require('cors')
// const UsersModel = require('./models/UserSchema')

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// var cookieParser = require('cookie-parser');




// const app = express()
// app.use(cookieParser());
// app.use(express.text())
// app.use(express.urlencoded({extended: true})); 
// app.use(express.json()); 
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods:  ['POST','GET'],
//     credentials: true
// }));



// const url = "mongodb+srv://chetan1150:chetan@cluster0.8wdydyg.mongodb.net/?retryWrites=true&w=majority";

// try {
//     mongoose.connect(url);
//     console.log("connected to mongodb")
// }
// catch (error) {
//     console.error(error);j
// }

// const authenticateJWT = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//     if (!token) {
//         res.locals.isAuthenticated = false;
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, 'jwt-key', (err, user) => {
//         if (err) {
//             res.locals.isAuthenticated = false;
//             return res.sendStatus(403);
//         }
//         req.user = user;
//         res.locals.isAuthenticated = true; 
//         next();
//     });
// };




// app.post('/usersinfo', async (req, res) => {
//     console.log("chetan")
//     const { name, email, password } = req.body;
//     // console.log(req.body.role)
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         const existingUser = await UsersModel.findOne({ email })

//         console.log(existingUser)
//         if (existingUser) {
//             return res.status(400).json("Email already exist");
//         }
//         const newuser = await UsersModel.create({ name, email, password: hashedPassword });
//         console.log('newuser', newuser)
//         res.status(200).json(newuser)
//     }


//     catch (err) { res.status(500).json(err) }
  
// })

// app.post('/logout',authenticateJWT, (req, res) => {
//     console.log(res.locals.isAuthenticated)
//     if (res.locals.isAuthenticated) {
//         res.clearCookie('token');
//         res.json({ success: true, message: 'Logout successful' });
//     } else {
//         res.json({ success: false, message: 'Not logged in' });
//     }
// });

// app.post('/logininfo', async (req, res) => {
    
//     console.log('req body', req.body)

//     try {
//         const { email, password } = req.body;
//         const user = await UsersModel.findOne({ email });

//         if (user && bcrypt.compareSync(password, user.password)) {
            
//             const token = jwt.sign({ ID: user._id }, 'jwt-key');
            
//             // res.cookie('token', token);
//             res.json({ success: true, user , token});
//         } else {
//             res.status(404).json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });



// app.get('/userData', authenticateJWT, async (req, res) => {
//     try {
//       if (res.locals.isAuthenticated) {
//         const userId = req.user.ID;
     
//         const user = await UsersModel.findById(userId);
  
//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }
//        else {
//         res.json({ success: true, user });
//        }
     
//       } else {
//         res.status(401).json({ error: 'Unauthorized' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

  




// app.listen(8080, () => {
//     console.log('server at port 8080')
// })


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods:  ['POST','GET'],
  credentials: true
}));

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
