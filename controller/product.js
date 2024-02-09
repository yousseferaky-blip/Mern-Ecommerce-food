const ProductSchema = require("../model/product")
exports.CreateProduct = async (req, res) => {
  try {
    const newProductData = req.body;
    const avatar = req.file; 

    if (!newProductData.name || !newProductData.price || !newProductData.category || !newProductData.description || !avatar) {
      return res.status(400).json({ message: "All fields and avatar are required" });
    }

    const newProduct = new ProductSchema({
      ...newProductData,
      avatar: avatar.filename, 
    });

    await newProduct.save();
    res.status(201).json({ newProduct });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.UpdateProduct = async (req,res)=>{
    try{
        const update = await ProductSchema.findByIdAndUpdate(req.params.id,req.body, { new: true })
        res.status(200).json({update})
    }catch(err){
        res.status(500).json(err)
    }
}

exports.Product = async (req,res)=>{
    try{
      const product = await ProductSchema.findOne({ _id: req.params.id })
        res.status(201).json({product:product})
    }catch(err){
        res.status(500).json(err)
    }
}

exports.GetProducts = async (req,res)=>{
    try{
       const products = await ProductSchema.find({})
       res.status(200).json({products})
    }catch(err){
        res.status(500).json(err)
    }
}




