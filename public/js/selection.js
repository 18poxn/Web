function setRole(role) {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/role", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ส่ง Token เพื่อยืนยันตัวตน
        },
        body: JSON.stringify({ role }) // ส่งค่าบทบาทไปยังเซิร์ฟเวอร์
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("userRole", role); // เก็บ role ใน sessionStorage
            window.location.href = "chat"; // ไปยังหน้า chat
        } else {
            alert(data.message); // แจ้งเตือนถ้าเกิดข้อผิดพลาด
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการตั้งค่าบทบาท");
    });
}
