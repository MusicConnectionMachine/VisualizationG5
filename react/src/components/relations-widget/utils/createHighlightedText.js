export default function createHighlightedText(query, text) {
  if (query.length >= 2) {
    const regex = new RegExp('(' + query + ')', 'gi');
    return { __html: text.replace(regex, '<span class="highlight">$1</span>') };
  }
  return { __html: text };
}
