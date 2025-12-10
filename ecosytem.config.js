module.exports = {
    apps: [
        {
            name: "user-guide",
            script: "yarn",
            args: "start:monorepo -p 3000",
            interpreter: "/usr/bin/node",
            env: {
                PATH: "/usr/local/bin:/usr/bin:/bin"
            }
        }
    ]
}