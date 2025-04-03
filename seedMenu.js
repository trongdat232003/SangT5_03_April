const mongoose = require('mongoose');
const Menu = require('./schemas/menu'); // Đảm bảo có model menu

mongoose.connect("mongodb://localhost:27017/S5");
mongoose.connection.on('connected',()=>{
  console.log("connected");
})

async function seedMenu() {
    try {
      await Menu.deleteMany({});
      console.log("Đã xóa dữ liệu cũ");
  
      const categoryPhoneId = new mongoose.Types.ObjectId("67edebe7806866732436f357");
      const categoryLaptopId = new mongoose.Types.ObjectId("67edf0d04ac64072c094a087");
  
      const categoryPhone = await Menu.create({ text: 'Điện thoại', url: '/dien-thoai', parent: null });
      console.log("Tạo danh mục:", categoryPhone);
  
      const categoryLaptop = await Menu.create({ text: 'Laptop', url: '/laptop', parent: null });
      console.log("Tạo danh mục:", categoryLaptop);
  
      const product1 = await Menu.create({ text: 'iPhone 15', url: '/dien-thoai/iphone-15', parent: categoryPhone._id });
      console.log("Tạo sản phẩm:", product1);
  
      const product2 = await Menu.create({ text: 'Laptop 15', url: '/laptop/laptop-15', parent: categoryLaptop._id });
      console.log("Tạo sản phẩm:", product2);
  
      console.log('Dữ liệu menu đã được tạo thành công');
      mongoose.connection.close();
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }
  
  seedMenu();
  