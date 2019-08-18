// changes not commited
const express    = require('express');
const connection = require('./mongo_connect');
const bodyParser = require('body-parser');
const jwt        = require('jsonwebtoken');
// const bcrypt     = require('bcrypt');
// const ObjectID   = require('mongodb').ObjectID;
const secret     = require('./secret_config');
let   router     = express.Router();
let   db         = null;
// var multer       = require('multer')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, __dirname+'/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()+'-'+file.originalname)
//     }
//   })

//   var upload = multer({ storage: storage })

let   dbname = 'revizor'
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

router.use(allowCrossDomain)
router.use(async (req, res, next) => {
    db =  await new connection;
    next();
});

router.post('/login/admin', async (req,res) => {
    try {
        let admin = {role:'admin', password: '123', login: '123' }
        if(req.body.login == admin.login && req.body.password == admin.password){
            let token =  await jwt.sign({user: admin}, secret.secret);
            res.send({token: token, user: admin})
        } else {
            res.status(403).send('Invalid credentials')
        }
    } catch(err) {
        res.status(500).send('Internal error :((')
        throw err
    }
    
})


router.post('/login/user', async (req,res) => {
    try {
        let dbase     = await db.db(dbname)
        let companies = await dbase.collection('companies')
        let user      = await companies.findOne({login: req.body.login})
        if(!user) {
            res.status(400).send('No such user, bro')
            return;
        }
        if(req.body.login == user.login && req.body.password == user.password){
            let token =  await jwt.sign({user: user}, secret.secret);
            res.send({token: token, user: admin})
        } else {
            res.status(403).send('Invalid credentials')
        }
    } catch(err) {
        res.status(500).send('Internal error :((')
        throw err
    }
})

router.get('/get/companies', async (req, res) => {
    try {
        let dbase  = await db.db(dbname)
        let companies = await dbase.collection('companies')
        let all_companies = await companies.find({}).toArray()
        console.log(all_companies)
        res.send(all_companies)

    } catch (err){
        res.status.send(err)
        throw err;
    }
})


router.get('/get/answers/:id', async (req, res) => {
    try { 
        let dbase = await db.db(dbname)
        let answers = dbase.collection('answers')
        let all_answers = await answers.find({company_id: req.params.id, }).toArray()

        res.send(all_answers) 
    } catch(err) {
        res.status(500).send(err)
        throw err
    }
})

router.post('/post/answer/:id', async (req, res) => {
    try {
        let dbase   = await db.db(dbname)
        let answers = await dbase.collection('answers')
        // let date = new Date().getTime()
        // date = date - 4*84600000
        let result  = await answers.insertOne( {
            company_id: req.params.id,
            date: new Date().getTime(),
            ...req.body
        })
        res.send(result)
    } catch(err) {
        res.status(500).send('Internal error :((')
        throw err;
    }
})

router.post('/post/company', async (req, res) => {
    try {
        let dbase  = await db.db(dbname)
        let companies = await dbase.collection('companies')
        let inserted = companies.insertOne({
            ...req.body
        })
        
        res.send(inserted)
    } catch(err) {
        res.status(500).send('Internal error :((')
        throw err;
    }
})

module.exports = router;