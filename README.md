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

 **หมายเหตุ ใช้ googlechome ได้
 ![image](https://github.com/user-attachments/assets/1fb300c2-2b5b-4464-a3cc-3acd1d7108f8)
แต่ใช้ Microsoft edge เกิดการ error
![image](https://github.com/user-attachments/assets/045b1278-06c7-4e38-888f-df91ea72e3c0)


