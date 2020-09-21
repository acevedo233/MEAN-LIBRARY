const Book = require('../models/book');

const bookController = {};

bookController.getBookByTitle = async (req, res)=>{
    const books = await Book.find({title: req.body.title}).exec()
    Book.updateMany({title: req.body.title}, {$inc:{search: 1}}).exec()
    res.json({
        'books': books
    });
}

bookController.getBookByKeywords = async (req, res)=>{
    const books = await Book.find({keywords: req.body.keyword}).exec()
    Book.updateMany({keywords: req.body.keyword}, {$inc:{search: 1}}).exec()
    res.json({
        'books': books
    });
}

bookController.getBookByTopics = async (req, res)=>{
    const books = await Book.find({topics: req.body.topics}).exec()
    Book.updateMany({topics: req.body.topics}, {$inc:{search: 1}}).exec()
    res.json({
        'books': books
    });
}

bookController.getBooks = async (req, res)=> {
    const books = await Book.find().exec((err, books)=>{
        return res.status(200).send({books: books})
    })
    
};

bookController.createBook = async (req, res) =>{
    var keyword = req.body.keywords;
    var keyword = keyword.split(",");
    var topic = req.body.topics;
    var topic = topic.split(",");
    
    const book = new Book({
        author: req.body.author,
        title: req.body.title,
        edition: req.body.edition,
        keywords: keyword,
        description: req.body.description,
        topics: topic,
        copies: req.body.copies,
        available: req.body.copies
    });
    await book.save();
    res.json({
        'status': 'Book Saved'
    }); 
};

bookController.getBook = async (req, res)=>{
    const book = await Book.findById(req.params.id);
    res.json(book);
};

bookController.editBook = async (req, res) => {
    const { id } = req.params;
    const book = {
        author: req.body.author,
        title: req.body.title,
        edition: req.body.edition,
        keywords: req.body.keywords,
        description: req.body.description,
        topics: req.body.topics,
        copies: req.body.copies,
        available: req.body.available
    };
    await Book.findByIdAndUpdate(id, {$set: book}, {new: true});
    res.json({status: 'Book Updated'});
};

bookController.deleteBook = async (req, res) => {
    await Book.findByIdAndRemove(req.params.id);
    res.json({status:'Book deleted'})
};

bookController.getBookMaxLoan = async (req,res) =>{
    await Book.find().sort({loan: -1}).limit(5).exec((err, get)=>{
        if(err) console.log(err)
        res.json({
            'books': get
        })
    })
    
}

bookController.getBookMaxSearch = async (req,res) =>{
    const books = await Book.find().sort({search: -1}).limit(5).exec()
    res.json({
        'books': books
    })
}

module.exports = bookController;