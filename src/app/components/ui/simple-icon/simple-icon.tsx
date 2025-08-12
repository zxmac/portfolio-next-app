import { CSSProperties } from "react"

interface ISimpleIconProps {
    iconSlug: string
    color?: string
    height?: string
    width?: string
    style?: CSSProperties
    className?: string
}

export default function SimpleIcon(props: ISimpleIconProps) {
  const { height = "32", width = "32", style, className  } = props
  const { iconSlug } = props
  const clssName = "simple-icon" + (className ? ' ' + className : '')
  
  return (
    <img className={clssName} style={style} height={height} width={width} 
      src={'/portfolio-next-app/simple-icons/' + iconSlug.toLowerCase() + '.svg'} title={iconSlug}/>
  )
}
