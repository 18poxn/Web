const jwt = require("jsonwebtoken");
const JWT_SECRET = "pothanp";
const { jwtDecode } = require("jwt-decode");
const db = require("./Dbcontroller");
const bcrypt = require("bcrypt")


const register = (req, res) => {
    const{name,email,password} = req.body;

    db.query("SELECT * FROM user WHERE email = ?",[email],async(err , result) => {
        console.log(err)
        if(err) return res.send({success : false, massage : 'เกิดข้อผิดพลาด'})
            //result ส่งมาเป็น array ex.[{},{}]
        if(result.length > 0){
            res.send({success : false,massage : 'มี email นี้แล้ว'})
        }

        const hash = await bcrypt.hash(password , 10);
        //ส่งมารหัสแบบไม่เปิดเผย ex.jfiu7ish#jnf$dogr;sww

        db.query("INSERT INTO user (username, email ,password ,roleid) VALUES (?,?,?,?)",[name,email,hash,3] , (err) => {
            console.log(err)
            if(err) return res.send({success : false, massage : 'เกิดข้อผิดพลาด'})

                res.send({success : true,massage : 'สมัครสำเร็จ'})
        })

    })

}

const login = (req, res) => {
    const{email,password} = req.body;

    db.query("SELECT * FROM user WHERE email = ?",[email],async(err , results) => {
        if(err) return res.send({success : false, massage : 'เกิดข้อผิดพลาด'})
            //result ส่งมาเป็น array ex.[{},{}]
        if(results.length > 0){
           const pass =  await bcrypt.compare(password, results[0].password)
           if(pass){
            const token = jwt.sign({ id: results[0].id, email: results[0].email }, JWT_SECRET, {
                expiresIn: "1h",
            }); 
            db.query("INSERT INTO action (username, action) VALUES (?,?)",[results[0].username, 'ได้เข้าสู่ระบบ'] , (err) => {})
           
            res.send({success : true,massage : 'รหัสถูกต้อง',token:token})
         }else{
            res.send({success : false,massage : 'รหัสไม่ถูกต้อง'})
         }
        }

       

    })
}

const info = (req, res) => {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    console.log(token)

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "กรุณาเข้าสู่ระบบ" });
    }
    const user = jwtDecode(token, JWT_SECRET); 
    console.log(user)
    db.query("SELECT * FROM user WHERE id = ?", [user.id], (err, result) => {
        console.log(err)
        if (err) {
          return res
            .status(500)
            .json({
              success: false,
              message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
            });
        }
  
        const username = result[0];
        console.log(result)
        res.status(200).json({ success: true, message: "บันทึกข้อมูลสำเร็จ", data: username });

    })
}

const update = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    try {
        const user = jwtDecode(token, JWT_SECRET);
        const { username, email,  passwordnew, passwordnewcon } = req.body;

        // อัปเดตข้อมูลทั่วไป
        db.query("UPDATE user SET username = ?, email = ?  WHERE id = ?", 
            [username, email,  user.id]);

        // เช็คว่าต้องอัปเดตรหัสผ่านหรือไม่
        if (passwordnew && passwordnewcon) {
            if (passwordnew !== passwordnewcon) {
                return res.status(400).json({ success: false, message: "รหัสผ่านใหม่ไม่ตรงกัน" });
            }

            const hashedPassword = await bcrypt.hash(passwordnew, 10); // เข้ารหัสรหัสผ่านใหม่
           db.query("UPDATE user SET password = ? WHERE id = ?", 
                [hashedPassword, user.id]);
        }

        res.json({ success: true, message: "อัปเดตข้อมูลสำเร็จ" });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




module.exports = {register,login, info, update};