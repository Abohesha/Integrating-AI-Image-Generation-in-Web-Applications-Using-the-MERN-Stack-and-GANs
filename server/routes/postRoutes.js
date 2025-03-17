import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error fetching posts. Please try again later.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    return res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error creating post. Please try again later.' });
  }
});

export default router;
