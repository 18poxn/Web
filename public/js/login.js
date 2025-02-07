document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");

    if (userEmail && userPassword) {
        window.location.href = "selection";
    }
});

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (email && password) {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              email : email, 
              password : password, 
          }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              if (data.success) {
               alert("เข้าสู่ระบบสำเร็จ");
               localStorage.setItem("token", data.token);
                 window.location.href = "selection"; // ไปยังหน้า login
               } else {
                 alert(data.massage); // แสดงข้อความข้อผิดพลาด
               }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("มีข้อผิดพลาดในการเข้าสู่ระบบ");
            });
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
});
