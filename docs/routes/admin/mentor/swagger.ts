export const swagger = {
    "/admin/mentor": {
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
            "/admin/mentors" : {
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