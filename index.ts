import { spawn, SpawnOptions } from "node:child_process";

export const ACCEPT_DEFAULT = "ACCEPT_DEFAULT";
export const ENTER_KEY = "\n";
export const WHITESPACE_KEY = " ";
// Octals literals are banned into ESM
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Deprecated_octal#octal_escape_sequences
export const DOWN_KEY = "\u001b[B";

export interface CliGhostwriterParams extends SpawnOptions {
  command: string;
  answersMap: Record<string, string | undefined>;
  endingMarker: string;
  enableLogs?: boolean;
}

export function cliGhostwriter({
  command,
  answersMap,
  endingMarker,
  enableLogs,
  ...options
}: CliGhostwriterParams) {
  enableLogs = enableLogs ?? false;

  return new Promise<void>((resolve, reject) => {
    const childProcess = spawn(command, {
      ...options,
      stdio: "pipe",
      shell: true,
    });

    childProcess.stdout.setEncoding("utf8");
    childProcess.stdout.on("data", (data: string) => {
      if (data.includes(endingMarker)) {
        childProcess.stdin.end();
      }

      enableLogs && console.log("prompt:", data);

      for (const question in answersMap) {
        if (data.includes(question)) {
          const answer = answersMap[question];
          enableLogs && console.log("answer:", answer);

          // To accept the default value we just need to press enter,
          // so we aren't going to write the answer
          if (!!answer && answer !== ACCEPT_DEFAULT) {
            childProcess.stdin.write(answer);
          }
          childProcess.stdin.write(ENTER_KEY);

          // If we don't remove the question once used, we'd match the line showing
          // the question after it has been answered too, generating erratic behavior
          delete answersMap[question];
          break;
        }
      }
    });

    childProcess.on("exit", (code) => {
      console.log();

      if (code) {
        console.log(` Execution FAILED...`);
        console.log();
        reject();
      } else {
        resolve();
      }
    });
  });
}
