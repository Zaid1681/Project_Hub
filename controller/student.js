const Students = require("../Schema/Student");

// Controller function to create a new student
const createStudent = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      startingYear,
      passingYear,
      studentId,
      gender,
    } = req.body;

    // Create a new student instance
    const newStudent = new Students({
      name,
      email,
      password,
      semester,
      startingYear,
      passingYear,
      studentId,
      gender,
    });

    // Save the new student to the database
    await newStudent.save();

    res
      .status(201)
      .json({ success: true, message: "Student created successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller function to update an existing student
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you are passing the student ID in the URL
    const { aboutMe, skills, startingYear, passingYear, branch } = req.body;

    // Find the student by ID and update its details
    await Students.findByIdAndUpdate(id, {
      aboutMe,
      skills,
      startingYear,
      passingYear,
      branch,
    });

    res
      .status(200)
      .json({ success: true, message: "Student updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller function to delete an existing student
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you are passing the student ID in the URL

    // Find the student by ID and delete it
    await Students.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const studentId = req.params.id; // Get student ID from request parameters

    // Find the student by ID in the database
    const student = await Students.findById(studentId);

    if (!student) {
      // If student with the given ID is not found, return 404 Not Found
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // If student is found, return the student data
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    // If any error occurs, pass it to the error handling middleware
    next(error);
  }
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
};
