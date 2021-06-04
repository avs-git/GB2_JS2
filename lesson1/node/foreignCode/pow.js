const pow = (a, n) => {
  if (isFinite(a) && isFinite(n) && a !== null && n !== null) {
    if (n === 0) return 1;

    let result = 1;
    for (let i = 0; i < n; i++) {
      result *= a;
    }

    return result;
  }

  return null;
};

module.exports = pow;
