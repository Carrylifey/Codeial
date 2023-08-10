const user = require("../models/user");

/*module.exports.profile= async function(req,res){
   
    if(req.cookies.user_id){
        user.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                title:"profile",
                user: "user"
    });
                return res.redirect('/users/sign-in');
            }
        })
    }else{
        res.redirect('/users/sign-in')
    }   
};*/



module.exports.profile = async function(req, res) {
    try {
        if (req.cookies.user_id) {
            // Use await to find the user by their ID
            const loggedInUser  = await user.findById(req.cookies.user_id);

            if (loggedInUser ) {
                // Render the user profile page
                return res.render('user_profile', {
                    title: 'Profile',
                    user: loggedInUser  // Pass the actual user object
                });
            }
        }

        // Redirect to sign-in page if user is not found or no user_id cookie
        return res.redirect('/users/sign-in');
    } catch (err) {
        // Log and handle errors
        console.log('Error in fetching user profile:', err);
        return res.redirect('/users/sign-in');
    }
};



module.exports.signOut = function(req, res) {
    // Clear the user_id cookie
    res.clearCookie('user_id');

    // Redirect to the sign-in page or any other appropriate page
    return res.redirect('/users/sign-in');
};




module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title : "codeial | Sign UP "
    })
}
//render the sign in page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title : "codeial | Sign In "
    })
}

//get the signup data
// module.exports.create =function(req,res){
//     if(req.body.password!=req.body.confirm_password){
//         return res.redirect('back')       
//     }
//      user.findOne({email:req.body.email},
//         function(err,user){
//            if(err){
//             console.log('error in finding user in signing up');
//             return;
//            }               
//            if(!user){
//             user.create(req.body,function(err,user){
//                     if(err){console.log('error in creating while signing up');
//                     return;
//                 }

//                 return res.redirect('./users/sign-in')
//             });
//            }else{
//             return res.redirect('back');
//            }

            
//         })

// }


module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const newUser = await user.findOne({ email: req.body.email });

        if (!newUser) {
            const newUser = await user.create(req.body);
            return res.redirect('./sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in signing up:', err);
        return res.redirect('back');
    }
};


//signin and create a session for the user
 /* module.exports.createSession = function(req,res){
    //find the user
    user.findOne({email:req.body.email},function(err,user){
        if(err){
         console.log('error in finding user in signing up');
       return;
        }
    //handle user is found

    if(user){

            //handle password did not matched
            if(user.password !=req.body.confirm_password){

                return res.redirect('back')
            }

         //handle session creation

         res.cookie('user_id',user.id);
         return res.redirect('./users/profile');


    }else{

        //handle user is not found
        return res.redirect('back')

    }

    });

} */



module.exports.createSession = async function(req, res) {
    try {
        const sessionUser = await user.findOne({ email: req.body.email });

        if ( sessionUser.password !== req.body.password) {
            return res.redirect('back');
        }

        res.cookie('user_id', sessionUser.id);

        return res.redirect('/users/profile');
    } catch (err) {
        console.log('Error in finding user:', err);
        return res.redirect('back');
    }
};

