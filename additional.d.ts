declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const scssClassNames: IClassNames

  export = scssClassNames
}


// -----------------------------------------------------------


interface Window {
  ethereum: any
}
