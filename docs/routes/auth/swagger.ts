export const swagger = {
    "/auth/google/": {
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
            "/auth/register": {
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
            "/auth/login": {
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
            "/auth/google/callback": {
                get: {
                    tags: ["Callback"],
                    summary: "callback oauth2 google",
                    description: "",
                    schema: {
                        type: "interger"
                    },
                }

            },
            "/auth/logout": {
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
}