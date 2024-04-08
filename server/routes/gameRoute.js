const router = require('express').Router();
const Game = require('../model/gameModel')

router.get('/',(req,res)=>{
    res.send("game route is working...")
});

router.post('/',async(req,res)=>{
    try {
        const{player1,player2,rounds,winner} = req.body;
        const data = await Game.create({
            player1,
            player2,
            rounds,
            winner
        });
        if(data){
            res.send({msg:"created successFully"})
        }
    } catch (error) {
        console.log(error.message)
    }
});
router.get('/data',async(req,res)=>{
    try {
        const data = await Game.find();
        res.send(data);
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router;