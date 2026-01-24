const express = require("express");
const router = express.Router()
const {getCategories, addCategory, deleteCategory, totalCategory} = require('../controllers/categoryController')


router.get('/', getCategories)
router.get('/totalcategory', totalCategory)
router.post('/', addCategory)
router.delete('/:id', deleteCategory)

module.exports = router;