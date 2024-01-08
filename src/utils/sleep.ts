export const sleep = (seconds: number = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("timeout");
      resolve(true);
    }, seconds * 1000);
  });
};
