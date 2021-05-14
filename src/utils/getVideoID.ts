const youTubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/+|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i
const vimeoRegex = /\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i

const getVideoID = (url: string) => {
  let match
  if (url.includes("youtube")) {
    match = url.match(youTubeRegex)
  }
  if (url.includes("vimeo")) {
    match = url.match(vimeoRegex)
  }
  if (match && match.length > 0) {
    return match[1]
  }

  alert("Can only accept YouTube or Vimeo URL")
  return url
}

export default getVideoID
