const express = require("express");
const macAddressRoutes = require('./routes/macAddressRoutes');
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const usermodel=require('./models/usermodel')
const macmodel=require('./models/macmodel')

//config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

const corsOptions = {
  origin: '*'
};

//middlewares
app.use(cors(corsOptions))
app.use(morgan("dev"));
app.use(express.json());
app.use('/api', macAddressRoutes);

app.post('/adduser',(req,res)=>{
  usermodel.create(req.body)
  .then(User=>res.json(User))
  .catch(err => res.json(err))
})

app.post("/login",(req,res)=>{
  const {username,password}=req.body;
  usermodel.findOne({username:username})
  .then(user=>{
      if(user){
          if(user.password===password){
              res.json("Success")
          }
          else{
              res.json("Password is incorrect")
          }
      }
      else{
          res.json("No record exist")
      }
  })
})

app.post('/add-machine-info',(req,res)=>{
  macmodel.create(req.body)
  .then(User=>res.json(User))
  .catch(err => res.json(err))
})

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
