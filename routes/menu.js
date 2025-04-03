const express = require("express");
const router = express.Router();
const Menu = require("../schemas/menu");
const { CreateSuccessRes, CreateErrorRes } = require("../utils/responseHandler");

async function buildMenuTree(parentId = null) {
  let menuItems = await Menu.find({ parent: parentId }).lean();
  for (let item of menuItems) {
    item.children = await buildMenuTree(item._id);
  }
  return menuItems;
}

router.get("/", async (req, res) => {
  try {
    let menuTree = await buildMenuTree();
    CreateSuccessRes(res, menuTree, 200);
  } catch (error) {
    CreateErrorRes(res, error.message, 500);
  }
});

module.exports = router;
