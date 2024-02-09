const UserSchema = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');

const SignUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } =
    req.body;

  try {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let avatar = ""; 

    if (req.file) {
      avatar = req.file.filename;
    }
    const hashPassword = await bcrypt.hashSync(password,10)
    const newUser = new UserSchema({
      firstName,
      lastName,
      email,
      password:hashPassword,
      confirmPassword:hashPassword,
      role,
      avatar: avatar,
    });

    await newUser.save();
    return res.status(200).json({ message: "User Created Successfully!" ,newUser});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({ error: "Email And Password Required" });
    }

    const user = await UserSchema.findOne({ email });
    if (user) {
        const matchPassword = await bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        const { password, confirmPassword, ...info } = user._doc;
        const filteredInfo = {
          _id: info._id,
          firstName: info.firstName,
          lastName: info.lastName,
          email: info.email,
          avatar: info.avatar,
          role: info.role,
          createdAt: info.createdAt,
          updatedAt: info.updatedAt,
        };
        return res.cookie("token", token).status(200).json({ token, info: { ...filteredInfo } });
      } else {
        return res.status(400).json({ error: "Email Or Password Error" });
      }
    } else {
      return res.status(404).json({ error: "Email Not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const LogOut = (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "None", secure: true });
    res.status(200).json("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  SignUp,
  SignIn,
  LogOut,
};
