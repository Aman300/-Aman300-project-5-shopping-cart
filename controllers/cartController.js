const productModel = require('../models/productModel')
const cartModel = require('../models/cartModel')






let addToCart = async(req,res) =>{
    
    try{

        let productId = req.params.id

        let quantity
        if (!quantity) {
            quantity = 1
        }
        quantity = Number(quantity)
        if (typeof quantity !== 'number')
            return res.status(400).send({ status: false, message: "quantity is number" })
        if (quantity < 1)
            return res.status(400).send({ status: false, message: "quantity cannot be less then 1" })

        //searching for product    
        let validProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!validProduct) return res.status(404).send({ status: false, message: "No products found or product has been deleted" })

        let validCart = await cartModel.findOne()
        
        if (validCart) {
           
            let productidincart = validCart.items
            let uptotal = validCart.totalPrice + (validProduct.productPrice * Number(quantity))
            let proId = validProduct._id.toString()
            for (let i = 0; i < productidincart.length; i++) {
                let productfromitem = productidincart[i].productId.toString()

                //updates old product i.e QUANTITY
                if (proId == productfromitem) {
                    let oldQuant = productidincart[i].quantity
                    let newquant = oldQuant + quantity
                    productidincart[i].quantity = newquant
                    validCart.totalPrice = uptotal
                    await validCart.save();
                    // let result = await cartModel.findOne({ _id: userId }).select({ "items._id": 0, __v: 0 })
                    //return res.status(200).send({ status: true, message: 'Success', data: validCart })
                    return res.redirect("/getCart")
                }
            }
            //adds new product
            validCart.items.push({ productId: productId, quantity: Number(quantity) })
            let total = validCart.totalPrice + (validProduct.productPrice * Number(quantity))
            validCart.totalPrice = total
            let count = validCart.totalItems
            validCart.totalItems = count + 1
            await validCart.save()
            //let result = await cartModel.findOne({ _id: userId }).select({ "items._id": 0, __v: 0 })
            //return res.status(200).send({ status: true, message: 'Success', data: validCart })
           return  res.redirect("/getCart")
        }
        
        // 1st time cart
        let calprice = validProduct.productPrice * Number(quantity)
        let obj = {
            items: [{
                productId: productId,
                quantity: quantity
            }],
            totalPrice: calprice,
        }
        obj['totalItems'] = obj.items.length
        let result = await cartModel.create(obj)
        // let result = await cartModel.findOne({ _id: cartId }).select({ "items._id": 0, __v: 0 })
        //return res.status(201).send({ status: true, message: 'Success', data: result })
        
        return res.redirect("/getCart")

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}


let getCart = async(req,res) =>{
    
    try{

        let allProdect = await cartModel.find().populate('items.productId')
        //res.render('index',{allProdect: allProdect})
    //     const data = allProdect[0].items[0]
    //     console.log(data.productId.productImage)

    //    allProdect.forEach((ele) =>{
    //     let arr = ele.items
    //     arr.forEach((val) =>{
    //         console.log(val.productId.productImage)  
    //     })
    //    })

   // console.log(data.productId.productImage)
       

        //res.status(200).send({status: true, allProdect: allProdect})

        console.log(allProdect)
        res.render('cartPage', {allCart: allProdect})

    }catch(error){
        res.status(500).send({status: false, Error: error.message})
    }
}



let deleteCartItem = async(req,res)=>{
    
    try{

        let id = req.params.id
        let [data] = await cartModel.find().populate('items.productId')
        // data.forEach((ele)=>{
        //     let value = ele.items
        //     value.forEach((ele) =>{
        //         console.log(ele)
        //     })
        // })
        console.log(data.items)

        res.redirect('/getCart')


    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


let deleteAllCartItem = async(req,res)=>{
    
    try{

        let id = req.params.id
        let data = await cartModel.find({_id: id})
        // data.forEach((ele)=>{
        //     let value = ele.items
        //     value.forEach((ele) =>{
        //         console.log(ele)
        //     })
        // })
        let deleteData = await cartModel.deleteMany({data})
        console.log(deleteData)

        res.redirect('/getCart')


    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


module.exports = {addToCart, getCart, deleteCartItem, deleteAllCartItem}