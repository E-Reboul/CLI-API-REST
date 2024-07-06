export const capitalizeEachWords = (string) => {
    const result = string.replace(/\b\w/g, char => char.toUpperCase());
    console.log(`Original: ${string}, Capitalized: ${result}`);
    return result;
  };