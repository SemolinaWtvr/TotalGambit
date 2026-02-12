import argon2 from "argon2"
import { generateToken } from "../utils/jwt.utils.js";
import defaultService from "../services/default.service.js";

const defaultController = {

    login: async (req, res) => {
        try {
            const logged = await defaultService.login(req.body);

            if (logged.status == "OK") {
                const token = await generateToken({
                    id: logged.user.id,
                    username: logged.user.username,
                    role: logged.user.role
                });
                res.status(200);
                res.json({token});
                return;
            } else {
                res.status(400);
                res.json({
                    error: "Invalid Username/Password"
                })
            }
        } catch (err) {
            res.status(500).json({ error: "Internal server error"})
        }
    },

    register: async (req, res) => {
        try {
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
        } catch (err) {
            res.status(500).json({ error: "Internal server error"})
        }

    },

    delete: async (req, res) => {
        try {
            const email = req.body.email

            const deleted = await defaultService.delete(email);

            if (deleted.status == "OK") {
                res.status(200);
                res.json({
                    status: `The user ${deleted.username} has been deleted.`
                })
            } else {
                res.status(400);
                res.json({
                    error: "That user doesn't exist."
                })
            }
        } catch (err) {
            res.status(500).json({ error: "Internal server error"})
        }
    }
}

export default defaultController;