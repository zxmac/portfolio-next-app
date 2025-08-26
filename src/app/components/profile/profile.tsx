import { ICvProfile, IGSheet } from "@/app/models/cv.model";
import SimpleIcon from "../ui/simple-icon/simple-icon";

interface IProfileProps {
    data: ICvProfile
}

export default function Profile(props: IProfileProps) {
    const { data } = props
    let links: IGSheet[] = []
    if (data.links) {
        links = [data.addressObj, data.emailObj, data.numberObj, ...data.links]
    }
    return (
        <div className="flex flex-col row-start-2 items-center">
            <div className="w-full">
                <div className="flex flex-col items-center pt-3">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.photo} />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">{data.position}</span>
                    <ul className="max-w-md mt-[8px] space-y-1 text-gray-500 list-inside dark:text-gray-400">
                        {links && links.map((link, i) => 
                            <li key={i} className="flex items-center">
                                <SimpleIcon className="filter-inv-1 mr-2" iconSlug={link.value2} height="12px" width="12px"></SimpleIcon>
                                <a className={link.value3 == "disable" ? "text-[12px] pointer-events-none" : "text-[12px]"} 
                                    href={link.value} target="_blank" rel="noopener noreferrer">
                                    <span>{link.value}</span>
                                </a>
                            </li>                  
                        )}
                    </ul>
                </div>                
            </div>
        </div>       
    );
}