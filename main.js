const { error } = require("console");

express = require("express")
cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/:input",(request,response)=>{
    const { input } = request.params;
    let output = format(input)
    response.send(output)
})
app.get("/api/", (req,res)=>{
    const currentdate = new Date()
    const output = {
        unix:currentdate.getTime(),
        utc:currentdate.toUTCString()
    }
    res.send(output);
})

function format(input){
    let date = new Date(input)
    if (isNaN(date.getTime())){
        date = new Date(parseInt(input))
    }
    if (isNaN(date.getTime())){
        return {error:"Invalid Date "};
    }
    
    let output = {
        unix:date.getTime(),
        utc:date.toUTCString()
    }
    return output;

}



app.listen(3000)