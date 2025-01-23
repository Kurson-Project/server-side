export const swagger = {
    "/user": {
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
}