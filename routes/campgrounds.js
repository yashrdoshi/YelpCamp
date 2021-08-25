var express     = require("express"),
    router      = express.Router();
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");
 
//INDEX ROUTE
router.get("/",(req,res)=>{
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
});

//CREATE ROUTE
router.post("/",middleware.isLoggedIn,(req,res)=>{
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name:name,price:price,image:image,description:description,author:author};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            // console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//NEW ROUTE
router.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id",(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground Not Found");
            res.redirect("back");
        }else{
            res.render("campgrounds/show",{campground : foundCampground});
        }
    });
});

//Edit Route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
    });
});

//Update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

//Destroy campground
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
