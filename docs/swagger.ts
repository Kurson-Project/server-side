
import {swagger as AuthSwagger} from "./routes/auth/swagger"
import { swagger as AdminMentorSwagger } from "./routes/admin/mentor/swagger"
import { swagger as UserSwagger } from "./routes/user/swagger"
export function swagger_options() {
    return {
        openapi: "3.0.0",
        info: {
            title: "Api kurson serve",
            description: "Dokumentasi API ini disusun dalam <b>Bahasa Indonesia</b> untuk mempermudah pengguna yang lebih familiar dengan bahasa ini. Kami berusaha memberikan penjelasan yang jelas dan informatif di setiap bagian dokumentasi. Namun, jika terdapat bagian dalam Bahasa Inggris yang kurang tepat atau tidak jelas, kami mohon maaf atas kekurangannya. Jangan ragu untuk memberikan masukan atau pertanyaan kepada kami agar kami dapat terus meningkatkan kualitas dokumentasi ini.",
            version: "1.0.0"
        },
        servers: [
            {
                url: process.env.APP_URL || "http://localhost:3000",
                description: "preview server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    description: "Token ini berisi jwt barrier yang dikirimkan melalui user login baik normal maupun oauth2 ",
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            }
        },
        tags: [
            {
                name: "Authtentication",
                description: "for login,signup & user authorization "
            },
            {
                name: "Callback",
                description: "Callback function"
            }, {
                name: "Admin",
                description: "Admin user previlage",
            },
            {
                name: "User",
                description: "User data, info, .etc"
            }
        ],
        paths: {
            ...AuthSwagger,
            ...AdminMentorSwagger,
            ...UserSwagger
        }
    }
}