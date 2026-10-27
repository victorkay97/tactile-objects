# Contributing

Welcome! This project is early in its development.

Before proposing a new object, open a GitHub issue describing:
1. The physical object and its characteristic interactions.
2. Its genuine web use case.
3. Input and accessibility considerations.
4. Likely geometry or rendering requirements.

For local changes:

    corepack enable
    pnpm install
    pnpm typecheck
    pnpm test
    pnpm build

Keep changes scoped. Include tests for observable behavior and screenshots or short recordings for animation changes. Do not introduce a heavy runtime dependency for a trivial effect.
