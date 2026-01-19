## Vitest threads pool issue under Deno

Running Vitest’s `threads` pool through Deno’s Node compatibility layer currently fails because Deno does not expose the `stdout` / `stderr` streams on `worker_threads.Worker`. Vitest expects those streams to exist and pipes them in `node_modules/.deno/vitest@4.0.17/node_modules/vitest/dist/chunks/cli-api.Cx2DW4Bc.js:7735-7756`, so `_thread.stdout` becomes `undefined` and the run aborts before any tests start.

### Reproduction
- Deno 2.6.5
- Vitest 4.0.17 (`pool: "threads"` in `vitest.config.ts`)
- Run `deno task test` (or `deno run -A npm:vitest --pool=threads`)

### Error
```
Error: [vitest-pool]: Failed to start threads worker …
Caused by: TypeError: Cannot read properties of undefined (reading 'pipe')
  at ThreadsPoolWorker.start …/cli-api.Cx2DW4Bc.js:7754:23
```

### Notes for issue
- Missing worker `stdout` / `stderr` support is likely a gap in Deno’s Node compatibility shim.
- Reference repository: https://github.com/ignatij/tryouts/tree/main/deno-vitest-compatibility-issue/deno-vitest
