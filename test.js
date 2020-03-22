function myFunction(onInc) {
  const b = 15;
  onInc(b);
}

function app() {
  let a = 6;

  const inc = x => {
    a += x;
  };

  myFunction(inc);

  console.log(a);
}

app();
