export function splitWord(word: string): string {
  const spaceIndex = word.indexOf(" ");
  if (spaceIndex === -1) {
    return "";
  }
  return word.substring(spaceIndex + 1);
}
