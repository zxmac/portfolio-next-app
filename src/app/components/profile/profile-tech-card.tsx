import { IGSheet } from "@/app/interfaces/cv.interface"
import SimpleIcon from "../ui/simple-icon/simple-icon"

interface IExpAppProps {
    data: IGSheet,
    clssName: string
}

export default function ProfileTechCard(props: IExpAppProps) {
    const { data } = props
    const techs = data.value2.split(',')
    const defClass = "bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700";
    return (
        <div className={props.clssName ? `${defClass} ${props.clssName}` : defClass}>
            <div className="w-full p-2 border-b border-gray-200 rounded-t-xl dark:border-gray-600 ">
                <div className="flex flex-col items-center">
                    <div className="flex p-1">
                        <SimpleIcon className="profile-tech-icon mr-[5px]" iconSlug={data.value3} height="20" width="20" />
                        <p className="text-sm text-center">{data.value}</p>
                    </div>
                </div>
            </div>
            
            <div className="p-3">
                <div style={{ display: 'ruby' }}>                    
                    { techs.map((x, i) => 
                        <div key={i} className="flex mr-[8px] mb-[5px]">
                            <span style={{ fontSize: '12px' }}>{x}</span>
                            <SimpleIcon className="icon-color" style={{ marginLeft: '2px' }} key={i} iconSlug={x} height="14" width="14" />
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}