import db from '../models/index.js'
import argon2 from "argon2";

const defaultService = {
    login: async (data) => {
        const user = data;

        const dbUser = await db.user.findOne({
            where: {email:user.email}
        })


        const verifyPassword = await argon2.verify(dbUser.pwd, user.pwd)
        if (verifyPassword == true) {
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
            await db.user.create(newUser);
            return {
                status: "OK",
                user: newUser
            }
        } else {
            return {
                status: "CONFLICT"
            }
        }


    }
}

export default defaultService;