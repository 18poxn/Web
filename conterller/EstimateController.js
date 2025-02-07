const db = require("./Dbcontroller");
const JWT_SECRET = "pothanp";
const { jwtDecode } = require("jwt-decode");

const insertEstimate = async (req, res) => {
    const { est1, est2, est3, est4, est5, est6, est7, est8, est9, est10 } =
      req.body;

    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "กรุณาเข้าสู่ระบบ" });
    }

    // ตรวจสอบ token
    const user = jwtDecode(token, JWT_SECRET); // คุณต้องมีการติดตั้ง library สำหรับการ decode JWT token

    db.query("SELECT * FROM user WHERE id = ?", [user.id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
          });
      }

      const username = result[0].username;

      // บันทึกข้อมูลประเมินในฐานข้อมูล
      db.query(
        "INSERT INTO estimate (username, estimate1, estimate2, estimate3, estimate4, estimate5, estimate6, estimate7, estimate8, estimate9, estimate10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [username, est1, est2, est3, est4, est5, est6, est7, est8, est9, est10],
        (err, results) => {
          if (err) {
            return res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
          }
          res.status(200).json({ success: true, message: "บันทึกข้อมูลสำเร็จ", data: results });
        }
      );
    });
};

module.exports = insertEstimate;
