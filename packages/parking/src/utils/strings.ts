export const truncateMiddleContent = (content: string, maxLength: number) => {
  if (content.length <= maxLength) {
    return content;
  }

  const halfLength = maxLength / 2;
  return `${content.slice(0, halfLength)}...${content.slice(
    content.length - halfLength
  )}`;
};
