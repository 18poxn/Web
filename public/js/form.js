document
  .getElementById("mentalHealthForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let totalScore = 0;
    let allQuestionsAnswered = true;
    const token = localStorage.getItem("token");

    for (let i = 1; i <= 10; i++) {
      const selectedValue = document.querySelector(
        `input[name="q${i}"]:checked`
      );
      if (selectedValue) {
        totalScore += parseInt(selectedValue.value);
      } else {
        allQuestionsAnswered = false;
      }
    }

    if (!token) {
      // ถ้าไม่มี Token ให้ redirect ไปหน้า login
      // window.location.href = "sign_in";
    } else {
      // ถ้ามี Token ให้แสดงข้อมูลผู้ใช้งาน
      let assessmentData = {}; // ตัวแปรเก็บค่าคะแนนทั้งหมด

      for (let i = 1; i <= 10; i++) {
        const selectedValue = document.querySelector(
          `input[name="q${i}"]:checked`
        );
        if (selectedValue) {
          assessmentData[`est${i}`] = parseInt(selectedValue.value);
        } else {
          allQuestionsAnswered = false;
        }
      }

      if (allQuestionsAnswered) {
        fetch("http://localhost:3000/est", { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(assessmentData)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // ค่าที่ได้รับจาก server
        })
        .catch((error) => {
            console.error('Error:', error);
            // window.location.href = "sign_in"; // หากมีข้อผิดพลาดในการตรวจสอบก็ไปหน้า login
        });
    } else {
        alert("กรุณาตอบทุกคำถามก่อนส่ง");
    }
    }

    

    let resultText = "";
    let resultColor = "";

    if (totalScore >= 0 && totalScore <= 4) {
      resultText = "สุขภาพจิตอยู่ในเกณฑ์ปกติ";
      resultColor = "green";
    } else if (totalScore >= 5 && totalScore <= 9) {
      resultText = "มีความเสี่ยงเล็กน้อย ควรติดตามอาการ";
      resultColor = "#FBDE3A";
    } else if (totalScore >= 10 && totalScore <= 14) {
      resultText = "อาจมีความเครียด แนะนำให้ปรึกษาผู้เชี่ยวชาญ";
      resultColor = "orange";
    } else if (totalScore >= 15 && totalScore <= 19) {
      resultText = "อาการรุนแรง ควรขอคำปรึกษาจากแพทย์หรือผู้เชี่ยวชาญทันที";
      resultColor = "red";
    } else {
      resultText = "อาการรุนแรงมาก ควรได้รับการดูแลจากผู้เชี่ยวชาญโดยด่วน";
      resultColor = "darkred";
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <p style="color: ${resultColor}; font-weight: 500;">
            ${resultText}
        </p>
        <p>คะแนนรวม: ${totalScore}</p>

        <div style="
            background-color: #e0efff; 
            color: #333845; 
            padding: 10px; 
            margin-top: 5px;
            font-size: 15px; 
            border-radius: 5px;
            max-width: 320px; 
            text-align: left;
            line-height: 1.6;
        ">
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">เกณฑ์การประเมินคะแนน</h2>
            <p>0-4 คะแนน: สุขภาพจิตอยู่ในเกณฑ์ปกติ</p>
            <p>5-9 คะแนน: มีความเสี่ยงเล็กน้อย ควรติดตามอาการ</p>
            <p>10-14 คะแนน: อาจมีความเครียดหรืออาการทางจิตบางประการ แนะนำให้ปรึกษาผู้เชี่ยวชาญ</p>
            <p>15-19 คะแนน: อาการรุนแรง ควรขอคำปรึกษาจากแพทย์หรือผู้เชี่ยวชาญทันที</p>
            <p>20 คะแนนขึ้นไป: อาการรุนแรงมาก ควรได้รับการดูแลจากผู้เชี่ยวชาญโดยด่วน</p>
        </div>

        <button id="retryBtn" style="margin-top: 15px; padding: 8px 12px; background-color: ##3498DB; color: white; border: none; border-radius: 5px; cursor: pointer;">
            แบบประเมินสอบอีกครั้ง
        </button>
    `;
    document.getElementById("retryBtn").addEventListener("click", function () {
      document.getElementById("mentalHealthForm").reset();
      resultDiv.innerHTML = "";
    });
  });
