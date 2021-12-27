import { newStr } from "./b";
import { arr as Arr } from "./c";

const arr = [
  new Promise(rev => {
    rev(2);
  }),
  new Promise(rev => {
    rev(2);
  }),
];

arr.map(el => {
  el.then(feed => {
    console.log(feed);
  });
});

console.log(...newStr);
console.log(...Arr);
