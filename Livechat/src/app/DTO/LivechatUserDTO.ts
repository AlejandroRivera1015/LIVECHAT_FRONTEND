export class LivechatUserDTO{

    private id : number =  0;
    private token : string = "";


    constructor(id : number, token : string){
        this.id = id;
        this.token = token;
    }

    public getId():Number{
        return this.id;
    }
    public getToken():String{
        return this.token;
    }

}


