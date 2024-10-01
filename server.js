// declare dependencies/variables

const express = require ('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//  connect to the database

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

// check if connection works
db.connect((err) => {
    //NO
    if(err)return console.log("error conecting the the mysql database ");
    // YES 
    console.log("connection to mysql was succesful as id: ", db.threadId)

    // your code goes here
    // get method

    app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data is a file found in the Views folder 

app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
    
});

// question 2
app.get('/providers', (req, res) => {
    const getProviders = "SELECT  first_name, last_name and provider_speciality FROM providers"
    db.query(getProviders, (err, data) => {
        if(err){
            return res.status(400).send("failed to get providers",err)
        }
        res.status(200).send(data)
    })
})
// question 3
app.get('/patients', (req, res) => {
    const getPatients = "SELECT * FROM patients ORDER BY first_name"
    db.query(getPatients, (err, data) => {
        if(err){
            return res.status(400).send("failed to get patientss",err)
        }
        res.status(200).send(data)
    })
})
// question 4
app.get('/speciality', (req, res) => {
    const getProviderspeciality = "SELECT * FROM providers ORDER BY provider_speciality"
    db.query(getProviderspeciality, (err, data) => {
        if(err){
            return res.status(400).send("failed to get provider speciality",err)
        }
        res.status(200).send(data)
    })
})
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        // send message to browser
        console.log ('sending message to browser...');
        app.get('/', (req,res) => {
            res.send('server started correctly')
        })
    });
});



