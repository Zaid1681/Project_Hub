// const Faculty = require("../Schema/Faculty.js");
const Student = require("../Schema/Student.js");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error.js");
var JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      startingYear,
      passingYear,
      branch,
      studentId,
      address,
      gender,
      phone,
    } = req.body;

    // Check if the email ends with "@vcet.edu.in"
    if (!email.endsWith("@vcet.edu.in")) {
      return res
        .status(400)
        .json({ error: "Only VCET email addresses are allowed to sign up." });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Student with this email already exists." });
    }
    const existingStudent2 = await Student.findOne({ studentId });
    if (existingStudent2) {
      return res
        .status(400)
        .json({ error: "Student with this email already exists." });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newStudent = new Student({
      name,
      email,
      password: hash,
      startingYear,
      passingYear,
      branch,
      studentId,
      gender,
      address,
      phone,
    });

    await newStudent.save();
    return res
      .status(200)
      .json({ message: "Student created successfully!!", data: newStudent });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password, currentYear, year } = req.body;

    console.log("Request Body:", req.body);

    // validation
    if (!email || !password || !currentYear || !year) {
      throw CustomError("Please fill all the fields", 400);
    }

    const studentDetail = await Student.findOne({ email });

    console.log("Student Detail:", studentDetail);

    if (!studentDetail) {
      throw CustomError("Invalid credentials", 400);
    }

    const pass = await bcrypt.compare(password, studentDetail.password);
    console.log("Password Comparison Result:", pass);

    if (!pass) {
      throw CustomError("Invalid credentials", 400);
    }

    const token = JWT.sign({ id: studentDetail._id }, process.env.JWT_SECRET);
    const { ...otherDetails } = studentDetail._doc;

    console.log("Logged in successfully");
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ token, ...otherDetails });
    console.log("Token:", token);
  } catch (error) {
    console.error("Error in signin controller:", error);
    next(error);
  }
};
const getAllStudents = async (req, res, next) => {
  try {
    const Facultys = await Student.find();
    if (Facultys.length === 0) {
      throw CustomError("Faculty not found", 400);
    } else {
      res.status(200).json(Facultys);
    }
  } catch (error) {
    // console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
    // next(error);
  }
};
const getStudentEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const studentData = await Student.find({ email });

    if (studentData.length === 0) {
      throw new CustomError("Student Profile Not Found", 400);
    } else {
      // Assuming startingYear and passingYear are properties of the Student model
      res.status(200).json({
        data: {
          joiningYear: studentData[0].startingYear,
          passingYear: studentData[0].passingYear,
        },
      });
    }
  } catch (error) {
    // Check if error is defined and has the status property
    if (error && error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      // If error doesn't have the status property, handle it as a server error
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const getStudent = async (req, res, next) => {
  try {
    const Faculty = await Student.findById(req.params.id);
    if (Faculty.length === 0) {
      throw CustomError("Faculty not found", 400);
    } else {
      res.status(200).json(Faculty);
    }
  } catch (error) {
    // console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
    // next(error);
  }
};
const delStudent = async (req, res, next) => {
  try {
    const Faculty = await Student.findByIdAndDelete(req.params.id);
    if (Faculty.length === 0) {
      throw CustomError("Faculty not found", 400);
    } else {
      res.status(200).json(Faculty);
    }
  } catch (error) {
    // console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
    // next(error);
  }
};

const getStudentNameById = async (req, res, next) => {
  try {
    // Extract the student ID from the request parameters
    const studentId = req.query.studentId;

    console.log("Received student ID:", studentId);

    // Find the student by their student ID
    const student = await Student.findOne({ studentId });

    console.log("Found student:", student);

    // If no student is found with the provided student ID, return a 404 error
    if (!student) {
      return next(CustomError(404, "Student not found"));
    }

    // Extract and send the student's name in the response
    const { name, _id } = student;
    res.status(200).json({ name, _id });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Export both functions as an object
module.exports = {
  signin,
  signup,
  getAllStudents,
  getStudent,
  getStudentNameById,
  delStudent,
  getStudentEmail,
};
