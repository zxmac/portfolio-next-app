import { ICvProfile } from "@/app/interfaces/cv.interface";
import SimpleIcon from "../ui/simple-icon/simple-icon";
import ProfileTechCard from "./profile-tech-card";

interface IProfileProps {
    data: ICvProfile
}

export default function Profile(props: IProfileProps) {
    const { data } = props
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">            
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.photo} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{data.position}</span>

                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                    {data.links && data.links.map((link, i) => 
                        <li key={i} className="flex items-center">
                            <SimpleIcon className="icon-c-red mr-2" iconSlug={link.key} height="12px" width="12px"></SimpleIcon>
                            <a className="text-[12px]" href={link.value} target="_blank" rel="noopener noreferrer">
                                <span>{link.value}</span>
                            </a>
                        </li>                  
                    )}
                </ul>
            </div>
            <div className="flex flex-col items-center p-5">
                <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-5">
                    { data.techs && data.techs.map((tech, i) => 
                        <ProfileTechCard key={i} data={tech}></ProfileTechCard>
                    ) }
                </div>                
            </div>
        </div>
    );
}