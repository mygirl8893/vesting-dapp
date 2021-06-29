import replaceSvgIds from './replaceSvgIds'


const getSvgData = (html) => {
  try {
    const svgText = html.replace(/<\?xml(.*?)\?>/, '')
    const svgTag = svgText.match(/<svg[^>]+>/)[0].replace(/[\n\t]/g, ' ')

    let body = svgText.replace('</svg>', '')
      .replace(/<svg[^>]+>/, '')
      .trim()

    body = replaceSvgIds(body)

    const svgAttributes = svgTag.match(/\w+="[\w\s.]+"/g)
      .reduce((obj, item) => {
        const [ key, value ] = item.split('=')

        return {
          ...obj,
          [key.trim()]: value.replace(/"/g, '').trim(),
        }
      }, {})

    return {
      body,
      svgAttributes,
    }
  }
  catch (error) {
    console.warn(error)
    return null
  }
}


export default getSvgData
