const Post= require('../models/post');


module.exports.home = async function(req, res) {

      
            try {
                const Posts = await Post.find({}).populate('user').exec();
                return res.render('home', {
                    title: "Codeial | Home",
                    posts: Posts,
                    user: 'user'
                });
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        
        



};
