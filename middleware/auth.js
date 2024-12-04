const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
  try {
    // Postman->Headers->Authorization->token->without a space we get hashed id
    let token = req.headers.authorization?.split(" ")[1];
    //decoding token - hashed id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    //if you found a user - add him
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "not authorized" });
  }
};

module.exports = {
  auth,
};
