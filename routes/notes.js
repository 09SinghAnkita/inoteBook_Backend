const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser')
const {body, validationResult} = require('express-validator')


//ROUTE 1 GET All the notes using : GET "/api/notes/getuser" . Login Required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try{
    const notes = await Note.find({user: req.user.id}) 
    res.json(notes)}
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//ROUTE 2 Adding a new  the notes using : POST "/api/notes/addnote" . Login Required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title with max length 3').isLength({min:3}),
    body('description',"Description atleast must be 5 letters").isLength({min:5}),
],
 async(req,res)=>{

    try{
        const {title, description, tag} = req.body;
        // If there are errors, return bad request and the errors  
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
       const savedNote = await note.save()
        res.json(savedNote)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
  
})

//ROUTE 3 Update an existing note   using : PUT "/api/notes/updatenote" . Login Required

router.put('/updatenote/:id',fetchuser,

 async(req,res)=>{

    try{
        const {title, description, tag} = req.body;
        // Create a newNote Object
        const newNote = {}
   
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if(!note){
          return  res.status(404).send("Not Found")
        }
        if(note.user.toString()!== req.user.id){
            return  res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
        res.json(note)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
  
})

//ROUTE 4 delete an existing note   using : PUT "/api/notes/deletenote" . Login Required

router.delete('/deletenote/:id',fetchuser,

 async(req,res)=>{

    try{
      
       
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if(!note){
          return  res.status(404).send("Not Found")
        }
        //Allow deleting if user owns this note
        if(note.user.toString()!== req.user.id){
            return  res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted", note:note})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
  
})

module.exports = router