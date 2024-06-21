import fetch from 'node-fetch';

const timeout = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms} ms`));
    }, ms);
  });
};

export const fetchWithTimeout = async (url: string, options: any, timeoutMs: number) => {
  return Promise.race([
    fetch(url, options),
    timeout(timeoutMs)
  ]);
};
