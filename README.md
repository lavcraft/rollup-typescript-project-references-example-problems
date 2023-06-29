# Typescript project references with rollup problems

Rollup Typescript2 example for reproduce problem with typescript project references

**Why rollup-typescript2?** — because @rollup/plugin-typescript doesn't support typescript project references \
**Why you need SDK project** —  in this example, sdk - externalized project. But it also dogfooded from local project `frontend` \
**Why you need shared project** — because it shared with `backend`, `frontend`, and sdk. It shared project with some models and internals. Optimize `backend` compilation speed and avoid direct sdk usage in `backend` \


[//]: # (## Problem 2 — different behaviour with tsc and rollup)

[//]: # ()
[//]: # (Try to use )

[//]: # (1. `npm run -w @project/sdk build`)

[//]: # (1. `npm run -w @project/sdk rollup`)

[//]: # ()
[//]: # (In rollup variant number 2 we will see next error:)

[//]: # ()
[//]: # (```)

[//]: # ([!] &#40;plugin rpt2&#41; RollupError: src/actions/create.ts:1:20 - error TS6059: File '<...>/rollup-ws-problem/packages/shared/src/test/util.ts' is not under 'rootDir' '<...>/rollup-ws-problem/packages/sdk/src'. 'rootDir' is expected to contain all source files.)

[//]: # (```)

[//]: # ()
[//]: # (But in tsc variant number 1 - it works fine)

## Problem 1 — typings with project references

1. Run `npm run -w @project/sdk rollup`
2. See `build/sdk` and `build/shared` directories
    ```
    tree packages/sdk/build/shared
    packages/sdk/build/shared
    └── src
        └── test
            ├── util.d.ts
            └── util.d.ts.map

    tree packages/sdk/build/sdk
    packages/sdk/build/sdk
    └── src
        ├── actions
        │   ├── create.d.ts
        │   └── create.d.ts.map
        └── models
            ├── user.d.ts
            └── user.d.ts.map


    ```
    It contains types with SRC directory
3. Run `npm run -w @project/sdk build` and as a result - all typing located in actions and models directories. Additional sdk and shared dirs didn't create