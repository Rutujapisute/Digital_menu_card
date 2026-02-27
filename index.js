var express=require('express')
var pool=require('./db')
const bodyParser = require('body-parser');
var app=express()
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // Allow specific methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specific headers
    next();
});
app.get('/',(req,res)=>{
    res.send('<h1>welcome</h1>');
})
app.get('/ab',(req,res)=>{
    res.send('<h1>about session</h1>');
})
app.get('/cont',(req,res)=>{
    res.send('<h1>welcome to contact</h1>');
})
app.get('/menu',async (req,res)=>{
    var result=await pool.query('select * from menu')
    res.json({ menu: result.rows});
})
app.get('/menucrd',async (req,res)=>{
    var result=await pool.query('select mid,mname,price,category,size from menu,food_cat,qty_mast where menu.mid=food_cat.fid and menu.mid=qty_mast.qid')
    res.json({ menu: result.rows});
})
app.get('/count',async (req,res)=>{
    var result=await pool.query('select (select count(*) from menu) as menu_count,(select count(*) from food_cat) as food_cat_count,(select count(*) from qty_mast) as qty_mast_count')
    res.json(result.rows[0]);
})
app.get('/menuById',async (req,res)=>{
    try{
    var {id}=req.body;
    var result=await pool.query('select * from menu where mid=$1',[id])
    res.json({ menu: result.rows});
   }catch(er){
   console.log(er)
}
})


app.delete('/delmenuById',async (req,res)=>{
    try{
    var {id}=req.body;
    var result=await pool.query('delete from menu where mid=$1',[id])
    res.send({status: "200 ",message: "Delete Success "})
   }catch(er){
   console.log(er)
}
})

app.post('/addmenu', async (req, res) => {
    try {
        const { mname,price,fid,qid } = req.body;
        const result = await pool.query('INSERT INTO menu (mname,price,fid,qid ) VALUES ($1, $2,$3,$4) RETURNING *',
            [mname,price,fid,qid ]);
        //res.json(result.rows);
        res.send({status: "200 ",message: "Save Success "})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



app.put('/updatemenu', async (req, res) => {
    try {
        const  {mname, price, fid, qid,id } = req.body; // Include 'id' for identifying the row to update
        const result = await pool.query(
            'UPDATE menu SET mname = $1, price = $2, fid = $3, qid = $4 WHERE mid = $5 RETURNING *',
            [ mname, price, fid, qid,id]);
        res.send({status: "200 ",message: "update Success "})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




  

app.get('/foodcat',async (req,res)=>{
    var result=await pool.query('select * from food_cat')
    res.json({ food_cat: result.rows});
})

app.post('/addfood', async (req, res) => {
    const { category } = req.body;
    const result = await pool.query('INSERT INTO food_cat (category) VALUES ($1) RETURNING *', [category]);
    res.status(200).send({ status: "200", message: "Save Success"});
});

app.get('/foodById',async(req,res)=>{
    var {id}=req.body;
    var result=await pool.query('select * from food_cat where fid=$1',[id])
    res.json({ menu: result.rows});
})

app.delete('/foodDeleteById',async(req,res)=>{
    var {id}=req.body;
    var result=await pool.query('delete from food_cat where fid=$1',[id])
    res.send({status: "200 ",message: "Delete Success "})
})

app.put('/updateFood',async(req,res)=>{
    const {id,fid,category}=req.body;
    const result=await pool.query('update food_cat set fid=$2, category=$3 where fid = $1 RETURNING *',[id,fid,category])
    res.send({status: "200 ",message: "update Success "})
})




app.get('/qty',async (req,res)=>{
    try{
    var result=await pool.query('select * from qty_mast')
    res.json({ menu: result.rows});
    }catch(Err){
        console.log(Err)
    }
})

app.get('/qtyById',async(req,res)=>{
    var {id}=req.body;
    var result=await pool.query('select * from qty_mast where qid=$1',[id])
    res.json({ menu: result.rows});
})
app.post('/addqty', async (req, res) => {
    const { qid, size } = req.body;
    const result = await pool.query('INSERT INTO qty_mast (qid,size) VALUES ($1,$2) RETURNING *', [qid,size]);
    res.status(200).send({ status: "200", message: "Save Success"});
});
app.delete('/deleteqty',async (req,res)=>{
    try{
    var {id}=req.body;
    var result=await pool.query('delete from qty_mast where qid=$1',[id])
    res.send({status: "200 ",message: "Delete Success "})
   }catch(er){
   console.log(er)
}
})

app.put('/updateqty',async(req,res)=>{
    const {qid,size}=req.body;
    const result=await pool.query('update qty_mast set size=$2 where qid = $1 RETURNING *',[qid,size])
    res.send({status: "200 ",message: "update Success "})
})
app.listen(3000, '127.0.0.2', () => {
    console.log('Listening on 127.0.0.2:3000');
  });
