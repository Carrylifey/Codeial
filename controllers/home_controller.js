const Post= require('../models/post');


module.exports.home = async function(req, res) {

      
            try {
                const Posts = await Post.find({}).populate('user').populate({
                    path:'comments',
                    populate :{
                        path :'user',
                        
                    },
                })
                return res.render('home', {
                    title: "Codeial | Home",
                    posts: Posts,
                    
                });
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        
        



};
