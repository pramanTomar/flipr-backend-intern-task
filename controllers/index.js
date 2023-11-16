import Customer from '../models/customer.js';

export const addCustomer = async () => {
    try {
        // const { email, password, firstName, lastName, generatedOtp, enteredOtp } = req.body;

        // if (!email || !password || !firstName || !lastName || !enteredOtp) {
        //     res.send(error(400, "All fields are required"));
        // }

        // const existing_user = await user.findOne({ email });
        // if (existing_user) {
        //     res.send(error(409, "User already exist!!"))
        //     return;
        //     // res.status(409).send("!! User already exists !!");
        // }
        // if (enteredOtp != generatedOtp) {
        //     res.send(error(203, "Wrong OTP"));
        //     return;
        // }
        // const hashedpassword = await bcrypt.hash(password, 10);
        // const User = await user.create({
        //     firstName,
        //     lastName,
        //     email,
        //     password: hashedpassword
        // })
        // await User.save();
        // // return res.status(201).json({
        // //     User,
        // // })
        // return res.send(success(201, { User }))
    } catch (error) {
        console.log(error);
    }
}