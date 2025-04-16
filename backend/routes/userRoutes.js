const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update user
router.put('/:id', async(req, res)=>{
    try{
        const result = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.json(result)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})



//delete user

router.delete('/:id', async(req, res)=>{
    try{
        const result = await User.findByIdAndDelete(req.params.id)
        res?.json(result)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

module.exports = router;
