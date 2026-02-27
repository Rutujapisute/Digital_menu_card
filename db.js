const pg=require('pg')
const pool=new pg.Pool({
    user:'postgres',
    host: 'localhost',
    database: 'menu',
    password: 'Rutu@2006',
    port: 5432
});
module.exports=pool;



