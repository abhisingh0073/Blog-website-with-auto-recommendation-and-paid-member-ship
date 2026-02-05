import crypto from "crypto";
import MembershipModel from "../models/MembershipModel.js";
import razorpay from "../config/razorpay.js";


export const verifyMembershipPayment = async (req, res) => {
console.log("VERIFY HIT:", req.body);
console.log("USER:", req.user);

  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, creatorId, month } = req.body;
    const userId = req.user._id; 

    let day;
    if(month===1) day=30;
    if(month===3) day=90;
    if(month===6) day=180;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
                              .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                              .update(body.toString())
                              .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }


    const now = new Date();

    const existing = await MembershipModel.findOne({
      user: userId,
      creator: creatorId,
    });

    

    if (existing) {

        let baseDate = existing.expiresAt > now ? existing.expiresAt : now;

        let newExpiresAt = new Date(baseDate);
        newExpiresAt.setDate(newExpiresAt.getDate() + day);

        existing.expiresAt = newExpiresAt;
        await existing.save();

        return res.status(200).json({
         message: `Membership renewed successfully for next ${month} month`,
         membership: existing,
      });
    }

   
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + day);

    const membership = await MembershipModel.create({
      user: userId,
      creator: creatorId,
      expiresAt,
    });

    return res.status(201).json({
      message: `Membership activated successfully for ${month} month`,
      membership,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};






export const createMembershipOrder = async (req, res) => {

    try{
        const { creatorId, month } = req.body;
        const userId = req.user._id;


        if (userId.toString() === creatorId.toString()) {
            console.log("you are not alloed");
          return res.status(400).json({ message: "You cannot subscribe to yourself" });
        }

        let amount;

           if(month===1) amount = 199 *100;
           else if(month===3) amount = 480 * 100;
           else if(month===6) amount = 780 * 100;
           else return res.status(500).json({message: "Something went wrong"})


        

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `membership_${Date.now()}`,
        });

        console.log(order);
        res.json({order});

    } catch(err){
        res.status(500).json({message: "Failed to create order"})
    }
}
