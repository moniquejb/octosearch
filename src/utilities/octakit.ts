export function determinePagesRemaining(link: string | undefined): boolean {
  // const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  const pagesRemaining = (link && link.includes(`rel=\"next\"`)) || false
  return pagesRemaining
}
