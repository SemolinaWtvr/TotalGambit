import db from '../models/index.js'
import argon2 from "argon2";

const defaultService = {
    login: async (data) => {
        const user = data;

        const dbUser = await db.user.findOne({
            where: {email:user.email}
        })

        if (!dbUser) {
            return {
                status: "CONFLICT"
            }
        }

        const verifyPassword = await argon2.verify(dbUser.pwd, user.pwd)
        if (verifyPassword) {
            return {
                status: "OK",
                user: dbUser
            }
        } else {
            return {
                status: "CONFLICT"
            }
        }
    },

    register: async (data, pwd, role) => {
        const user = data;
        
        const emailTaken = await db.user.findOne({
            where : {email:user.email}
        })

        if (!emailTaken) {
            const newUser = {
                role: role,
                username: data.username,
                email: data.email,
                pwd: pwd,
                picture: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                tokens: 50,
                bio: ""
            }
            const createdUser = await db.user.create(newUser);
            return {
                status: "OK",
                user: createdUser
            }
        } else {
            return {
                status: "CONFLICT"
            }
        }
    },

    delete: async (email) => {
        const dbUser = await db.user.findOne({
            where: {email:email}
        })

        if (dbUser) {
            await dbUser.destroy()
            return {
                status: "OK",
                username: dbUser.username
            }
        } else {
            return {
                status: "CONFLICT"
            }
        }


    }



}

export default defaultService;