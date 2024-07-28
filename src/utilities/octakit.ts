export function determinePagesRemaining(link: string | undefined): boolean {
  const pagesRemaining = (link && link.includes(`rel=\"next\"`)) || false
  return pagesRemaining
}
