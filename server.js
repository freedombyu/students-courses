const express = require('express')
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const pssport = require('passport')
const session = require('express-session')
const GitHubstrategy = require('passport-github2').strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(session({secret: "sectret", resave: false, saveUninitialized: true, 

}))
// This is the basic espress session({..}) initialization.
.use(passport.initialize())
// init passport on every route call.
.use(passport.session())
// allow passport to use "express-session".
.use((req, res, next) => {
    res.setHeader("Access-controll-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization");
    req.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE");
    next();
})
app.use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(cors({ origin: '*'}))
app.use("/", require("./routes"));

passport.use(new GitHubstrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refeshToken, profile, done) {
    //User.findOrCreate({ hithubis: profile.id }, function (err, user){
    return done(null, profile);
    //});
}
));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? 'Logged in as ${req.session.user.displayName}' : "Logged out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });
 
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
       app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});

