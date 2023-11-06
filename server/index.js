import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Product from './Models/Product.js';


const app = express();
app.use(express.json());



const connectMongoDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI);  

    if(connection){
        console.log("connected to MongoDB");
    }
}
connectMongoDB();


app.post('/product',async (req,res) => {

    const {name, price, dis}= req.body;

   const product = new Product({
    name:name,
    price:price,
    dis:dis
   });

   const savedProduct = await product.save();




    res.json({
        successes:true,
        data:savedProduct,
        d:"product retrived successesfully"
    })
})


app.get('/products', async (req, res) => {
    const products = await Product.find();


    res.json({
        successes:true,
        data:products,
        dis:"product retrived successesfully"
    })

})


app.get('/product/:id ', async (req, res) =>{
    const {id} = req.params ;

    const product = await Product.findOne({_id: id});
    res.json({
        successes:true,
        data:product,
        dis:"product retrived successesfully"
    })
})

app.delete('/product/:id', async (req, res) =>{
    const {id} = req.params ;
const product = await Product.deleteOne({_id: id});
res.json({
    successes:true,
    data:product,
    dis:"product deleted successesfully"
})

})

app.put('/product/:id',async (req,res)=>{
    const {id}= req.params;
    const {name, price, dis}= req.body;


    await Product.updateOne({_id: id},{$set: {
            name:name,
            price:price,
            dis:dis
    
}});

    const updatedPrduct = await Product.findOne({_id: id});
    res.json({
        successes:true,
        data:updatedPrduct,
        dis:"product updated successesfully"
        
    })
})


//pass the details in body type 1 only use post,put api
app.post('/test', async (req,res)=>{
    console.log(req.body);

    res.json({
        successes:true
    })

})

//path params pass the id only for use get,delete,put api
app.post('/test/:testno', async (req,res)=>{
    console.log(req.params);
    
    res.json({
        successes:true
    })
})

//Query params only used in get api uing ? mark the pass query {&} useing multiple query
app.get('/test', async (req,res)=>{
    console.log(req.query);
    
    res.json({
        successes:true
    })
})
const PORT = 5000;
app.listen(PORT,() => {
    console.log("server running on port ${PORT}");
})


