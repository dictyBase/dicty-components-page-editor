const getYouTubeID = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/+|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i,
  )
  if (match && match.length > 0) {
    return match[1]
  }
  return url
}

const getVimeoID = (url: string) => {
  const match = url.match(
    /\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i,
  )
  if (match && match.length > 0) {
    return match[1]
  }
  return url
}

const getVideoID = (url: string) => {
  if (url.includes("youtube")) {
    return getYouTubeID(url)
  }
  if (url.includes("vimeo")) {
    return getVimeoID(url)
  }
  alert("Can only accept YouTube or Vimeo URL")
  return url
}

export { getYouTubeID, getVimeoID }
export default getVideoID
