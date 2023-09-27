// to render the dom
// change and remove the message
//import{format ,distanceInWordsToNow} from "date-fns";

class ChatUI{
    constructor(list){
        this.list = list;
    }

    clear(){
        this.list.innerHTML = '';
    }

    render(data){
        try{const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true}
        );
        const html = `
        <li class ="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
        </li>
        `

        this.list.innerHTML += html;
        } catch(error){
            console.log("Error rendering chat message : " ,error);
        }
    }
}


