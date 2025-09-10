import { CvExperience } from "@/app/models/cv.model"
import ExpAppCard from "./exp-app-card"
import SimpleIcon from "../ui/simple-icon/simple-icon"

interface IExpAppWrapperProps {
    data: CvExperience
}

export default function ExpAppWrapper(props: IExpAppWrapperProps) {
    const { data } = props
    return (
        <div className="mb-8">
            <div className="w-full p-2 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
                <div className="grid grid-cols-3">                
                    <div className="col-span-2">
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">{data.company.value2}</h5>
                            <div className="pt-2">
                                <div className="flex">
                                    <SimpleIcon className="filter-inv-3 mr-2" iconSlug="corporate" height="15" width="15"></SimpleIcon>
                                    <p className="text-sm">{data.position}</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="flex">
                                    <SimpleIcon className="filter-inv-3 mr-2" iconSlug="calendar-days-solid" height="15" width="15"></SimpleIcon>
                                    <p className="text-sm">{data.timeperiod}</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="flex">
                                    <SimpleIcon className="filter-inv-3 mr-2" iconSlug="location" height="15" width="15"></SimpleIcon>
                                    <p className="text-sm">{data.company.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end col-span-1">
                    </div>
                </div>
            </div>
            <div className="code-preview-wrapper">
                <div className="flex p-0 bg-white rounded-b-xl border border-gray-200 bg-gradient-to-r code-preview dark:bg-gray-900 border-x dark:border-gray-600">
                    <div className="p-5">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
                            { data.expApps && data.expApps.map((expApp, i) => 
                                <ExpAppCard key={i} data={expApp}></ExpAppCard>
                            ) }
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}