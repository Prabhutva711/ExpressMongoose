const Product=require("./models/product");
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/farms', {useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log(err);
})
// const p=new Product({
    // name:"Grapefruit",
    // price:1.99,
    // category:"fruit"
// })
// 
const seedProducts=[{
    name:"Paneer",
    price:240,
    category:"dairy"
},{
    name:"Dahi",
    price:180,
    category:"dairy"
},{
    name:"Tamatar",
    price:120,
    category:"vegetable"
},{
    name:"Kafal",
    price:300,
    category:"fruit"
}]

Product.insertMany(seedProducts).
then((docs)=>{
    console.log(docs);
})
.catch(()=>{
    console.log("seeding failed!!!");
}
)