const info = (...params: (string | undefined)[]) => {
  console.log(...params);
};

const error = (...params: (string | undefined)[]) => {
  console.error(...params);
};

export default { info, error };
