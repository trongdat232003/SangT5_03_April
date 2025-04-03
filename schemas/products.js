let mongoose = require('mongoose');
const slugify = require("slugify");
let productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        default:0,
        required:true,
        min:0
    },
    description:{
        type:String,
        default:"",
    },
    urlImg:{
        type:String,
        default:"",
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    slug: { type: String, unique: true },
},{
    timestamps:true
})
productSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
  });
module.exports = mongoose.model('product',productSchema)
// products