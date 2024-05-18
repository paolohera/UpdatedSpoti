const express = require('express');
const http = require ('http');
const socketIo = require ('socket.io');  
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
        origin: "*",
        methods: "*"
    }
}
);

io.on('connection', (socket) =>{

    socket.on('message', (message) =>{
        io.emit('message', message);
    });
});


server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

axios.get('https://api.spotify.com/v1/search?q=stirfry&type=track', {

headers:{
   'authorization': 'Bearer BQCFeSX_b4B0PrGKrgKvFCZzzwHNC5egzEzRy3AGIvVEebtAPXGTzNZc3HHbeXoiIkRhoPYQjwZ8JqTcYsyg3zkvXRr5-YUbfMYDeU-mrlSPA4LWyVPWUHegS_gjZcnFS9DRgflMnokdasYHGZsZWV-BGS5oDh4aPyqaWiz2K7uugd0BzcVR73_9QrsdcXQMSZnzaJ2kEjAgzFNGdB4',
    // 'authoriztion': 'Bearer BQAY2V1Cc5sjG-WZ_BB3HEyf8oRiPixEelAmONJh0dVKVon65ezdIzmGlzarwxUWeqzADquvqF8eS2-61dUcKehWBc-DekJ1Bd6UT90KoBYxlR0_KJcA4NZPZbwGRVM0dSCZy_8Qo8q786sIyqIe0wCfc1ccDOLCv8SC57EZTRcK7e93VYBp2icId_8gvOnPaj805Cbno4iudotlrJ--Flhpxc2loH_o3qfKN29RI6WmxiVXyq4QxutowdFSWGQDIlux2Dv-8zv1IK5zHEXZMrWy2fzo9LMtmUF0idu2-fFfw3tfk1geU-7TBs7nwbD9mEOaBR7oSnCXrnyeU22P-Dw'
}
})
.then((data)=>{
    console.log(data.data.tracks.items[0].id);
});
