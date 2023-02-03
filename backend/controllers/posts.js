
const Post = require('../models/post');

exports.createPost = async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId,
    });

    const createdPost = await post.save();
    if (createdPost) {

        res.status(201).json({
            message: 'Post added successfully',
            post: {
                ...createdPost,
                id: createdPost._id,

            }
        })
    } else {
        res.json(500).json({
            message: 'creating a post failed!'
        });
    }
};

exports.updatePosts = async (req, res, next) => {

    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    })
    const updatedPost = await Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post);

    if (updatedPost) {

        if (updatedPost.matchedCount > 0) {
            res.status(200).json({
                message: 'Post updated successfully',
                postId: updatedPost._id
            });
        } else {
            res.status(401).json({
                message: 'User Not Authorized',
            });
        }
    } else {
        res.status(500).json({
            message: 'Couldnot update post'
        })
    }

};

exports.getPosts = async (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);

    }
    const posts = await postQuery;
    const count = await Post.count();
    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
        maxPosts: count
    });
};

exports.getPost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({
            message: "Post not found",
        });
    }
};

exports.deletePost = async (req, res, next) => {
    const post = await Post.deleteOne({
        _id: req.params.id, creator: req.userData.userId
    });

    if (post.deletedCount > 0) {
        res.status(200).json({
            message: 'Post deleted successfully',
            postId: post._id
        });
    } else {
        res.status(401).json({
            message: 'User Not Authorized',
        });
    }
}