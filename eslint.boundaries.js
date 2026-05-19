import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
    plugins: {
        boundaries,
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },

        "boundaries/elements": [
            {
                type: "app",
                pattern: "./src/app",
            },
            {
                type: "features",
                pattern: "./src/features/*",
            },
            {
                type: "shared",
                pattern: "./src/shared",
            },
        ],
    },
    rules: {
        "boundaries/dependencies": [
            2,
            {
                default: "allow",
                rules: [
                    {
                        from: { type: "shared" },
                        disallow: [{ to: { type: "app" } }, { to: { type: "features" } }],
                        message:
                            "A lower-layer module (${file.type}) cannot import an upper-layer module (${dependency.type})",
                    },
                    {
                        from: { type: "features" },
                        disallow: [{ to: { type: "app" } }],
                        message:
                            "A lower-layer module (${file.type}) cannot import an upper-layer module (${dependency.type})",
                    },
                    {
                        to: {
                            type: "features",
                            internalPath: "!index.(ts|tsx)|*.page.tsx",
                        },
                        disallow: [
                            { from: { type: "app" } },
                            { from: { type: "features" } },
                            { from: { type: "shared" } },
                        ],
                        message:
                            "Module (${file.type}) must be imported through the public API. Direct import from ${dependency.source} is forbidden",
                    },
                ],
            },
        ],
    },
};
