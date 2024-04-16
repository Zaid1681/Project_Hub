const Admin = require("../Schema/admin");

// Controller function to create a new admin
const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Create a new student instance
    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    // Save the new student to the database
    await newAdmin.save();

    res
      .status(201)
      .json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    next(error);
  }
};

const adminSignin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new Error("Please provide both email and password");
    }

    // Check if admin with provided email exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new Error("Admin not found");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    // Send token in response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, token });
  } catch (error) {
    console.error("Error in signin controller:", error);
    next(error); // Forward the error to the error handling middleware
  }
};

// Controller function to update an existing student
const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you are passing the student ID in the URL
    const { name } = req.body;

    // Find the student by ID and update its details
    await Admin.findByIdAndUpdate(id, {
      name,
    });

    res
      .status(200)
      .json({ success: true, message: "Admin updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller function to delete an existing student
const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you are passing the student ID in the URL

    // Find the student by ID and delete it
    await Admin.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you are passing the student ID in the URL

    // Find the student by ID in the database
    const admin = await Admin.findById(id);

    if (!admin) {
      // If student with the given ID is not found, return 404 Not Found
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // If student is found, return the student data
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    // If any error occurs, pass it to the error handling middleware
    next(error);
  }
};
const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.find();

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    // If any error occurs, pass it to the error handling middleware
    next(error);
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAdminById,
  deleteAdmin,
  getAllAdmin,
  adminSignin,
};
