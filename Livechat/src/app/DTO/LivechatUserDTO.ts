export class LivechatUserDTO{

    private id : Number =  0;
    private token : String = "";


    constructor(id : Number, token : String){
        this.id = id;
        this.token = token;
    }

    getId():Number{
        return this.id;
    }
    getToken():String{
        return this.token;
    }
}

