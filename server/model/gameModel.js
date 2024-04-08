const mongoose = require("mongoose");

const rounds = new mongoose.Schema({
  
    player1Choice:{
        type:String,
        required:true
    },
    player2Choice:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    }
});

const gameSchema = new mongoose.Schema({
    player1:{
        type:String,
        required:true
    },
    player2:{
        type:String,
        required:true
    },
    rounds:[rounds],
    winner:{
        type:String,
       
    }
},{timestamps:true});

const Game = mongoose.model('game',gameSchema);

module.exports = Game;