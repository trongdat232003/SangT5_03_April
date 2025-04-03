var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')
let {CreateErrorRes,
  CreateSuccessRes} = require('../utils/responseHandler')
let productModel = require("../schemas/products")
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let products = await categoryModel.find({
    isDeleted:false
  })
  CreateSuccessRes(res,products,200);
});
router.get('/:slugcategory/:slugproduct', async function(req, res, next) {
  try {
    let { slugcategory, slugproduct } = req.params;
    console.log(slugcategory,slugproduct);
    
    // Tìm category theo slug
    let category = await categoryModel.findOne({ slug: slugcategory, isDeleted: false });
    console.log(category);
    
    if (!category) {
      return CreateErrorRes(res, "Category Not Found", 404);
    }

    // Tìm product theo slug và category ID
    let product = await productModel.findOne({ slug: slugproduct, category: category._id, isDeleted: false })
                                    .populate("category");
                                    
    console.log("asdfafdsa"+product);
                                    
    if (!product) {
      return CreateErrorRes(res, "Product Not Found", 404);
    }

    CreateSuccessRes(res, product, 200);
  } catch (error) {
    next(error);
  }
});


router.post('/', async function(req, res, next) {
  try {
    let body = req.body
    let newProduct = new categoryModel({
      name:body.name,
    })
    await newProduct.save();
    CreateSuccessRes(res,newProduct,200);
  } catch (error) {
    next(error)
  }
});
router.put('/:id', async function(req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updatedInfo = {};
    if(body.name){
      updatedInfo.name = body.name;
    }
    let updateProduct = await categoryModel.findByIdAndUpdate(
      id,updatedInfo,{new:true}
    )
    CreateSuccessRes(res,updateProduct,200);
  } catch (error) {
    next(error)
  }
});
router.delete('/:id', async function(req, res, next) {
  let id = req.params.id;
  try {
    let updateProduct = await categoryModel.findByIdAndUpdate(
      id,{
        isDeleted:true
      },{new:true}
    )
    CreateSuccessRes(res,updateProduct,200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
