export function normalizeSiteUrl(rawUrl: string | undefined): URL {
  const fallback = 'http://127.0.0.1:3000'
  const input = (rawUrl ?? fallback).trim()

  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`
  const url = new URL(withProtocol)

  url.username = ''
  url.password = ''
  url.search = ''
  url.hash = ''
  url.pathname = ''

  return url
}

export function getSiteUrl(): URL {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      process.env.VERCEL_URL,
  )
}
