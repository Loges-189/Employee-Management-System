const express = require("express");
const router = express.Router()
const {getAllUsers, addUser, deleteUser, getElementById, updateUser, getTotalEmployees, getTotalSalary} = require('../controllers/userController')

router.get('/', getAllUsers)
router.get('/totalemployee', getTotalEmployees)
router.get('/totalsalary', getTotalSalary)
router.get('/:id', getElementById)
router.post('/', addUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router;