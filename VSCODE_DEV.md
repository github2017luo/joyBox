`npm run serve`

`launch.json`
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Backend",
            "runtimeArgs": [
                "-r",
                "ts-node/register",
                "-r",
                "tsconfig-paths/register"
            ],
            "args": [
                "${workspaceFolder}/backend/Src/main.ts"
            ],
            "env": {
                "default-access": "FULL_ACCESS",
                "passphrase": "12345",
                "TS_NODE_PROJECT": "backend/tsconfig.json",
                "PORT": "3000"
            }
        }
    ]
}
```