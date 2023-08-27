const Comment = require('../models/comment')
const Post=require('../models/post');


module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post); // Using await and async

        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            return res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('back');
    }
};
