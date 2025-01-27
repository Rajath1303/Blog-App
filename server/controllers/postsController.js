const Post = require("../models/postModel");
const User = require("../models/userModel");
const HttpError = require("../models/errorModle");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { log } = require("console");

const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return next(new HttpError("Fill in all the details"), 422);
    }
    const { thumbnail } = req.files;
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbail too big. File should be less than 2MB")
      );
    }
    let filename = thumbnail.name;
    let splitted = filename.split(".");
    let newFileName =
      splitted[0] + uuid() + "." + splitted[splitted.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFileName,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created"), 422);
          }
          const curr = await User.findById(req.user.id);
          const userPostCount = curr.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError(error));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};
const getCatPost = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPost = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPost);
  } catch (error) {
    return next(new HttpError(error));
  }
};
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};
const editPosts = async (req, res, next) => {
  try {
    let filename;
    let newFileName;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description } = req.body;
    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all the details"), 422);
    }
    if (!req.files) {
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else {
      const post = await Post.findById(postId);
      fs.unlink(
        path.join(__dirname, "..", "/uploads", post.thumbnail),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        }
      );
      const { thumbnail } = req.files;
      if (thumbnail.size > 2000000) {
        return next(new HttpError("Image size should be less than 2MB"), 422);
      }
      filename = thumbnail.name;
      let splitted = filename.split(".");
      newFileName = splitted[0] + uuid() + "." + splitted[splitted.length - 1];
      thumbnail.mv(
        path.join(__dirname, "..", "/uploads", newFileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
          updatedPost = await Post.findByIdAndUpdate(postId, {
            title,
            category,
            description,
            thumbnail: newFileName,
          });
          res.status(200).json(updatedPost);
          if (!updatedPost) {
            return next(new HttpError("Couldn't Update the post"),422);
          }
        }
      );
    }
    
  } catch (error) {
    return next(new HttpError(error));
  }
};
const deletePosts = async (req, res, next) => {
  try {
    const postId= req.params.id
    if(!postId){
        return next(new HttpError("Post Unavailable", 400))
    }
    const postcurr= await Post.findById(postId)
    if (!postcurr) {
        return next(new HttpError("Post not found", 404));
    }
    const filename= postcurr.thumbnail
    if(req.user.id==postcurr.creator){

        fs.unlink(path.join(__dirname,"..","uploads",filename), async (err)=>{
            if(err){
                return next(new HttpError(err))
            }else{
                await Post.findByIdAndDelete(postId)
                const user= await User.findById(req.user.id)
                const postcount=user?.posts-1
                await User.findByIdAndUpdate(req.user.id,{posts:postcount})
            }
            res.status(200).json(postcurr)
        })
    }else{
        return next(new HttpError("Post couldn't be deleted"))
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};
module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPost,
  getUserPosts,
  editPosts,
  deletePosts,
};
