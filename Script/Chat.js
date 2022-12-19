class Chatroom{
    constructor(Username,room){
        this.Username = Username;
        this.room = room;
        this.chats = db.collection('Chats');
        this.unsub;
    }

    async addChat(message){

        const now = new Date();
        const chat ={
            message,
            username : this.Username,
            room:this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        const response = await this.chats.add(chat);
        return response;

    }

    getChat(callback){
        this.unsub = this.chats
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type === 'added'){
                    callback(change.doc.data());
                }

            })
        })
    }

    updateName(name){
        this.Username = name;
    }

    updateRoom(room){
        this.room = room;
        console.log('room Updated');
        if(this.unsub){
            this.unsub();
        }
    }

}

const chatroom = new Chatroom('yoshi','general');
chatroom.getChat(data=>{
    console.log(data);
});

setTimeout(()=>{
    chatroom.updateRoom('gaming');
    chatroom.updateName('shaun');
    chatroom.getChat(data=>{
        console.log(data);
    });
    chatroom.addChat('old member');

},3000);

