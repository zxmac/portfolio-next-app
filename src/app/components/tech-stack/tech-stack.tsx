import { ICvTechStack } from "@/app/interfaces/cv.interface"
import TechStackCard from "./tech-stack-card"

interface ITechStackProps {
    data: ICvTechStack
}

export default function TechStack(props: ITechStackProps) {
    const { data } = props
    return (
        <div className="flex flex-col items-center">
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5">
                { data.techs && data.techs.map((tech, i) => 
                    <TechStackCard key={i} clssName={tech.value == "Miscellaneous" && data.screenWidth >= 640 ? "col-span-3" : ""} data={tech}></TechStackCard>
                )}
            </div>
        </div>
    )
}