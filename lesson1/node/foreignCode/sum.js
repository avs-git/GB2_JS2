const sum = (a, b) => {
  if (isFinite(a) && isFinite(b) && a !== null && b !== null) {
    return a + b;
  }

  return null;
};

module.exports = sum;
