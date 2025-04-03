let mongoose = require('mongoose');
const slugify = require("slugify");
let categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        default:"",
    },
    slug: { type: String, unique: true },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
categorySchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
  });
module.exports = mongoose.model('category',categorySchema)
// products