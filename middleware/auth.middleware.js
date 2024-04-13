const JWT = require("jsonwebtoken");
const createError = require("../utils/error");
const Student = require("../Schema/Student");
const Faculty = require("../Schema/Faculty");
const Chat = require("../Schema/chat.schema");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  try {
    const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);
    // console.log("===>>", decodedJwtPayload.id);
    req.user = await Student.findById(decodedJwtPayload.id, "name email role");
    // console.log(req.user);
    next();
  } catch (error) {
    return next(createError(401, "You are not authenticated"));
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      // if (req.user.isAdmin) {
      //   console.log(req.user);
      //   console.log("You are admin");
      //   next();
      // } else {
      //   console.log("You are not an authentic User");
      //   return next(createError(403, "You are not authorized"));
      // }
      console.log(req.user);
    });
  } catch (error) {
    next(error);
  }
};

const checkFaculty = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    // console.log(token);

    if (!token) {
      return next(createError(401, "You are not authenticated"));
    }

    try {
      const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);
      // console.log("===>>", decodedJwtPayload.id);
      req.user = await Faculty.findById(
        decodedJwtPayload.id,
        "name email role"
      );
      // console.log(req.user);

      if (
        req.user &&
        (req.user.role === "Faculty" || req.user.role === "Admin")
      ) {
        console.log("You are Faculty");
        next();
      } else {
        console.log("You are not an authentic User");
        return next(createError(403, "You are not authorized"));
      }
    } catch (error) {
      return next(createError(401, "You are not authenticated"));
    }
  } catch (error) {
    next(error);
  }
};
const findUserByRole = async (roleId, decodedJwtPayload) => {
  let user;
  switch (roleId) {
    case "student":
      user = await Student.findById(decodedJwtPayload.id, "name email role");
      break;
    case "faculty":
      user = await Faculty.findById(decodedJwtPayload.id, "name email role");
      break;
    // Add more cases for other roles if needed
    default:
      // Handle unknown roles
      throw new Error("Unknown user role");
  }
  return user;
};

const checkChatSender = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, "You are not authenticated"));
    }

    try {
      const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);

      // Determine the user's role from the decoded JWT payload
      const userRole = decodedJwtPayload.role;

      // Find the user based on their role
      req.user = await findUserByRole(userRole, decodedJwtPayload);

      // Check if user is authorized
      if (!req.user) {
        return next(createError(401, "You are not authenticated"));
      }

      // Check if user is a Faculty, Student, or Admin
      if (userRole === "faculty" || userRole === "admin") {
        // Get the chat ID from the request parameters
        const chatId = req.params.chatId;

        // Retrieve the chat from the database
        const chat = await Chat.findById(chatId);

        // Check if chat exists
        if (!chat) {
          return next(createError(404, "Chat not found"));
        }

        // Check if the authenticated user's email matches the senderEmail of the chat
        if (req.user.email !== chat.senderEmail) {
          return next(
            createError(403, "You are not authorized to delete this chat")
          );
        }

        // If user is authorized, proceed to the next middleware or route handler
        next();
      } else {
        console.log("You are not an authentic User");
        return next(createError(403, "You are not authorized"));
      }
    } catch (error) {
      return next(createError(401, "You are not authenticated"));
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { verifyToken, checkAdmin, checkFaculty, checkChatSender };

// import jwt from "jsonwebtoken"

// import { createError } from "../error.js"

// export  const verifyToken = (req,res,next)=>{
//     const token = req.cookies.access_token   //user or admin ke cookies main acess token present hoga
//     console.log("token: " , token);
//     if(!token){

//         return next(createError(401 , "You are not authenticated"))
//     }
//     jwt.verify(token, process.env.JWT , (err , user)=>{
//         if(err)
//         return next(createError(403 , "invalid token"))
//         req.user = user ;   //inserted the user into req.user
//         next();

//     })
// }
// export const checkUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin)
//       //this will check data from the login user
//       next();
//     else {
//       return next(createError(403, "You are not authorized"));
//     }
//   });
// };

// //checking admin authentication :: remember this will check from the user-login data itself
