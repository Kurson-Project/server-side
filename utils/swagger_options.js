import { request, response } from "express";
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
                    description : "Token ini berisi jwt barrier yang dikirimkan melalui user login baik normal maupun oauth2 ",
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
            },
            {
                name: "User",
                description: "User data, info, .etc"
            }
        ],
        paths: {
            "/api/auth/google/": {
                get: {
                    tags: ["Authtentication"],
                    summary: "authentication using oauth2 google",
                    description: "<b>Route</b> ini hanya dapat digunakan dengan me redirect nya ke path ini , contohnya dari halaman lain di redirect ke route ini tapi dengan memberikan parameter query 'redirect' sebagai callback ketika keadaan login selesai ",
                    parameters: [
                        {
                            in: "query",
                            name: "redirect",
                            schema: {
                                type: "string"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "success"
                        },
                        400: {
                            description: "kurangnya atribut redirect pada query url "
                        }
                    }
                }
            },
            "/api/auth/register": {
                post: {
                    tags: ["Authtentication"],
                    summary: "create new user",
                    description: "",
                    schema: {
                        type: "interger"
                    },
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string"
                                        },
                                        user_email: {
                                            type: 'string'
                                        },
                                        user_password: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "success"
                        }
                    }
                }

            },
            "/api/auth/login": {
                post: {
                    tags: ["Authtentication"],
                    summary: "login user authentication",
                    description: "",
                    schema: {
                        type: "interger"
                    },
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user_email: {
                                            type: 'string'
                                        },
                                        user_password: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "success"
                        }
                    }
                }

            },
            "/api/auth/google/callback": {
                post: {
                    tags: ["Callback"],
                    summary: "callback oauth2 google",
                    description: "",
                    schema: {
                        type: "interger"
                    },
                }

            },
            "/api/auth/logout": {
                post: {
                    tags: ["Authtentication"],
                    summary: "logout & deleted user session",
                    description: "",
                    security: [{
                        bearerAuth: []
                    }],
                    responses: {
                        "200": {
                            description: "success"
                        },
                        "401": {
                            description: "unauthorize"
                        }
                    }
                }

            },
            "/api/user": {
                post: {
                    tags: ["User"],
                    summary: "getting info user data ( one )",
                    description: "",
                    security: [{
                        bearerAuth: []
                    }],
                    responses: {
                        "200": {
                            description: "success"
                        },
                        "401": {
                            description: "unauthorize"
                        }
                    },
                }

            }
        }
    }
}