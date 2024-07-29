export function determinePagesRemaining(link: string | undefined): boolean {
  // Determine if there is a next page for a paginated api call
  const pagesRemaining = (link && link.includes(`rel=\"next\"`)) || false
  return pagesRemaining
}
