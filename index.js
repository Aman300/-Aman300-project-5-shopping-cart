const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
app.set ('view engine', 'ejs');
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Aman300:ByXZ2qfTNQNWF7Uj@cluster0.o4rcy.mongodb.net/Shopping-cart-project-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() =>{
    console.log("</> Mongo db connected </>")
}).catch(() =>{
    console.log("!!!!! not connected mongo db")
})




const route  = require('./routes/route')

app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
