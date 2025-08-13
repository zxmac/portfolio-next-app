import SimpleIcon from "../simple-icon/simple-icon"

interface ISeparatorProps {
    icon: string
    height?: string
    width?: string
    size?: string
    className?: string
}

export default function Separator(props: ISeparatorProps) {
    const { icon, size, className } = props
    let { height, width } = props
    if (size) {
        height = size
        width = size
    }
    const defClass = "flex items-center"
    return (
        <div className={className ? `${className} ${defClass}` : defClass}>
          <div className="flex-grow border-t border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"></div>
          <SimpleIcon className="p-[5px] filter-inv-5" iconSlug={icon} height={height} width={width} />
          {/* <span className="px-4 text-gray-500">Experience</span> */}
          <div className="flex-grow border-t border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"></div>
        </div>
    )
}