const mongoose= require('mongoose');

main().catch(err => console.log(err));


async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/codeial');
};

const db=mongoose.connection;

db.on ('error',console.error.bind(console,"error connecting on DB"));

db.once('open',function(){
    console.log('conncted to database::mongodb')
});

module.exports = db;