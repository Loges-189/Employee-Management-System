const db = require('../db');

const getAllUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM employee";
    const [users] = await db.promise().query(query);
    // console.log(req.query);
    // console.log(count);
    
    res.send({users});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
};

const addUser = async(req, res) => {
  try{
    const {e_id, e_name, age, category, salary} = req.body
    
    const query = "INSERT INTO employee (e_id, e_name, age, category, salary) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.promise().query(query, [e_id, e_name, age, category, salary]);
    // const [rows] = await db.promise().query(
    //   "SELECT * FROM employee WHERE e_id = ?",
    //   [result.insertId]
    // );
    // console.log("Inserted data : ", {e_id, e_name, age, category, salary});
    
    // res.json(rows[0]); 
    res.status(201).json({e_id, e_name, age, category, salary});

  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error inserting data' });
  }
}

const deleteUser = async (req, res) => {
  try {
    // parseInt ensures it's a number
    const e_id = parseInt(req.params.id)
    if (!e_id) {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    // console.log("deleted ID:", e_id); 

    const query = "DELETE FROM employee WHERE e_id = ?";
    await db.promise().query(query, [e_id]);
    // console.log(user);
    
    res.status(200).json({ msg: "Deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getElementById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }
    const query = "SELECT * FROM employee WHERE e_id = ?";
    const [users] = await db.promise().query(query, [id]);
    res.status(201).send(users)
    
  }catch(err) {
    console.log(err.message);
    
  }
}

const updateUser = async (req, res) => {
  try{
      const id = req.params.id;
      const {e_id , e_name, age, category, salary}= req.body;
      const query = "UPDATE employee SET e_id = ?, e_name = ?, age = ?, category = ?, salary = ? WHERE e_id = ?;"
      const [result] = await db.promise().query(query, [e_id, e_name, age, category, salary, id]);
      if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
      }

      res.json({ message: "Employee updated successfully" });
      
  }catch(err) {
    console.log(err.message);
    res.status(500).json({ message: "Update failed" });
  }
}

const getTotalEmployees = async(req, res) => {
      const countQuery = "SELECT COUNT(*) totalEmployees FROM employee"
      const [count] = await db.promise().query(countQuery);
      res.send(count[0]);


}

const getTotalSalary = async(req, res) => {
    const salaryQuery = "SELECT SUM(salary) AS totalSalary FROM employee"
    const [sum] = await db.promise().query(salaryQuery);
    res.send(sum[0]);
}

module.exports = { getAllUsers, addUser, deleteUser, getElementById, updateUser, getTotalEmployees, getTotalSalary};
