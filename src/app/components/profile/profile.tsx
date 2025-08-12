import { ICvProfile, IGSheet } from "@/app/interfaces/cv.interface";
import SimpleIcon from "../ui/simple-icon/simple-icon";
import ProfileTechCard from "./profile-tech-card";
import "./profile.css"

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
        // <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"> 
        // <div className="w-full border-b border-gray-200 pb-10">
        <div className="w-full">
            <div className="flex flex-col items-center pb-5">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.photo} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{data.position}</span>

                <ul className="max-w-md mt-[8px] space-y-1 text-gray-500 list-inside dark:text-gray-400">
                    {links && links.map((link, i) => 
                        <li key={i} className="flex items-center">
                            <SimpleIcon className="icon-link-c mr-2" iconSlug={link.value2} height="12px" width="12px"></SimpleIcon>
                            <a className={link.value3 == "disable" ? "text-[12px] pointer-events-none" : "text-[12px]"} 
                                href={link.value} target="_blank" rel="noopener noreferrer">
                                <span>{link.value}</span>
                            </a>
                        </li>                  
                    )}
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-5">
                    { data.techs && data.techs.map((tech, i) => 
                        <ProfileTechCard key={i} data={tech}></ProfileTechCard>
                    ) }
                </div>                
            </div>
        </div>
    );
}