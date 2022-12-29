const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users_data1").then(i=>console.log("connect")).catch(err=>console.log("Error"))

const users=new mongoose.Schema({
    Phone :{
        type:String
    },
    Password :{
        type:String
    }
})
const add=new mongoose.model("users",users)

class server{
    
    static sendData(value){  
        return new Promise((res,rej)=>{
        add.find(value,(err,data)=>{
            if(err)
            {
                rej(err)
            }
            else
            {
                const data1 = JSON.parse(JSON.stringify(data))
                if(data1.length==0)
                {
                    const result= new add(value)
                    result.save()
                    res("Done")
                }
                else
                {
                    res("Data is there")
                }
            }
        })
    })
    }
    static getData(Phone)
    {  
        return new Promise((res,rej)=>
        {
            
            add.find({Phone},(err,data)=>{
                
                if(err)
                {
                    rej(err)
                }
                const data1 = JSON.parse(JSON.stringify(data))
                if(data1.length>0)
                {
                    res(data1)
                }
                else
                {
                    res([])
                }
            })
        
        })
    }
}

module.exports=server;