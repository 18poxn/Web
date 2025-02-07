const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const {WebSocketServer} = require("ws");
const {register, login, info, update} = require("./conterller/Authcontroller");
const { sendMessage, joinRoom, removeUserInRoom } = require('./conterller/ChatControler');
const insertEstimate = require('./conterller/EstimateController');
const { role } = require('./conterller/RoleController');

const app = express()
const wss = new WebSocketServer({port:8080});

const port = 3000;
app.use(bodyParser.json());//ใช้รับbody ที่ส่งมาจากjson 

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req, res) =>{
    res.render('index')
})

app.get('/sign_in',(req, res) =>{
    res.render('sign_in')
})

app.get('/sign_up',(req, res) =>{
    res.render('sign_up')
})

app.get('/account',(req, res) =>{
    res.render('account')
})

app.get('/form',(req, res) =>{
    res.render('form')
})

app.get('/selection',(req, res) =>{
    res.render('selection')
})

app.get('/chat',(req, res) =>{
    res.render('chat')
})

app.get('/contact',(req, res) =>{
    res.render('contact')
})

app.post("/register", register)
app.post("/login",login)
app.post("/user/update", update)
app.post("/est", insertEstimate)
app.get("/info", info)
app.post("/role", role)




wss.on("connection", (ws) => {//สร้างwebsocket
    let roomname = null;
    let userRole = null; 
    ws.on("message" ,(data) => {
        const message = JSON.parse(data)
        console.log(message)
        if(message.type == 'join'){
            userRole = message.role
            roomname = joinRoom(ws, userRole)
        }

        if(message.type == 'message' && roomname){
            //ส่งข้อความไปที่
            sendMessage(ws, userRole, roomname, message.text)

        }
    })

    ws.on("close", () => {
        removeUserInRoom(ws, roomname)
    })
})




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 
