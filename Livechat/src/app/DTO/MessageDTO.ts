

export class MessageDTO{

    private id : number = 0;
    private message : string = "";
    private sender : number = 0;
    private receiver : number = 0;



    constructor(id : number, message : string, sender: number, receiver : number){
        this.id = id;
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
    }
    
    public getId(): number {
        return this.id;
    }

    public getSender(): number {
        return this.sender;
    }

    public getReceiver(): number {
        return this.receiver;
    }

    public getMessage():string {
        return this.message;
    }

}