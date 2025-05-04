

export class MessageDTO{

    private id : number = 0;
    private message : string = "";
    private sender : number = 0;
    private receiver : number = 0;
    private createAt: string = "";



    constructor(id : number, message : string, sender: number, receiver : number, createAt: string) {
        this.id = id;
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
        this.createAt = createAt;
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

    public getCreateAt(): string {
        return this.createAt;
    }

}