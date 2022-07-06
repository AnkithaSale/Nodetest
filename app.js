const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const authRoute=require('./routes/auth-route')
const app=express();
const port=8082;
mongoose.connect('mongodb://localhost:27017/studentdata',(err)=>{
    if(err){
        console.log('not connected to db');
    }
    else{
        console.log('connected to db');
    }
})
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/auth',authRoute)
app.get('/',(req,res)=>{
    res.send("hlo");
})

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:4200');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.listen(port,()=>{
    console.log("server is connected :",port);
})