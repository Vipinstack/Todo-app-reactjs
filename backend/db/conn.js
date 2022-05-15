
const mongoose= require('mongoose');
const db= process.env.DATABASE;

//DB connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () =>{
    console.log(`connection succ....`);
}).catch( () =>{
        console.log(`no connection...`);
})