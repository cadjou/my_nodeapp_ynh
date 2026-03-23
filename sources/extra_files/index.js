const http = require("http");

const port = process.env.PORT || 3000;
const pathPrefix = process.env.PATH_PREFIX || "/";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Node App</title>
    <style>
        body { font-family: sans-serif; max-width: 600px; margin: 80px auto; text-align: center; color: #333; }
        h1 { color: #41b883; }
        code { background: #f4f4f4; padding: 2px 8px; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>My Node App</h1>
    <p>Your Node.js application is running on YunoHost.</p>
    <p>Replace this default app with your own project files.</p>
    <p>Node.js <code>${process.version}</code> &mdash; Port <code>${port}</code></p>
</body>
</html>`);
});

server.listen(port, "127.0.0.1", () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
