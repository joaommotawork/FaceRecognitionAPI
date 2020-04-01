const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'johnymoty',
		password: '',
		database: 'facerecognition'
	}
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signIn', signIn.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

app.post('/imageURL', image.handleApiCall())

const PORT = process.env.PORT

app.listen( PORT, () => {
    console.log(`App Running on Port ${PORT}`)
})