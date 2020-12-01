const express = require('express');
const bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.use('/add-form',(req,res,next)=>{
    res.sendFile(__dirname+'/'+'views'+'/'+'add-form.html')
})

app.use('/save-form',(req,res,next)=>{
    console.log('save .. ');
    console.log(req.body);
    res.send('save Successfully');
})

app.listen(3000);