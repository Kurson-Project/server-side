export function swagger_static (api_json : string) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Docs | Kurson Api</title>
            <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" sizes="any" type="image/png">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css">
        </head>
        <body>
            <div id="swagger-ui"></div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"></script>
            <script>
                const ui = SwaggerUIBundle({
                    url: ${"'"+ api_json + "'"} ,
                    dom_id: '#swagger-ui',
                });
            </script>
        </body>
        </html>
    `
}