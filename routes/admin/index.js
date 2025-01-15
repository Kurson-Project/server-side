import { Router } from "express";
import { authController } from "../../controller/authController.js";
import { mentorAdminControl } from "../../controller/admin/mentorAdminControl.js";
const authControllers = new authController();
const mentorAdminControls = new mentorAdminControl();
const adminRouter = Router()

adminRouter.post('/api/admin/mentor',authControllers.middleware_admin,authControllers.signup)
adminRouter.delete('/api/admin/mentor',authControllers.middleware_admin,mentorAdminControls.deleteMentor)
adminRouter.put("/api/admin/mentor",authControllers.middleware_admin,mentorAdminControls.updateMentor)

export default adminRouter