import User from '../Model/UserModel.js';
import createJWToken from '../Utilities/createJWToken.js';

const Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      } 

      const user = await User.findOne({ email });
      const auth = await bcrypt.compare(password,user.password);
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }else{
        const token = createJWToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "login successfully", success: true });
       next()
      }
       
    } catch (error) {
      console.error(error);
    }
  }

export default Login;