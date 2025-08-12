import { ICvExpApp } from "@/app/interfaces/cv.interface"
import SimpleIcon from "../ui/simple-icon/simple-icon"
import Carousel from "../ui/carousel/carousel"

interface IExpAppProps {
    data: ICvExpApp
}

export default function ExpAppCard(props: IExpAppProps) {
    const { data } = props
    const images = props.data.expAppImgs.map(x => x.value2).filter(x => x)
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {/* <a href="#">
                <img className="rounded-t-lg md:h-[323px] sm:h-[150px]" src={data.expApp.value2} alt="" />
            </a> */}
            { !images?.length && data.expApp.value2 &&
                <div>
                    <img className="rounded-t-lg object-contain md:max-h-[450px] sm:max-h-[200px] m-auto" src={data.expApp.value2} alt="" />
                </div>
            }

            {/* { !images?.length && 
                <div className="relative w-full max-w-lg mx-auto overflow-hidden">
                    <div className="flex" >
                        <div className="w-full flex-shrink-0">
                            <img
                                src={data.expApp.value2}
                                className="w-full h-auto object-cover max-h-[320px] h-[100%]" />
                        </div>
                    </div>
                </div>
            } */}

            { images?.length > 0 && <Carousel images={images}></Carousel> }
            
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">{data.expApp.value}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.expApp.description}</p>

                <div>
                    <p className="text-base">Technologies:</p>
                    <div style={{ paddingTop: '0', display: 'ruby' }}>                    
                        { props.data.expAppTechs && props.data.expAppTechs.map((x, i) => 
                            <div key={i} style={{ padding: '5px', display: 'flex'}}>
                                <span style={{ fontSize: '12px' }}>{x}</span>
                                <SimpleIcon className="icon-color" style={{ marginLeft: '2px' }} key={i} iconSlug={x} height="14" width="14" />
                            </div>)
                        }
                    </div>
                </div>

                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </a> */}
            </div>
        </div>
    )
}