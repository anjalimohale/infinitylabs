var express=require('express');
var app=express();
var mongoClienct=require('mongodb').MongoClient;
var cors=require('cors');
var ObjectID=require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var obj1={};
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
var dbs=null;

mongoClienct.connect("mongodb://127.0.0.1:27017",function(err,conn){
    if(conn) {
        console.log('connected');
        dbs=conn.db('property');
    }
});

app.post('/property/add',function(req,res){
        console.log("save Data",req.body);
        dbs.collection('property').save(req.body)
           
        res.send({'saved':'sucessfully'})
                });
    
 app.get('/getlist',function(req,res){
     console.log("as");
                    dbs.collection('property').find().toArray((error,data)=>{
                            console.log(data);
                        res.send(data)
                    })
                });
    // res.send({'property details':sucessfully})
    //         });			

        
 
    // app.post('/user/login',function(req,res){
    //     console.log(req.body);
    // var result=dbs.collection('admin').find({username:req.body.username,password:parseInt(req.body.password)});
    //  result.toArray(function(err,result1){
    //      if(err){ }
    //          //  res.send({'status':'valid'});
        
    
    //     else
    //      {
    //          if(result1.length)
    //          {
    //             res.send({'status':'valid'});
    //          }
    //          else
    //             res.send({'status':'invalid'});
    //         }
        
    //       });             
    //     });

app.listen(4001,function(){
    console.log('server started at 4001');
});
