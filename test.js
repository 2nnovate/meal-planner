const test = {};

test.returnHello = () => 'hello';

test.asyncHello = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello');
  }, 1000);
});

test.throwError = (shouldThrow = false) => {
  if (!shouldThrow) {
    return 'hello';
  }

  throw new Error('something wrong');
};

test.asyncThrowError = (shouldThrow = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!shouldThrow) {
      resolve('hello');
    }

    reject(new Error('something wrong'));
  }, 1000);
});

test.mocking = () => {
  const helloString = test.returnHello();

  return helloString;
};

module.exports = test;
