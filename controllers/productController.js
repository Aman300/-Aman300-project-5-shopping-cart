const productModel = require('../models/productModel')


let productSearch = async(req,res) =>{
    
    try{

        let productNames = req.body
        console.log(productNames)

        let productData = await productModel.find(productNames)

        console.log(productData)

        // productData.forEach((item) =>{
        //     console.log(item.productName)   
        // })

       
        //res.status(200).send({status: true, message: productData})

        res.render('index',{allProdect: productData})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}




let createProduct = async(req,res) =>{
    
    try{

        let bodyData = req.body

        let dbData = await productModel.create(bodyData)

        res.redirect('/')
       // res.status(201).send({status: true, message: dbData})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}

//------------------------------------------------------------------------


let postEditProduct = async(req,res) =>{
    
    try{

        let id = req.params.id
        let data = req.body

        await productModel.findByIdAndUpdate({ _id: id }, data, { new: true })

        res.redirect('/createProductPage')
       // res.status(201).send({status: true, message: dbData})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}




//------------------------------------------------------------------------



let getProduct = async(req,res) =>{
    
    try{

        let allProdect = await productModel.find().lean()
        res.render('index',{allProdect: allProdect})
        //res.status(200).render({status: true, allProdect: allProdect})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}




//------------------------------------------------------------------------




let createProductPage = async(req,res) =>{
    
    try{

        let allProdect = await productModel.find().lean()
        res.render('createProductPage',{allProdect: allProdect})
        //res.status(200).render({status: true, allProdect: allProdect})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}




//------------------------------------------------------------------------






let deleteProduct = async(req,res) =>{
    
    try{

        let id = req.params.id
        await productModel.findOneAndRemove({_id: id})

        let allProdect = await productModel.find().lean();

        res.render('createProductPage',{allProdect: allProdect})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}



//------------------------------------------------------------------------





let editProduct = async(req,res) =>{
    
    try{

        let id = req.params.id
        let findIdData = await productModel.find({_id: id})
        console.log(findIdData)
        res.render('editProduct',{allProdect: findIdData})
        //res.status(200).render({status: true, allProdect: allProdect})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}




//------------------------------------------------------------------------






module.exports = {createProduct, getProduct,createProductPage, deleteProduct, editProduct, postEditProduct, productSearch}