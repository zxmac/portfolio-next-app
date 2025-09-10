"use client"

import { useEffect, useState } from "react"
import Profile from "./components/profile/profile"
import ExpApp from "./components/experience/exp-app"
import { CommonLib } from "./lib/common.lib"
import Spinner from "./components/ui/spinner/spinner"
import Separator from "./components/ui/separator/separator"
import TechStack from "./components/tech-stack/tech-stack"
import { Cv } from "./models/cv.model"
import { CvService } from "./services/cv.service"

export default function Home() {
  const [cv, setCv] = useState<Cv>({ profile: { name: '', position: '' } } as Cv);
  const [showLoader, setShowLoader] = useState(true);
  
  useEffect(() => {
    const sp =  CommonLib.getSearchParams(window);
    
    (async () => {
      const data = await CvService.get(sp.s);
      setCv(data);
      setShowLoader(false);
    })();
  }, []);
  
  return (
    <div className="font-roboto grid items-center dark:bg-gray-900">
      { !showLoader ? 
        <div className="md:w-[75%] sm:w-full m-auto md:px-0 px-5">
          <Profile data={cv.profile}></Profile>
          <Separator icon="Tech Stack" size="42" className="pt-5 pb-5"></Separator>
          <TechStack data={cv.techStack}></TechStack>
          <Separator icon="Work Experience" size="42" className="pt-5 pb-5"></Separator>
          <ExpApp data={cv.experience}></ExpApp>
        </div>
        : <Spinner></Spinner>
      }
    </div>
  )
}
