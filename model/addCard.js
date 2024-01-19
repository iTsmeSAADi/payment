const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const addcardSchema = new mongoose.Schema({
    card_Name: {
        type: String,
    },

    email: {
        type: String,
    },
    
    card_Number: {
        type: String,
    },
    card_CVC: {
        type: String,
    },
    card_ExpYear: {
        type: String,

    },
    card_ExpMonth: {
        type: String,

    },
    amount : {
        type: String,

    },

})

// module.exports = mongoose.model('addCard', addcardSchema);
const AddCard = mongoose.model('addCard', addcardSchema);
module.exports = AddCard;
// console.log(AddCard);