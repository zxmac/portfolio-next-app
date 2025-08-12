import { IGSheet } from "@/app/interfaces/cv.interface"
import SimpleIcon from "../ui/simple-icon/simple-icon"

interface IExpAppProps {
    data: IGSheet
}

export default function ProfileTechCard(props: IExpAppProps) {
    const { data } = props
    const techs = data.value2.split(',')
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full p-2 border-b border-gray-200 rounded-t-xl dark:border-gray-600 ">
                <p className="text-base text-center">{data.value}</p>
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