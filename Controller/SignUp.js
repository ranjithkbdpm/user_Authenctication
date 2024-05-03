import User from '../Model/UserModel.js';
import createJWToken from '../Utilities/createJWToken.js';


const SignUp = async (req, res, next) => {
  try {
    //getting request from port listening
    const { email, password, username, createdAt } = req.body;
    //checking email and username already exist in the collection
    const existingUser = await User.findOne({ $or: [{ email },{username}]});
    //if yes, send msg user exist,  if no create user
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }   
    else {
      const user = await User.create({ email, password, username, createdAt });
      //creating jwt token with userid
      const token = createJWToken(user._id);
      res.cookie("token", token, { withCredentials: true, httpOnly: false, });
      res.status(201)
      res.json({ message: "User created successfully", success: true, user });
      next();
    }
  } catch (err) {
    console.error(err);
  }
};

export default SignUp;