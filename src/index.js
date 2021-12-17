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
