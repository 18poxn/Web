

const ws = new WebSocket('ws://localhost:8080');

//เชื่อมต่อเว็บsocket
ws.onopen=()=> {
    console.log('Connect to WS Server');

    const userRole = sessionStorage.getItem("userRole") || 'ผู้ใช้งานทั่วไป'

    //ws.send(JSON.stringify({message : "๋TEST"}));

    ws.send(JSON.stringify ({
        type : 'join',
        role : userRole 
    }))
    document.getElementById('role-display').textContent = `บทบาท : ${userRole}`


}

ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log(data)

    if (data.type == 'system'){
        addMessageSysyem(data.text,'system')
    }else if(data.type == 'chat'){
        addMessageSysyem(data.text,'received')
    }
}

//การสร้างตัวข้อความทั้งหมด 
function addMessageSysyem(text, type){
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement('div');
    message.classList.add('message', type)
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

//ส่งข้อความ
function sendMessage(){
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if(message){
        ws.send(JSON.stringify({type: 'message', text : message }))
        addMessageSysyem(message , "sent")
        input.value = ''
    }
}

function endChat () {
    ws.close();
    alert('ออกจากการสนทนาแล้ว')
    window.location.href = '/'
}

//ปิดweb socketเมื่อหน้าwebปิด
window.onbeforeunload = () => {
    ws.close()
}