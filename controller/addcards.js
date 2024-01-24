const customers = require('../model/addCard');
const { PUBLISHABLE_KEY, SECRET_KEY } = process.env;

const stripe = require('stripe')(SECRET_KEY)

const createCustomer = async(req,res)=>{

    try {
        const customer = await stripe.customers.create({
          name:req.body.name,
            email:req.body.email, 
        });
        const customerId = customer.id;
        console.log("=====>>>", customerId);
        const {
          card_Name,
          card_ExpYear,
          card_ExpMonth,
          card_Number,
          card_CVC,
        } = req.body;

        const card_token = await stripe.tokens.create({
          card: {
            name: card_Name,
            number: card_Number,
            exp_year: card_ExpYear,
            exp_month: card_ExpMonth,
            cvc: card_CVC,
          },
        });
        console.log("card_token", card_token);


        const card = await stripe.customers.createSource(customerId, {
          source: `${card_token.id}`,
        });

        console.log(card_token);
       
        const cardId = card.id
    

        const createCharge = await stripe.charges.create({
          receipt_email: 'tester@gmail.com',
          amount: parseInt(req.body.amount) * 100, // amount*100
          currency: 'usd',
          card: cardId,
          customer: customerId,
        });
    
        // // Save the amount to MongoDB
        // const newCharge = new customers({
        //   amount: req.body.amount,
        // });
        const _id = createCharge.id;
          console.log(_id);
        res.status(200).send({ _id:_id });

    } catch (error) {
        res.status(400).send({success:false,_id:null});
    }

}

const addNewCard = async (req, res) => {
  try {
    const {
      
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
    } = req.body;

    const card_token = await stripe.tokens.create({
      card: {
        name: card_Name,
        number: card_Number,
        exp_year: card_ExpYear,
        exp_month: card_ExpMonth,
        cvc: card_CVC,
      },
    });

    const card = await stripe.customers.createSource(customer_id, {
      source: `${card_token.id}`,
    });

    // Save the card details to MongoDB
    const newCard = new customers({
      customerId: customer_id,
      cardId: card.id,
      cardName: card_Name,
      cardExpYear: card_ExpYear,
      cardExpMonth: card_ExpMonth,
      cardNumber: card_Number,
      cardCVC: card_CVC,
    });

    const createCharge = await stripe.charges.create({
      receipt_email: 'tester@gmail.com',
      amount: parseInt(req.body.amount) * 100, // amount*100
      currency: 'usd',
      card: req.body.card_id,
      customer: req.body.customer_id,
    });

    // Save the amount to MongoDB
    const newCharge = new customers({
      amount: req.body.amount,
    });

    await newCard.save();

    res.status(200).send({ card: card.id });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};


const createCharges = async (req, res) => {
  try {
    const createCharge = await stripe.charges.create({
      receipt_email: 'tester@gmail.com',
      amount: parseInt(req.body.amount) * 100, // amount*100
      currency: 'usd',
      card: req.body.card_id,
      customer: req.body.customer_id,
    });

    // Save the amount to MongoDB
    const newCharge = new customers({
      amount: req.body.amount,
    });

    await newCharge.save();

    res.status(200).send(createCharge);
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};



module.exports = {
    createCustomer,
    addNewCard,
    createCharges
}