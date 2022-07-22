function a() {
  setTimeout(function firstSetTimeout() {
    console.log("firstSetTimeout");
  }, 700);
  console.log(6);
  return new Promise(function returnPromise(res, rej) {
    if (true) {
      console.log("True");
      setTimeout(function promiseSetTimeout() {
        console.log("promiseSetTimeout");
      }, 500);
      res(5);
    } else {
      rej(0);
    }
  });
}

// 6 5 True 5 setTimeout

// a().then(function thenPromise(res) {
//   console.log("Response Promise", res);
//   setTimeout(function responseSetTimeout() {
//     console.log("responseSetTimeout");
//   }, 10);
// });

// var s = new Set();
// s.add("hello").add("goodbye").add("hello");
// s.size === 2;
// s.has("hello") === true;

var m = new Map();
m.set("num1", 42);
m.set("num2", 34);

console.log(m.get("num3"));