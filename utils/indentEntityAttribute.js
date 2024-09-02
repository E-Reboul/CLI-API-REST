export const indentEntityAttribute = (code, indentLevel) => {
    const indent = ' '.repeat(indentLevel);
    return code.split('\n').map(line => indent + line).join('\n');
  };