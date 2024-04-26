const { Router } = require("express");
const authRoutes = require("./auth.js");
// const studentsRoutes = require("./student.js");
const projectsRoutes = require("./projects.js");
const subjectRoutes = require("./subject.js");
const facultyRoutes = require("./facultyAuth.js");
const groupRoutes = require("./group.routes.js");
const projectIdeaRoutes = require("./projectIdea.routes.js");
const task = require("./task.routes.js");
const student = require("./student.js");
const submission = require("./submission.js");
const chat = require("./chat.routes.js");
const admin = require("./admin.js");
const router = Router();
router.use("/auth", authRoutes);
router.use("/admin/auth", facultyRoutes);
// router.use("/students", studentsRoutes);
router.use("/project", projectsRoutes);
router.use("/subject", subjectRoutes);
router.use("/group", groupRoutes);
router.use("/projectIdea", projectIdeaRoutes);
router.use("/task", task);
router.use("/student", student);
router.use("/submission", submission);
router.use("/chat", chat);
router.use("/admin", admin);

module.exports = router;
