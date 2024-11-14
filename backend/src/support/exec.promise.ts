import { exec } from 'child_process';

const execPromise = (command: string) => {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

export { execPromise };
