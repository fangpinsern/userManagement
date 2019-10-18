var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();
var db = mongojs('mongodb://localhost:27017/userData', ['userData']);

router.get('/info', function(req, res, next){
    db.userData.find(function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
    });
});

router.get('/info/:id', function(req, res, next){
    db.userData.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
    })
})

router.post('/info', function(req, res, next){
    info = req.body;
    console.log(info)
    a = db.userData.findOne({email: info.email}, function(err, result){
        if(err){
            res.send(err);
            return;
        } 
        if (result) {
            res.status(400);
            res.json({
                "error": "Duplicate Data"
            });
        } else {
            db.userData.save(info, function(err, info){
                if(err){
                    res.send(err);
                }
                res.json(info);
            })
        }
    })
    console.log(a);
    // if(a){
    //     db.userData.save(info, function(err, info){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(info);})
    // } else {
    //     res.status(400);
    //     res.json({
    //         "error": "Duplicate Data"
    //     });
    // }
})

router.delete('/info/:id', function(req, res, next) {
    db.userData.remove({_id: mongojs.ObjectID(req.params.id)}, function(err, info){
        if (err) {
            res.send(err);
        }
        res.json(info);
    })
})

module.exports = router;