//reference to the DOM
const chatList = document.querySelector('.chat-list');

//class instences
const chatUI = new ChatUI(chatList);
const chatroom = new ChatRoom('Yoshi','general');


// gey chat and render
chatroom.getChat(data => chatUI.render(data));