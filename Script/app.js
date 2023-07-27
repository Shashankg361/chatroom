//reference to the DOM
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateName = document.querySelector('.update');
const ackMessage = document.querySelector('.acknoweledge');
const chatRoom = document.querySelector('.chat-room');
//checking the name

const UserName = localStorage.UserName ? localStorage.Username : 'anonmous';
const Room = localStorage.Room ? localStorage.Room : 'general';

//class instences
const chatUI = new ChatUI(chatList);
const chatroom = new ChatRoom(UserName,'gaming');

chatRoom.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON' ){
        const roomName = e.target.id; 
        chatroom.updateRoom(roomName);
        chatUI.clear();
        chatroom.getChat(data => chatUI.render(data));
    }
});



// adding Eventlisterner
newChatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=>newChatForm.reset())
        .catch(err=>console.log(err));
})

updateName.addEventListener('submit',e=>{
    e.preventDefault();

    const Name = updateName.updated.value.trim();
    chatroom.updateName(Name);
    updateName.reset();

    ackMessage.innerHTML=`Your name is updated ${Name}`;
    setTimeout(() => ackMessage.innerHTML='', 5000);

})

// get chat and render
chatroom.getChat(data => chatUI.render(data));