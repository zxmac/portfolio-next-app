import { IGSheet } from "@/app/interfaces/cv.interface"
import SimpleIcon from "../ui/simple-icon/simple-icon"

interface IExpAppProps {
    data: IGSheet
}

export default function ProfileTechCard(props: IExpAppProps) {
    const { data } = props
    const techs = data.value2.split(',')
    // const images = props.data.expAppTechs.filter(x => x)
    return (
        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p className="text-base">{data.value}</p>
            <div style={{ paddingTop: '5px', display: 'ruby' }}>                    
                { techs.map((x, i) => 
                    <div key={i} className="flex pr-[5px] pb-[5px]">
                        <span style={{ fontSize: '12px' }}>{x}</span>
                        <SimpleIcon className="icon-color" style={{ marginLeft: '2px' }} key={i} iconSlug={x} height="14" width="14" />
                    </div>)
                }
            </div>
        </div>
    )
}