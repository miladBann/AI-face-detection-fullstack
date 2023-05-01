const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'milo',
      database : 'smart_brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('hi');
})


app.post('/signin', (req, res) => {
    const {email , password} = req.body;
    // checking for bad input, full explanation in the register func down
    if (!email || !password)
    {
        return res.json("bad input");
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid)
        {
            return db.select("*").from("users")
            .where("email", "=", email)
            .then(user => {
                res.json("welcome")
            })
            .catch(err => res.status(400).json("unable to get user"))
        } else {
            res.status(400).json("wrong credentials")
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password} = req.body;

    //checking if any of the fields is empty and stopping the 
    //register process if it happens
    //if everything is ok the code will continue and it will respond with the user object
    //witch in the frontend at register.js on the submit func we will check if the user that 
    //was returned has an id so user.id so it will pass. else the response will be bad input 
    //witch doesn't have an id.
    if (!name || !email || !password)
    {
        return res.json("bad input");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);

    //transcation in a database ensures consistancy
    //so if one operation fails the rest will also fail
    //and only when everything is a success it will update the tables
    // we use the trx object instead of the db 
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0]['email'],
                name: name,
                joined: new Date()
            }).then((user) => res.json(user[0]))
            
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("unable to register")) 
})

//this is not being used (maybe in future updates)
//its an example of how we can grab a user profile from his id in the database
/*
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    
    db.select('*').from('users').where({id: id})
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
})
*/

/*
//this is not being used (maybe in future updates)
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })

    if (found == false)
    {
        res.json("no such user");
    }
})

*/

app.listen(3001, () => {
    console.log("app is running on port 3001");
})