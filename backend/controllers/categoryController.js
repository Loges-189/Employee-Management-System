const db = require('../db');


const getCategories = async(req, res) => {
    try {
        // console.log("category working fine");
        const query = "SELECT MIN(c_id) AS c_id, c_name FROM category GROUP BY c_name";
        const [category] = await db.promise().query(query);
        // console.log(category);
        res.send(category);
        // res.status(200).json({msg : "category"})
    }catch(err) {
        console.error(error);
        res.status(500).json({ message: 'Database error' });
    }
}

const addCategory = async(req, res) => {
    try {
        const {c_name} = req.body;
        console.log(c_name);
        if(!c_name) {
            res.send({msg : "c_name not defined"})
        }
        const query = "INSERT INTO category(c_name) VALUES(?)"
        const result = db.promise().query(query, [c_name]);
        // console.log({c_name});
        // console.log(result);
        
        res.status(201).json({c_name})
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error inserting data' });
    }
        
    
}

const deleteCategory = async(req, res) => {
    try{
        const id = parseInt(req.params.id)
        // console.log(id);
        
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid or missing ID" });
        }
        const query = "DELETE FROM category WHERE c_id = ?"
        await db.promise().query(query, [id]);

        res.status(200).json({ msg: "Deleted successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const totalCategory = async(req, res) => {
    const countQuery = "SELECT COUNT(DISTINCT c_name) AS totalCategory FROM category";
    const [count] = await db.promise().query(countQuery);
    // console.log(count);
    
    res.send(count[0]);
}

module.exports = { getCategories, addCategory, deleteCategory, totalCategory};
