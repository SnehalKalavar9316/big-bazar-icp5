import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    name:String,
    price:Number,
    dis:String
});

const Product = model('Product', productSchema);


export default Product;