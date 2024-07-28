export function formatThousand(num: number): string {
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

export function scrollTo(toScrollSelector = '', offset = -60, scrollIfAbove = true) {
  if (toScrollSelector) {
    const destination = document.querySelector(toScrollSelector) as HTMLElement
    if (destination) {
      const scrollOffset = destination.offsetTop + offset

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

export function timeAgo(date: string): string {
  const now = new Date()
  const diffInMs = now.getTime() - new Date(date).getTime()

  const msInDay = 24 * 60 * 60 * 1000
  const msInWeek = 7 * msInDay
  const msInMonth = 30 * msInDay

  if (diffInMs < msInDay) {
    return 'today'
  } else if (diffInMs < msInWeek) {
    const days = Math.floor(diffInMs / msInDay)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (diffInMs < msInMonth) {
    const weeks = Math.floor(diffInMs / msInWeek)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else {
    const months = Math.floor(diffInMs / msInMonth)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(function (v) {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function hexToRgb(hex: string): [number, number, number] | null {
  const normalizedHex = hex.replace(/^#/, '')
  if (normalizedHex.length !== 6) {
    return null
  }

  const bigint = parseInt(normalizedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

export function textColorByBg(bgColour: string): string | null {
  const rgb = hexToRgb(bgColour)
  if (!rgb) {
    return null
  }

  const luminance = getLuminance(rgb[0], rgb[1], rgb[2])
  return luminance > 0.5 ? '000' : 'FFF'
}
