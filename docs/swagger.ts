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
                get: {
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

            },
            "/api/admin/mentor": {
                "post": {
                    "tags": ["Admin"],
                    "summary": "create mentor account",
                    "description": "cuman admin yang dapat membuat user untuk mentor, dan harus terverifikasi",
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "requestBody": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "username": {
                                            "type": "string"
                                        },
                                        "user_email": {
                                            "type": "string"
                                        },
                                        "user_password": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "success"
                        }
                    }
                },
                "delete": {
                    "tags": ["Admin"],
                    "summary": "deleting mentor account",
                    "description": "menghapus mentor user dari pihak admin , admin yang terverifikasi dapat menghapus mentor dan sesuai aturan. Untuk menghapus hanya perlu id mentor untuk melakukanya",
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "requestBody": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "mentor_id": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "mentor account deleted successfully"
                        },
                        "400": {
                            "description": "bad request, missing or invalid mentor_id"
                        }
                    }
                },
                "put": {
                    "tags": ["Admin"],
                    "summary": "Updating mentor user profile",
                    "description": "Admin dapat mengubah user profile mentor. ini berlaku jika ada kesalahan data maupun lainya. data yang dapat diubah antara lain <b> [ username , user_email , user_picture ] </b>. <br> Perlu diingat bahwa request yang wajib ada adalah mentor_id dan salah satu di antara field yang akan di ubah",
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "requestBody": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "mentor_id": {
                                            "type": "string",
                                            "example": "require!"
                                        },
                                        "username": {
                                            "type": "string"
                                        },
                                        "user_email": {
                                            "type": "string"
                                        },
                                        "user_picture": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "mentor profile updated successfully"
                        },
                        "400": {
                            "description": "bad request, missing required fields"
                        }
                    }
                },
                "get": {
                  "tags": ["Admin"],
                  "summary": "Get mentor details",
                  "description": "Mengambil detail mentor berdasarkan mentor_id. Hanya admin yang dapat mengakses.",
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ],
                  "parameters": [
                    {
                      "name": "mentor_id",
                      "in": "query",
                      "required": true,
                      "schema": {
                        "type": "string"
                      },
                      "description": "ID dari mentor yang ingin diambil detailnya."
                    }
                  ],
                  "responses": {
                    "200": {
                      "description": "Mentor details retrieved successfully",
                      
                    },
                  }
                }
            },
            "/api/admin/mentors" : {
                "get": {
                  "tags": ["Admin"],
                  "summary": "Get mentor details",
                  "description": "Mengambil detail mentor berdasarkan mentor_id. Hanya admin yang dapat mengakses.",
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ],
                  "parameters": [
                    {
                      "name": "max",
                      "in": "query",
                      "required": true,
                      "schema": {
                        "type": "string"
                      },
                      "description": "Max data yang diambil di data"
                    },
                    {
                        name : "pageof",
                        in : "query",
                        description : "Sekarang adalah page ke berapa ( dimulai dari 0 )",
                        schema : {
                            type : "string"
                        }
                    },
                  ],
                  "responses": {
                    "200": {
                      "description": "Mentor details retrieved successfully",
                      
                    },
                  }
                }
            }
        }
    }
}