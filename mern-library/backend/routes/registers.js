const router = require('express').Router();
let Register = require('../models/register.model');

router.route('/').get((req,res)=>{
    Register.find()
        .then(registers=>res.json(registers))
        .catch(err => res.status(400).json('Error: ',+err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const bookname = req.body.bookname;
    const state = req.body.state;
    const date = Date.parse(req.body.date);

    const newRegister = new Register(
        {username, bookname,state,date});

        newRegister.save()
        .then(()=> res.json('Register added!'))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/:id').get((req, res) => {
    Register.findById(req.params.id)
      .then(register => res.json(register))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
    Register.findByIdAndDelete(req.params.id)
      .then(() => res.json('Register deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/update/:id').post((req, res) => {
    Register.findById(req.params.id)
      .then(register => {
        register.username = req.body.username;
        register.bookname = req.body.bookname;
        register.state = req.body.state;
        register.date = Date.parse(req.body.date);
  
        register.save()
          .then(() => res.json('Register updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;