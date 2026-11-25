function isValidBrackets(s) {
  if (s.length % 2 !== 0) {
    return false;
  }

  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char in pairs) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
