const mysql = require("mysql2")

const db = mysql.createConnection({
    host : 'localhost',
    user : 'iot',
    password : '1234',
    database : 'test'
})

db.connect((err) => {
    if(err){
        console.error("ไม่สามารถเชื่อมต่อฐานข้อมูลได้ :",err.message);
    } else {
        console.log("เชื่อมต่อฐานข้อมูลสำเร็จ");

    }
})
module.exports = db; //exports เอาไว้ใช้หน้าอื่นๆ