const Faculty = require("../Schema/Faculty.js");
// const Student = require("../Schema/Student.js");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error.js");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin, role } = req.body;
    console.log("faculty server reg ", name, email, password, isAdmin, role);

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return next(CustomError(404, "faculty profile Already Exists"));
    }

    // const existingID = await Student.findOne({ studentId });
    // if (existingID) {
    //   return next(CustomError(404, "Student ID Already Exists"));
    // }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const newFaculty = new Faculty({
      name,
      email,
      password: hash,
      isAdmin,
      role,
    });

    await newFaculty.save();
    res.status(200).send({
      data: newFaculty,
      messgae: "Faculty profile created successfully!!",
    });
    console.log("Faculty profile created successfully");
  } catch (error) {
    console.log(error);
    next(error); // Pass the error to Express error handling middleware
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      throw CustomError("Please fill all the fields", 400);
    }

    const existingfaculty = await Faculty.findOne({ email });
    console.log("=>>", existingfaculty._id.toString());

    if (!existingfaculty) {
      throw CustomError("Invalid credentials", 400);
    }

    // if (!Faculty) return next(createError(404, "Faculty not found!!"));
    // console.log(Faculty);

    const pass = await bcrypt.compare(password, existingfaculty.password);
    if (!pass) {
      throw CustomError("Invalid credentials", 400);
    }
    // if (!pass) return next(createError(400, "Wrong Credentials"));

    const token = jwt.sign(
      { id: existingfaculty._id.toString() },
      process.env.JWT_SECRET
    );
    const { ...otherDetails } = existingfaculty._doc;

    console.log("logged in sucess");
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      message: "Faculty Logged Sucess",
      token,
      data: otherDetails,
    });
    console.log(token);
  } catch (error) {
    next(error);
  }
};

const delFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty)
      res.status(400).json({ success: false, message: "Faculty Not Found" });

    try {
      await Faculty.findByIdAndDelete(req.params.id);
      res.status(201).json({
        success: true,
        message: "Faculty Profile Deleted Successfully",
      });
    } catch (error) {
      next(CustomError(404, error));
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getFacultyByEmail = async (req, res, next) => {
  try {
    // Extract the student ID from the request parameters
    const facultyEmail = req.query.email;

    console.log("facultyEmail", facultyEmail);

    // Find the student by their student ID
    const facultyDetail = await Faculty.findOne({ facultyEmail });

    console.log("Found student:", facultyDetail);

    // If no student is found with the provided student ID, return a 404 error
    if (!facultyDetail) {
      return next(CustomError(404, "Student not found"));
    }

    // Extract and send the student's name in the response
    const { name, _id } = facultyDetail;
    res.status(200).json({ name, _id });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const getFacultyList = async (req, res, next) => {
  try {
    // Extract the student ID from the request parameters
    // const facultyEmail = req.query.email;

    // console.log("facultyEmail", facultyEmail);

    // Find the student by their student ID
    const facultyDetail = await Faculty.find();

    console.log("Found student:", facultyDetail);

    // If no student is found with the provided student ID, return a 404 error
    if (!facultyDetail) {
      return next(CustomError(404, "Student not found"));
    }

    // Extract and send the student's name in the response
    // const { name, _id } = facultyDetail;
    res.status(200).json({ facultyDetail });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const getFacultyNameList = async (req, res, next) => {
  try {
    const facultyDetail = await Faculty.find();

    console.log("Found faculty:", facultyDetail);

    if (facultyDetail.length === 0) {
      return next(CustomError(404, "Faculty not found"));
    }

    const data = facultyDetail.map((faculty) => ({
      name: faculty.name,
      _id: faculty._id,
    }));

    res.status(200).json({
      success: true,
      message: "Faculty names and IDs fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// const getAllStudents = async (req, res, next) => {
//   try {
//     const Facultys = await Student.find();
//     if (Facultys.length === 0) {
//       throw new CustomError("Faculty not found", 400);
//     } else {
//       res.status(200).json(Facultys);
//     }
//   } catch (error) {
//     // console.log("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//     // next(error);
//   }
// };
// const getStudent = async (req, res, next) => {
//   try {
//     const Faculty = await Student.findById(req.params.id);
//     if (Faculty.length === 0) {
//       throw new CustomError("Faculty not found", 400);
//     } else {
//       res.status(200).json(Faculty);
//     }
//   } catch (error) {
//     // console.log("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//     // next(error);
//   }
// };

// Export both functions as an object
module.exports = {
  signin,
  signup,
  delFaculty,
  getFacultyByEmail,
  getFacultyNameList,
  getFacultyList,
  //   getAllStudents,
  //   getStudent,
};
