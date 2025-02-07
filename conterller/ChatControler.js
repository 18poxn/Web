const { text } = require("body-parser");
const db = require("./Dbcontroller");

const rooms = {}

function CreateRoom (role){
    let roomname = 'Room';
    let count = 1;


    while(rooms[roomname]){
        //roleInroom = [role1,role2]
        const  roleInroom = rooms[roomname].map(client => client.role)//เอาแค่roleเฉยๆ//สามารถสร้างroleใหม่ได้//สร้างอาเรย์ที่เก็บแค่บทบาท

        if(roleInroom.includes(role)){//เช็คว่ามีบทบานนี้อยู่ในห้องนี้มั้ย
            count++;
            roomname = `${roomname}-${count}`
        }else if(roleInroom.length < 2){//เช็คว่ามี่หองนี้ครบ2คนยัง
            break
        }else{//ถ้าครบสร้งห้องใหม่ให้เลย
            count++;//เพิ่มห้อง
            roomname = `${roomname}-${count}`
        }
    }
    if(!rooms[roomname]) {//ห้องนี้มี่ชื่อหรือยัง
        rooms[roomname] = [];
    }
    return roomname;
}



function joinRoom (ws, role){
    const roomname = CreateRoom(role)//หาชื่อห้องเพื่อนมาเพิ่มข้อมูล

    rooms[roomname].push({ws, role, message : {}})//เพิ่มข้อมูลใน ห้อง
    db.query(
        "INSERT INTO room (roomname,  username) VALUES (?, ?)",
        [roomname, ''],
        (err, result) => {
            if (err) {
                console.error("Error saving room join:", err);
            }
        }
    );
    rooms[roomname].map((cl) => {
        cl.ws.send(JSON.stringify({
            type : 'system',
            text : `มี ${rooms[roomname].length} คนในห้อง ${roomname}`

        }))
    })
    return roomname
}

function sendMessage(ws, role, roomname, message){
    if(!roomname || !rooms[roomname]){
        return;
    }

   rooms[roomname].forEach((cl) => {
    if(cl.ws !== ws && cl.ws.readyState === 1){
       cl.ws.send(JSON.stringify({
        type : 'chat',
        text : `[${role}] : ${message}`
       }))
 
    }
   })
}

function removeUserInRoom (ws, roomname) {
    if(!roomname || !rooms[roomname]){
        return;
    }
    rooms[roomname] = rooms[roomname].filter((cl) => cl.ws !== ws)
    rooms[roomname].map((cl) => {
        cl.ws.send(JSON.stringify({
            type : 'system',
            text : `มี ${rooms[roomname].length} ออกจากห้อง ${roomname}`

        }))
    })

    if (rooms[roomname].length === 0){
        delete rooms[roomname];
    }
}


module.exports = {joinRoom, sendMessage, removeUserInRoom};