const Operation = require('../models/Operations');


const Magazine = require('../models/magazine');
const book = require('../models/book');

const OperationController = {};

OperationController.addOperationBook = async (req, res) =>{
    const limit = await Operation.find({return: false,user_id: req.body.userId}).exec()
    if(limit.length < 10){
        const oparation = new Operation({
            date: Date.now(),
            book_id: req.body.book,
            book: true,
            magazine: false,
            return: false,
            user_id: req.body.userId
        });
        await oparation.save((err, addOperation)=>{
            if(err){
                res.json({
                    'status': 'No Saved'
                });
            }else if(addOperation){
                book.findByIdAndUpdate(addOperation.book_id, {$inc:{loan: 1, available: -1}}).exec();
            }
        });
        res.json({
            'status': 'Loan Saved'
        });
    }else{
        return res.status(404).send({message: 'limit reached'})
    }
};

OperationController.addOperationMagazine = async (req, res) =>{
    const limit = await Operation.find({return: false,user_id: req.body.userId}).exec()
    if(limit.length < 10){
        const oparation = new Operation({
            date: Date.now(),
            magazine_id: req.body.magazine,
            book: false,
            magazine: true,
            return: false,
            user_id: req.body.userId
        });
        await oparation.save((err, addOperation)=>{
            if(err){
                res.json({
                    'status': 'No Saved'
                });
            }else if(addOperation){
                Magazine.findByIdAndUpdate(addOperation.magazine_id, {$inc:{loan: 1, available: -1}}).exec();
            }
        });
        res.json({
            'status': 'Loan Saved'
        });
    }else{
        return res.status(404).send({message: 'limit reached'})
    }
    
};

OperationController.getLoan = async (req,res)=>{
    console.log( req.body.userId)
    const loans = await Operation.find({return: false, user_id: req.body.userId}).exec();
    console.log(loans)
    book.populate(loans, {path: 'book_id'}, (err, books)=>{
        if(err) console.log(err)
        Magazine.populate(books, {path: 'magazine_id'}, (err, magazines)=>{
            if(err) console.log(err)
            res.json({
                'loans': magazines
            })
        })
    })
    
}

OperationController.return = async (req, res)=>{
    const returns = await Operation.findByIdAndUpdate(req.body.id, {return: true, return_date: Date.now()}).exec()
    if(returns.book){
        book.findByIdAndUpdate(returns.book_id, {$inc:{available: 1}}).exec()
    }else if(returns.magazine){
        Magazine.findByIdAndUpdate(returns.magazine_id, {$inc:{available: 1}}).exec()
    }
    res.json({
        'message': 'Return Save'
    })
}
module.exports = OperationController;