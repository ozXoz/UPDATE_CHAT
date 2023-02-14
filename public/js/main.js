// initalize html form id here...

const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
console.log(username,room);
// get user name and room from url ...

const socket =io();

// Join room
socket.emit('joinRoom',{username,room})
socket.on('jointRoom',{username,room})

// Get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);


});

socket.on('')
// Msg from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

     // Scrol down
     chatMessages.scrollTop=chatMessages.scrollHeight;
});


// Message Submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // Get msg text!
    const msg=e.target.elements.msg.value; // it comes html input id .. !
    // console.log(msg); 
        // emit message to server
    socket.emit('chatMessage',msg);

    // clear input !
    e.target.elements.msg.value='';
    // e.target.elements.msg.focus()='';

})


// Display when user send a message in chat side ! 
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}



// Add room name to DOOOMMM !!
// chat.html line 19 and line 21 import in chat.hmtl id
function outputRoomName(room){
    roomName.innerText=room;

}

/// Add users to doom

function outputUsers(users){
    userList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join()}
    `

}