import {getUsers,createUser,getUser, deleteUser, updateUser} from "../controllers/user.controller.js"
import {Router} from 'express';

const router= Router();
router.post("/",createUser);
router.get("/all",getUsers);
router.get("/:id",getUser);
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)
export default router;