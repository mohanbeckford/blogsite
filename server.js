// Dependencies
const express = require("express");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const controllers = require("./controllers");
const helpers = require("./utils/helpers");



// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3003;

// Set up sessions
const sess = {
    secret: "My$ecr3tSess10nK3yF0rBl0gApp!",
    cookie: {
        maxAge: 60000, // 1 Minutes
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));


const handlebars = expressHandlebars.create({helpers,
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
});

//setup handlebars with express

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//allow api to use json and url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set public folder
app.use(express.static(path.join(__dirname, "public")));

// Sets up the routes
app.use(controllers);


// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening: " + PORT));
});

