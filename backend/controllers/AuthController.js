
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../db')

const checkDetails = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.promise().query(
    "SELECT * FROM register WHERE email = ?",
    [email]
  );

  if (!rows.length) return res.status(401).json({ msg: "Invalid credentials" });

  const user = rows[0];
  // console.log(user);
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, name: user.f_name },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );
  // -------------------------------------------------------COOKIE---------------------------------------------------
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: false, // true in production
  //   sameSite: "lax",
  // });

  res.json({ msg: "Login success" , token : token});
};
const getDetails = async(req, res) => { 
    
    const {f_name, l_name, email, password} = req.body;
    // console.log(f_name, l_name, email, password);
    
    const query = "SELECT * FROM register WHERE email = ?";
    const [row] = await db.promise().query(query, [email]);
    if(row.length > 0) {
        return res.status(409).json({msg : "User already exists"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    
    const sql = "INSERT INTO register (f_name, l_name, email, password) VALUES(?, ?, ?, ?)";
    const [user] = await db.promise().query(sql, [f_name, l_name, email, hashPassword]);
    res.status(201).json({msg : "User Created"})
}
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};


// ----------------------------------------------------COOKIE--------------------------------------------------
// const verifyToken = async (req, res, next) => {
//   const token = req.cookies.token;
  
//   if (!token) {
//     return res.status(401).json({ msg: "Unauthorized" });
//     // console.log("Unauthorized");
    
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     // console.log(decoded);
    
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };
// ----------------------------------------------------------------COOKIE------------------------------------------
// const logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ msg: "Logged out" });
// };




module.exports = { getDetails, checkDetails, verifyToken };
