a.สร้างฐานข้อมูล 
1.	เปิดโปรแกรมจัดการฐานข้อมูล เช่น MySQL Workbench หรือใช้คำสั่งใน CLI 
2.	สร้างฐานข้อมูลชื่อ iot: 
sql CREATE DATABASE iot; 
3.	นำเข้าไฟล์ SQL ไปยังฐานข้อมูล iot โดยใช้คำสั่ง: ```sql SOURCE /path/to/iot.sql;


b.การตั้งค่าการเชื่อมต่อฐานข้อมูล
const mysql = require("mysql2")
const db = mysql.createConnection({
    host : '',
    user : '',
    password : ''
    database : ''
})


c. build project และ run
	cd project-main2
 	npm i
	npm run start

