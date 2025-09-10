import { CvExpApp } from "@/app/models/cv.model"
import SimpleIcon from "../ui/simple-icon/simple-icon"
import Carousel from "../ui/carousel/carousel"

interface IExpAppProps {
    data: CvExpApp
}

export default function ExpAppCard(props: IExpAppProps) {
    const { data } = props
    const images = props.data.expAppImgs.map(x => x.value2).filter(x => x)
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            { !images?.length && data.expApp.value2 &&
                <div>
                    <img className="rounded-t-lg object-contain md:max-h-[450px] sm:max-h-[200px] m-auto" src={data.expApp.value2} alt="" />
                </div>
            }

            { !!images?.length && <Carousel images={images}></Carousel> }
            
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
                                <SimpleIcon className="filter-inv-4" style={{ marginLeft: '2px' }} key={i} iconSlug={x} height="14" width="14" />
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}