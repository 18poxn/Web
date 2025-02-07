const db = require("./Dbcontroller");
const JWT_SECRET = "thanaporn";
const { jwtDecode } = require("jwt-decode");

const role = (req, res) => {
    const headers = req.headers.authorization;
    if (!headers) {
        return res.status(401).json({ success: false, message: "กรุณาเข้าสู่ระบบ" });
    }

    const token = headers.split(" ")[1];
    const { role } = req.body;

    const user = jwtDecode(token, JWT_SECRET);

        db.query("UPDATE user SET roleid = ? WHERE id = ?", [role, user.id], (err, result) => {
            console.log(err)
            if (err) {
                return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการอัปเดตบทบาท" });
            }

            res.json({ success: true, message: "อัปเดตบทบาทสำเร็จ" });
        });
};


module.exports = {role}