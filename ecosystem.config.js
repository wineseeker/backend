module.exports = {
    apps : [
        {
            name: "wine-seeker-backend",
            script: "./dist/bin/www.js",
            instances: "max",
            exec_mode: "cluster",
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}
