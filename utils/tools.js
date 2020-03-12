const dev = process.env.NODE_ENV !== 'production'

export const getHostName = () => {
  if (dev) { 
    return "http://localhost:8000"
  }

  return "https://api.tieuhoan.dev"
}
