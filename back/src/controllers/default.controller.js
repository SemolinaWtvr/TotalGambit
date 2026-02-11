import argon2 from "argon2"
import { generateToken } from "../utils/jwt.utils.js";
import defaultService from "../services/default.service.js";

const defaultController = {

    login: async (req, res) => {
        const logged = await defaultService.login(req.body);

        if (logged.status == "OK") {
            res.status(200);
            res.json({
                user: logged.user
            });
            return;
        } else {
            res.status(400);
            res.json({
                error: "Invalid Username/Password"
            })
        }
    },

    register: async (req, res) => {
        const { password, username, email } = req.body;
        const role = "Admin"

        if (!password || !username || !email) {
            res.status(400);
            res.json({error: "Element(s) missing"});
            return;
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = await defaultService.register(req.body, hashedPassword, role);

        if (newUser.status == "OK") {
            res.status(200);
            res.json({
                role: newUser.user.role,
                username: newUser.user.username,
                tokens: newUser.user.tokens            
            });
            return;
        } else if (newUser.status == "CONFLICT") {
            res.status(400);
            res.json({
                error: "email already used."
            })
            return;
        }

    }
}

export default defaultController;