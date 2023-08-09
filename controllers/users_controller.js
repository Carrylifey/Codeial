const user = require("../models/user");

module.exports.profile=function(req,res){
    // res.end ('<h1>user profile</h1>')
    return res.render('user_profile',{
        title:"profile"
    });
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
//        
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


module.exports.createSession = function(req,res){
    //todolater
}

