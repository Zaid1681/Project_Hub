// const Student = require("../Schema/Student");
const CustomError = require("../utils/error");
// const Project = require("../Schema/Project");
const Group = require("../Schema/Group.schema.js");
const addGroup = async (req, res, next) => {
  try {
    const {
      groupName,
      membersId,
      groupLeaderId,
      membersName,
      groupLeaderName,
      subject,
      semester,
      academicYear,
      currentYear,
      guideId,
    } = req.body; //received from middleware
    const groupData = await Group.find({
      membersId,
      groupLeaderId,
      groupLeaderName,
      subject,
      semester,
      academicYear,
      currentYear,
      guideId,
    });
    if (groupData.length != 0) {
      next(CustomError(500, "Group Already Exist Already exist"));
    } else {
      const groupDetails = await new Group({
        // ...groupData,
        groupName,
        membersId,
        groupLeaderId,
        membersName,
        groupLeaderName,
        subject,
        semester,
        academicYear,
        guideId,
        currentYear,
      });
      await groupDetails.save();
      res.status(200).json({
        message: "Group of Students created successfully",
        data: groupDetails,
      });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// getAllproject Video
const getAllGroup = async (req, res, next) => {
  try {
    const allGroups = await Group.find();
    if (!allGroups) next(CustomError(404, "Groups Not Found"));
    else {
      res
        .status(200)
        .json({ message: "Groups fetched successfully ", data: allGroups });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// GET video
const getGroup = async (req, res, next) => {
  try {
    // const project = await Project.findById();

    const groupDetails = await Group.findById(req.params.id);
    if (!groupDetails) next(CustomError(404, "Group is not found"));
    else {
      res
        .status(200)
        .json({ message: "Group Founded Sucessfully", data: groupDetails });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// const getGroupMembers = async (req, res, next) => {
//   try {
//     // const { currentYear, semester } = req.body; // received from middleware
//     const { currentYear, semester, academicYear, subject, guideId } =
//       req.params;
//     // Fetch subjects based on currentYear and semester
//     const groupData = await Group.find({
//       currentYear,
//       semester,
//       academicYear,
//       subject,
//       guideId,
//     });
//     console.log("subdata", groupData);

//     if (groupData.length === 0) {
//       next(CustomError(500, "groups does not exist"));
//     } else {
//       try {
//         const groupMembersName = groupData.map(
//           (groupData) => groupData.membersName
//         );
//         const groupId = groupData._id;
//         res.status(201).json({
//           success: true,
//           message: "Semester subject data fetched",
//           data: { groupMembersName, groupId },
//         });
//       } catch (error) {
//         next(CustomError(404, error));
//       }
//     }
//   } catch (error) {
//     next(CustomError(500, error));
//   }
// };

const getGroupMembers = async (req, res, next) => {
  try {
    const { currentYear, semester, academicYear, subject, guideId } =
      req.params;

    // Construct the query object based on the provided criteria
    const query = {};

    // Add each criteria to the query object if it's provided
    if (currentYear) query.currentYear = currentYear;
    if (semester) query.semester = semester;
    if (academicYear) query.academicYear = academicYear;
    if (subject) query.subject = subject;
    if (guideId) query.guideId = guideId;

    const groupData = await Group.find(query).lean();
    console.log(groupData);

    if (!groupData || groupData.length === 0) {
      return next(CustomError(404, "No groups found"));
    } else {
      try {
        const groupDetails = groupData.map((group) => ({
          groupMembersName: group.membersName,
          groupId: group._id, // Accessing groupId within the map function
        }));

        res.status(201).json({
          success: true,
          message: "Semester subject data fetched",
          data: groupDetails,
        });
      } catch (error) {
        next(CustomError(404, error));
      }
    }

    // You may want to remove this unreachable code
    // res.status(200).json({
    //   message: "Groups fetched successfully",
    //   data: groups,
    // });
  } catch (error) {
    next(CustomError(500, error));
  }
};

// GET getApprovedGroup
const getApprovedGroup = async (req, res, next) => {
  try {
    const { currentYear, semester, academicYear, subject, guideId } =
      req.params;
    // Construct the query object based on the provided criteria
    const query = {};
    if (!guideId) {
      CustomError(404, "Guide Id Not Found");
    } else {
      // Add each criteria to the query object if it's provided
      if (currentYear) query.currentYear = currentYear;
      if (semester) query.semester = semester;
      if (academicYear) query.academicYear = academicYear;
      if (subject) query.subject = subject;
      if (subject) query.guideId = guideId;
      const groups = await Group.find(query).lean();
      if (!groups || groups.length === 0) {
        return next(
          CustomError(404, "No groups found for the provided criteria")
        );
      }
      res.status(200).json({
        message: "Groups fetched successfully",
        data: groups,
      });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const projId = req.params.projId;
    const isProjectApproved = req.query.status;

    // Use Group model instead of Project model for findByIdAndUpdate
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        approvedProjectId: projId === "null" ? null : projId, // Handle null case
        isProjectApproved,
      },
      { new: true, runValidators: true } // Add runValidators option to validate schema
    );

    if (!updatedGroup) {
      return next(CustomError(404, "Group not found"));
    }

    res
      .status(200)
      .json({ message: "Group updated successfully", data: updatedGroup });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const updateGrpStatus = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const status = req.params.status;

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        $set: {
          groupStatus: status,
        },
      },
      { new: true, runValidators: true } // Add runValidators option to validate schema
    );

    if (!updatedGroup) {
      return next(CustomError(404, "Group not found"));
    }

    res
      .status(200)
      .json({ message: "Group Status successfully", data: updatedGroup });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

const updateGuide = async (req, res, next) => {
  try {
    const guideId = req.params.guideId;
    const groupId = req.params.groupId;
    const guideName = req.query.name;
    console.log(guideId, groupId, guideName);

    // Use Group model instead of Project model for findByIdAndUpdate
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { guideId: guideId, guideName: guideName },
      { new: true, runValidators: true } // Add runValidators option to validate schema
    );

    if (!updatedGroup) {
      return next(CustomError(404, "Group not found")); // Use return to stop execution
    }

    res
      .status(200)
      .json({ message: "Group updated successfully", data: updatedGroup });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error")); // Use error.message for more detailed error
  }
};
// delete Project
const delGroup = async (req, res, next) => {
  try {
    const groupDetails = await Group.findById(req.params.id);
    if (!groupDetails)
      res
        .status(400)
        .json({ success: false, message: "Group Details Not Found" });

    try {
      await Group.findByIdAndDelete(req.params.id);
      res
        .status(201)
        .json({ success: true, message: "Group Deleted Successfully" });
    } catch (error) {
      next(CustomError(404, error));
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

const getGroupsByCriteria = async (req, res, next) => {
  try {
    const { currentYear, semester, academicYear, subject } = req.params;

    // Construct the query object based on the provided criteria
    const query = {};

    // Add each criteria to the query object if it's provided
    if (currentYear) query.currentYear = currentYear;
    if (semester) query.semester = semester;
    if (academicYear) query.academicYear = academicYear;
    if (subject) query.subject = subject;

    // Add criteria for isProjectApproved and projectStatus
    // query.isProjectApproved = true;
    // query.projectStatus = "Approved";

    // Find groups matching all the provided criteria
    const groups = await Group.find(query).lean();

    if (!groups || groups.length === 0) {
      return next(
        CustomError(404, "No groups found for the provided criteria")
      );
    }

    res.status(200).json({
      message: "Groups fetched successfully",
      data: groups,
    });
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getGroupWithId = async (req, res, next) => {
  try {
    let { memberId } = req.params;
    // memberId = memberId.trim().toString();

    const query = {
      membersId: { $in: [memberId] },
    };

    console.log("Query:", JSON.stringify(query));

    const groups = await Group.find(query).lean();

    if (!groups || groups.length === 0) {
      return next(CustomError(404, "No groups found "));
    }

    res.status(200).json({
      message: "Groups fetched successfully",
      data: groups,
    });
  } catch (error) {
    next(CustomError(500, error));
  }
};

// Export both functions as an object
module.exports = {
  addGroup,
  getAllGroup,
  getGroup,
  updateStatus,
  delGroup,
  getGroupsByCriteria,
  getGroupWithId,
  getApprovedGroup,
  updateGuide,
  getGroupMembers,
  updateGrpStatus,
};
