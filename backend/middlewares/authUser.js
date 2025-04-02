import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
  try {
    // console.log("req header: ", req.headers);
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorised Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode);
    req.userId = token_decode.id;
    const {userId} = req;
    console.log(userId);
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default authUser;
