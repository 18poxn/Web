document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage

    if (!token) {
        alert("กรุณาเข้าสู่ระบบ");
        window.location.href = "/sign_in"; // ถ้าไม่มี token ให้กลับไปที่หน้า login
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/info", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!data.success) {
            alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            return;
        }

        const user = data.data;
        console.log(user)

        

        // แสดงข้อมูลในฟอร์ม
        document.getElementById("username").value = user.username || "";
        document.getElementById("email").value = user.email || "";
        document.querySelector(".welcome-user h2").innerText = `Hi, ${user.username}!`;

        

    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("ไม่สามารถโหลดข้อมูลได้");
    }
});

document.querySelector(".btn-primary").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    // const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    const passwordnew = document.querySelector('passwordnew')?.value || "";
    const passwordnewcon = document.querySelector('passwordnewcon')?.value || "";
    try {
        const response = await fetch("http://localhost:3000/user/update", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email ,passwordnew, passwordnewcon})
        });

        const data = await response.json();

        if (data.success) {
            alert("อัปเดตข้อมูลสำเร็จ!");
        } else {
            alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        }


    } catch (error) {
        console.error("Error updating user data:", error);
        alert("ไม่สามารถอัปเดตข้อมูลได้");
    }
});

document.querySelector(".btn-danger").addEventListener("click", function () {
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("token");

    window.location.href = "sign_in";
});