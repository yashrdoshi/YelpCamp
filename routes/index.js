var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

//root route
router.get("/",(req,res)=>{
    res.render("landing");
});

//show the register form
router.get("/register",function(req,res){
    res.render("register");
});

//handle sign up logic
router.post("/register",function(req,res){
    var newUser = new User({username : req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log("IN");
            console.log(err);
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login",function(req,res){
    res.render("login");
});
//handle login
router.post("/login",passport.authenticate("local",{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}),function(req,res){
});

//logout 
router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","Logged Out");
    res.redirect("/campgrounds");
});

module.exports = router;
