import { ICvExpApp } from "@/app/interfaces/cv.interface"

interface IExpAppProps {
    data: ICvExpApp
};

export default function ExpAppCard(props: IExpAppProps) {
    const { data } = props;
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={data.expApp.value2} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.expApp.value}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.expApp.description}</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </a>
            </div>
        </div>
    )
}