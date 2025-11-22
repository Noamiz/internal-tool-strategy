import type { ApiError, Result } from 'common-strategy'

const DEFAULT_BASE_URL = 'http://localhost:4000'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL

function normalizePath(path: string): string {
  if (!path.startsWith('/')) {
    return `/${path}`
  }

  return path
}

function buildUrl(path: string): string {
  return `${API_BASE_URL.replace(/\/$/, '')}${normalizePath(path)}`
}

function buildError<T>(message: string): Result<T> {
  const error: ApiError = {
    code: 'INTERNAL_SERVER_ERROR',
    message,
  }

  return { ok: false, error }
}

export async function getJson<T>(path: string): Promise<Result<T>> {
  try {
    const response = await fetch(buildUrl(path), {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return buildError<T>(`Request failed with status ${response.status}`)
    }

    const data = (await response.json()) as T
    return { ok: true, data }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to reach the internal API. Please try again.'
    return buildError<T>(message)
  }
}

