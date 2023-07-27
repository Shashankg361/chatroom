class ChatRoom{
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
        localStorage.setItem('Username',name);
    }

    updateRoom(room){
        this.room = room;
        localStorage.setItem('Room',room);
        console.log('room Updated');
        if(this.unsub){
            this.unsub();
        }
    }

}



