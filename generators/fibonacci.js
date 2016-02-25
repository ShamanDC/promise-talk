var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}


export genFibonacciUntil(threshold) {
  const fib = [];

  for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > threshold) {
      break;
    }

    fib.push(n);
  }

  return fib;
}