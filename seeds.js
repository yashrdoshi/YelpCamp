var mongoose    = require("mongoose"),
    Comment     = require("./models/comment"),
    Campground  = require("./models/campground");
var data = [
    {
        name : "Mahabaleshwar",
        image : "https://images.unsplash.com/photo-1565944681586-30a85b569e46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtcHMlMjB0ZW50c3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description : "Mahabaleshwar is a hill station in India's forested Western Ghats range, south of Mumbai. It features several elevated viewing points, such as Arthur’s Seat. West of here is centuries-old Pratapgad Fort, perched atop a mountain spur. East, Lingmala Waterfall tumbles off a sheer cliff. Colorful boats dot Venna Lake, while 5 rivers meet at Panch Ganga Temple to the north.",
    },
    {
        name : "Pavagadh Hills",
        image : "https://images.unsplash.com/photo-1605710508076-a370542d01ab?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcHMlMjB0ZW50JTIwbW91bnRhaW5zfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description : "Pavagadh Hill is situated within a plain in Panchmahal district, Gujarat, western India. A volcanic eruption occurred in the region approximately 500 million years ago and the etymology of Pavagadh is associated with this eruption: Pav-gadh means one fourth hill or fire-hill",
    },
    {
        name : "Nandi Hills",
        image : "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FtcHMlMjB0ZW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description : "Nandi Hills, or Nandidurg, is a hill fortress in the south Indian state of Karnataka. Tipu Sultan Fort, a summer retreat of the namesake 18th-century ruler, features stone carvings and wall paintings. Prisoners are said to have been thrown to their death from Tipu’s Drop, now known for its panoramic views. Local Hindu temples include the hilltop Yoga Nandeeshwara Temple, guarded by a huge statue of a bull (nandi).",
    },
]
function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed All Campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a Campground");
                    //Create a comment
                    Comment.create({
                        text : "Maja avi gai...",
                        author : "Adani",
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new Comment");
                        }

                    });
                }
            });
        });
    });
}

module.exports = seedDB;