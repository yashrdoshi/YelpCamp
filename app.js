var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    mongoose        = require("mongoose");

//requiring routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

var dburl = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(connect => console.log('Connected to mongodb..'))
        .catch(e => console.log('Could NOT connect to mongodb', e));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//Passport Confriguration
app.use(require("express-session")({
    secret: "Ambani and Adani",
    resave : false,
    saveUninitialized : false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port,process.env.IP, function(req,res){
    console.log("YelpCamp Server Started. ==>   Go to  http://localhost:3000");
});