function div(a, b) {
  return a / b;
}

function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) >= 48 && text.charCodeAt(i) <= 57) 
      return true;
  }
  return false;
}

exports.div = div;
exports.containsNumbers = containsNumbers;
