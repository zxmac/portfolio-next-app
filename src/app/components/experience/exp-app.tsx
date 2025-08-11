import { ICvExperience } from "@/app/interfaces/cv.interface"
import ExpAppCard from "./exp-app-card"

interface IExpAppProps {
    data: ICvExperience
}

export default function ExpApp(props: IExpAppProps) {
    const { data } = props
    return (
        <div className="mb-8">
            <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
                <div className="grid grid-cols-3">
                
                    <div className="col-span-2">
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.company.value2}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.company.description}</p>
                        </div>
                    </div>

                    <div className="flex justify-end col-span-1">  
                        <button data-tooltip-target="card-image-example-toggle-rtl" data-toggle-direction="ltr" type="button" className="toggle-rtl flex items-center w-9 h-9 mr-3 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        RTL
                        </button> 
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