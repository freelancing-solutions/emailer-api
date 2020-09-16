


function email_store(){
    this.max_mem_store_size = 500;
    this.mem_store = [];
    this.email = {
        to : '',
        from : '',
        subject : '',
        text : '',
        html : '',
        route : '',
        sent : false

    }


    this.store_email = (email,route) => {
        this.email = {...email};
        this.email.route = route;
        let shift_email = email;
        if (this.mem_store.length > 0){
            shift_email = this.mem_store.shift();
        }
        if(this.mem_store.length < this.max_mem_store_size){
                    this.mem_store.push(this.email);
        }else{
            throw new Error('too many emails being sent');
        }
        return shift_email;
    };

    this.retrieve_email = () => {
        if(Array.isArray(this.mem_store) && this.mem_store.length > 0){
            return this.mem_store.pop()
        }
        return null;
    };

    this.get_email = (index) => {
        if(Array.isArray(this.mem_store) && (index < this.mem_store.length) ){
            return this.mem_store[index];
        }else{
            return this.mem_store[this.mem_store.length - 1]
        }
    }
};


let email_store_instance = new email_store();

module.exports = {
    email_store : email_store_instance
}