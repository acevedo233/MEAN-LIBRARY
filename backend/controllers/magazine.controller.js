const Magazine = require('../models/magazine');

const magazineController = {};

magazineController.getMagazine = async (req, res)=> {
    const magazine = await Magazine.find().exec((err, magazine)=>{
        return res.status(200).send({magazine: magazine})
    })
    
};

magazineController.getMagazineByTitle = async (req, res)=>{
    const magazines = await Magazine.find({title: req.body.title}).exec()
    Magazine.updateMany({title: req.body.title}, {$inc:{search: 1}}).exec()
    res.json({
        'magazines': magazines
    });
}

magazineController.getMagazineByKeywords = async (req, res)=>{
    const magazines = await Magazine.find({keywords: req.body.keyword}).exec()
    Magazine.updateMany({keywords: req.body.keyword}, {$inc:{search: 1}}).exec()
    res.json({
        'magazines': magazines
    });
}

magazineController.getMagazineByTopics = async (req, res)=>{
    const magazines = await Magazine.find({topics: req.body.topics}).exec()
    Magazine.updateMany({topics: req.body.topics}, {$inc:{search: 1}}).exec()
    res.json({
        'magazines': magazines
    });
}

magazineController.createMagazine = async (req, res) =>{
    var keyword = req.body.keywords;
    var keyword = keyword.split(",");
    var topic = req.body.topics;
    var topic = topic.split(",");
    
    const magazine = new Magazine({
        author: req.body.author,
        title: req.body.title,
        edition: req.body.edition,
        description: req.body.description,
        frequency: req.body.frequency,
        copy: req.body.copy,
        topics: topic,
        keywords: keyword,
        copies: req.body.copies,
        available: req.body.copies
    });
    await magazine.save();
    res.json({
        'status': 'Magazine Saved'
    }); 
};

magazineController.getJournal = async (req, res)=>{
    const magazine = await Magazine.findById(req.params.id);
    res.json(magazine);
};

magazineController.editMagazine = async (req, res) => {
    const { id } = req.params;
    const magazine = {
        author: req.body.author,
        title: req.body.title,
        edition: req.body.edition,
        description: req.body.description,
        frequency: req.body.frequency,
        copy: req.body.copy,
        topics: req.body.topics,
        keywords: req.body.keywords,
        copies: req.body.copies,
        available: req.body.copies
    };
    await Magazine.findByIdAndUpdate(id, {$set: magazine}, {new: true});
    res.json({status: 'Magazine Updated'});
};

magazineController.deleteMagazine = async (req, res) => {
    await Magazine.findByIdAndRemove(req.params.id);
    res.json({status:'Magazine deleted'})
}; 

magazineController.getMagazineMaxLoan = async (req,res) =>{
    await Magazine.find().sort({loan: -1}).limit(5).exec((err, get)=>{
        if(err) console.log(err)
        res.json({
            'magazines': get
        })
    })
    
}

magazineController.getMagazineMaxSearch = async (req,res) =>{
    const magazines = await Magazine.find().sort({search: -1}).limit(5).exec()
    res.json({
        'magazines': magazines
    })
}
module.exports = magazineController;