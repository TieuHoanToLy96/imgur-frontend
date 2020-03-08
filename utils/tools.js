const dev = process.env.NODE_ENV !== 'production'

export const getHostName = isBackend => {
  if (dev) { 
    return isBackend ? "http://localhost:8000" : "http://localhost:8001"
  }

  return isBackend ? "https://backend.tieuhoan.dev" : "https://tieuhoan.dev"
}
