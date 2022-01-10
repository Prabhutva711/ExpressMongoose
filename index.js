const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Product=require("./models/product");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const arr=["vegetable","dairy","fruit"];
mongoose.connect('mongodb://localhost:27017/farms', {useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log(err);
})
const path=require("path");
app.use(express.urlencoded({extended: true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.listen(3000,()=>{
    console.log("Listening");

})
app.post("/products/filtered",async (req,res)=>{
    const {category}=req.body;
    const products=await Product.find({});
    res.render("products/filtered",{products,category});

  
})


app.delete("/products/delete/:id",(req,res)=>{
    const {id}=req.params;
    Product.findByIdAndDelete(id).
    then(()=>{
        res.redirect("/products");
    })
    .catch(()=>
    {
        res.render("error");
    }
    )


})
app.get("/products",async (req,res)=>{
    const products=await Product.find({});
    res.render("products/index",{products,arr});
})
app.post("/products",(req,res)=>{
    const newProduct=new Product(req.body);
    newProduct.save().
    then(()=>{
        res.redirect("/products");
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/products/edit/:id",(req,res)=>{
    const {id}=req.params;
    const newProduct=new Product(req.body);
    console.log(newProduct);
    
    Product.findByIdAndUpdate(id,{name:newProduct.name,category:newProduct.category,price:newProduct.price}).
    then(()=>{
        res.redirect("/products");
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get("/products/new",(req,res)=>{
    res.render("products/new");

})
app.get("/products/edit/:id",async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id)
    res.render("products/edit",{product,arr});
    
})

app.get("/products/:id",async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
    const product=await Product.findById(id);
    res.render("products/show",{product});
    }
    catch{
        res.render("error");
    }
})






