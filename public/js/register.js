document.querySelector("form").addEventListener("submit",function(event){
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const comfirmpassword = document.getElementById("confirm_password").value;

if (password != comfirmpassword) {
  alert("รหัสไม่ตรงกัน");
  return;
}

if (email && password && username) {
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ 
      name : username, 
      email : email, 
      password : password 
    }),

  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("สมัครสมาชิกสำเร็จ");
        window.location.href = "sign_in"; // ไปยังหน้า login
      } else {
        alert(data.message); // แสดงข้อความข้อผิดพลาด
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("มีข้อผิดพลาดในการสมัครสมาชิก");
    });

  }
});