import { Router } from "express";
import { authController } from "../../controller/authController.js";
import { mentorAdminControl } from "../../controller/admin/mentorAdminControl.js";
const authControllers = new authController();
const mentorAdminControls = new mentorAdminControl();
const adminRouter = Router()

adminRouter.post('/api/admin/mentor',authControllers.middleware_admin,authControllers.signup)
adminRouter.delete('/api/admin/mentor',authControllers.middleware_admin,mentorAdminControls.deleteMentor)
adminRouter.put("/api/admin/mentor",authControllers.middleware_admin,mentorAdminControls.updateMentor)
adminRouter.get("/api/admin/mentor",authControllers.middleware_admin,mentorAdminControls.getMentorUser)
adminRouter.get("/api/admin/mentors",authControllers.middleware_admin,mentorAdminControls.getMentorUsers)

export default adminRouter