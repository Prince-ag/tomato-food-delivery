import userModel from "../models/userModel.js";

// add item to cart
const addToCart = async (req,res)=>{
    try {

        const userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true,message:"Added To Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


// remove item
const removeFromCart = async (req,res)=>{
    try {

        const userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true,message:"Removed From Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


// get cart
const getCart = async (req,res)=>{
    try {

        const userData = await userModel.findById(req.body.userId);

        res.json({
            success:true,
            cartData:userData.cartData
        });

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart}