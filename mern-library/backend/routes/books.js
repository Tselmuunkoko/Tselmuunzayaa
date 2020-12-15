const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req,res)=>{
    Book.find()
        .then(books=>res.json(books))
        .catch(err => res.status(400).json('Error: ',+err));
});
router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
      .then(book => res.json(book))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/add').post((req,res)=>{
    const bookname = req.body.bookname;
    const imgurl = req.body.imgUrl;

    const newBook = new Book({bookname,imgurl});

    newBook.save()
        .then(()=> res.json('Book added!'))
        .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;