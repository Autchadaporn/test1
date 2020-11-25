const express = require('express')
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb://localhost:27017/test-mongoogse', options)

const CatModel = mongoose.model(
    'cat',
    new mongoose.Schema(
        { name: String, age: Number },
        {versionKey:false,timestamps:true}
        )
);

// const kitty = new CatModel({ name: 'Kitty' });
// kitty.save().then(() => console.log('meow'));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ massage: 'ok' })
})

// Query
app.get('/cats', (req, res) => {
    CatModel.find({})
    .then((cats) => res.json(cats))
    .catch(error => res.status(400).json({ massage: 'something want wrong' }))
});
app.get('/cats/:id', (req, res) => {
    const {id} = req.params;
    CatModel.findById(id)
    .then(data => res.json(data||{}))
    .catch(error => res.status(400).json(error))
}); //ดึงข้อมูลจาก id 

// Create
app.post('/cats',async (req,res)=>{
    const {name, age } = req.body;
    const cat = new CatModel({
        name,
        age
    });
    await cat.save();
    res.json({ massage: 'save!'})
});

// Update
app.put('/cats/:id',async(req,res)=>{
    const { id }=req.params;
    const {name, age }=req.body;

    const updated ={
        $set: {
            name,
            age
        }
    };
    const Cat = await CatModel.findByIdAndUpdate(id,updated,{new:true});
    res.json(cat);
});

// Delete 
app.delete('/cats/:id',async (req,res)=>{
    const { id } =req.params;

    await CatModel.findByIdAndDelete(id,{});
    res.json({massage:`${id} already removed`});
})

app.listen(9999, () => console.log('ok'));
