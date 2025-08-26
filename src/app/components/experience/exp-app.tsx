import { ICvExperience } from "@/app/models/cv.model"
import ExpAppWrapper from "./exp-app-wrapper"

interface IExpAppProps {
    data: ICvExperience[]
}

export default function ExpApp(props: IExpAppProps) {
    const { data } = props
    return (
        <>
            { data && data.filter(x => x.expApps.length).map((exp, i) => 
                <ExpAppWrapper key={i} data={exp}></ExpAppWrapper>
            ) }
        </>
    )
}