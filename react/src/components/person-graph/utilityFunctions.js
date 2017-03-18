export function nodeIsClickable(node) {
  switch (node.nodeType) {
    case 'group':
      return true;
    default:
      return false;
  }
}
