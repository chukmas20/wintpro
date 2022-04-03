const express = require("express");
const { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router()


router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,createProduct);
// router.route("/product/:id").get(getProductDetails);

router.route("/product/:id")
.get(getProductDetails);

router.route("/admin/products").get(isAuthenticatedUser,getAdminProducts)


router.route("/admin/product/:id")
.put(isAuthenticatedUser,updateProduct)
.delete(isAuthenticatedUser,deleteProduct)







module.exports = router;

