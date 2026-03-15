// src/index.ts
import { spawnSync } from "child_process";
import path from "path";

export const tools = [
  {
    name: "web_search_plus",
    description: "Multi-provider web search plugin",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        provider: { type: "string" } // 可选
      },
      required: ["query"]
    },
    async handler(args: any) {
      const scriptPath = path.join(__dirname, "../scripts/search.py");

      const cmdArgs = ["-q", args.query];
      if (args.provider) cmdArgs.push("-p", args.provider);

      const cmd = spawnSync("python3", [scriptPath, ...cmdArgs], {
        encoding: "utf-8"
      });

      if (cmd.error) throw cmd.error;
      if (cmd.status !== 0)
        throw new Error(`Python exited ${cmd.status}: ${cmd.stderr}`);

      try {
        return JSON.parse(cmd.stdout);
      } catch {
        return cmd.stdout.trim();
      }
    }
  }
];

