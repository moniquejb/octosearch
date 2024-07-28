export function formatStarCount(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  } else {
    return num.toString()
  }
}

export const gitHubUrl = 'https://github.com'

export function focusElement(id: string) {
  document.getElementById(`#${id}`)?.focus()
}

export function scrollTo(toScrollSelector = '', scrollIfAbove = true) {
  if (toScrollSelector) {
    const destination = document.querySelector(toScrollSelector) as HTMLElement
    if (destination) {
      const scrollOffset = destination.offsetTop - 60

      if (scrollOffset > window.scrollY && !scrollIfAbove) {
        return
      }

      window.scrollTo(0, scrollOffset)
    }
  } else {
    window.scrollTo(0, 0)
  }

  return
}
