const http = require("http");

const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || "localhost";
const sshPort = process.env.SSH_PORT || "22";
const appUser = process.env.APP_USER || "";
const withSftp = process.env.WITH_SFTP === "1";

const sftpSection = withSftp ? `
    <h2>SFTP Access</h2>
    <p>You can edit your files using an SFTP client such as
        <a href="https://filezilla-project.org/download.php?type=client" target="_blank">FileZilla</a>.
    </p>
    <table>
        <tr><td><strong>Host</strong></td><td><code>${domain}</code></td></tr>
        <tr><td><strong>Port</strong></td><td><code>${sshPort}</code></td></tr>
        <tr><td><strong>User</strong></td><td><code>${appUser}</code></td></tr>
        <tr><td><strong>Password</strong></td><td><em>the one you set at installation</em></td></tr>
    </table>` : "";

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
        h2 { color: #555; margin-top: 2em; }
        code { background: #f4f4f4; padding: 2px 8px; border-radius: 4px; }
        table { margin: 1em auto; text-align: left; border-collapse: collapse; }
        td { padding: 6px 16px; border-bottom: 1px solid #eee; }
        hr { margin: 2em 0; border: none; border-top: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>My Node App</h1>
    <p>Your Node.js application is running on YunoHost.</p>
    <p>Replace this default app with your own project files.</p>

    <hr/>

    <h2>Server Info</h2>
    <table>
        <tr><td><strong>Node.js</strong></td><td><code>${process.version}</code></td></tr>
        <tr><td><strong>Port</strong></td><td><code>${port}</code></td></tr>
        <tr><td><strong>Domain</strong></td><td><code>${domain}</code></td></tr>
    </table>
    ${sftpSection}
</body>
</html>`);
});

server.listen(port, "127.0.0.1", () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
