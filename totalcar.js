// File: totalcar.js

import { exec } from "child_process";

const command = `npx concurrently -k -n "backend,intranet,web" -c "red,blue,green" \
"cd backend && npm run dev" \
"cd intranet && npm run dev" \
"cd web && npm run dev"`;

const subprocess = exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Error starting services:", err.message);
    return;
  }
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
});

subprocess.stdout?.pipe(process.stdout);
subprocess.stderr?.pipe(process.stderr);
