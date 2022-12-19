//reference to the DOM
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

//class instences
const chatUI = new ChatUI(chatList);
const chatroom = new ChatRoom('Yoshi','general');

// adding Eventlisterner
newChatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message);
})



// gey chat and render
chatroom.getChat(data => chatUI.render(data));