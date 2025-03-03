const express=require('express');
const router=express.Router();
const Item=require('./model/items');


router.post('/items',(req,res)=>{
    const {name}=req.body;
    
    const newItem=new Item({name});

    newItem.save()
    .then(()=>{

        res.status(201).json({ message: 'Item created successfully',item: newItem });
    })
    .catch((error)=>{
        res.status(500).json({ message: 'Error creating item',error});
        
    });
    
    
});
router.get('/items',(req,res)=>{
    Item.find()
    .then((items)=>{
        res.status(200).json({ message: 'Items retrieved successfully',items });
    })
    .catch((error)=>{
        res.status(500).json({ message: 'Error retrieving items',error });
    });
    
});

router.get('/items/:id',(req,res)=>{
    const {id}=req.params;
    Item.findById(id)
    .then((item)=>{
        if(!item){
            return res.status(404).json({ message: `Item with ID ${id} not found` });
        }
        res.status(200).json({ message: `Item ${id} retrieved successfully` ,item});

    })
    .catch((error)=>{
        res.status(500).json({ message: 'Error retrieving item',error });
    });
    
});

router.put('/items/:id',(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    Item.findByIdAndUpdate(id, { name}, { new: true })
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found` });
            }
            res.status(200).json({ message: `Item ${id} updated successfully`, item });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error updating item', error });
        });

});

router.delete('/items/:id',(req,res)=>{
    const {id}=req.params;
    Item.findByIdAndDelete(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found` });
            }
            res.status(200).json({ message: `Item ${id} deleted successfully` });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting item', error: error.message });
        });
   
});



module.exports=router;