"use client"

import { useEffect, useState } from "react"
import { ICv, GSheetLib, IGSheet, ICvExperience, ICvReference, ICvEducation } from "./interfaces/cv.interface"
import { SheetLib } from "./lib/sheet.lib"
import Profile from "./components/profile/profile"
import ExpApp from "./components/experience/exp-app"
import { CommonLib } from "./lib/common.lib"
import Spinner from "./components/ui/spinner/spinner"

export default function Home() {
  const [cv, setCv] = useState<ICv>({ profile: { name: '', position: '' } } as ICv)
  const [data, setData] = useState<IGSheet[]>([])
  const [showLoader, setShowLoader] = useState(true)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const sp =  CommonLib.getSearchParams(window)
    setScreenWidth(window.innerWidth)

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sp.s}/values:batchGet?ranges=Sheet1&key=${sp.a}`)
      .then((response) => response.json())
      .then((data) => {
        setData(SheetLib.formatSheets(data.valueRanges[0].values))
        setShowLoader(false)
      })
  }, [])
  
  // const { data } = useGoogleSheets({
  //   apiKey: params.a,
  //   sheetId: params.s,
  //   sheetsOptions: [{ id: 'Sheet1' }],
  // })  
  
  useEffect(() => {
    if (!data || !data.length) return
    
    // const sheet: IGSheet[] = data[0].data as IGSheet[]
    const sheet: IGSheet[] = data
    const profileList = SheetLib.filterSheet(sheet, GSheetLib.CV_PROFILE)
    const skillList = SheetLib.filterSheet(sheet, GSheetLib.CV_SKILL)
    const summaryList = SheetLib.filterSheet(sheet, GSheetLib.CV_SUMMARY)
    const _experienceList = SheetLib.filterSheet(sheet, GSheetLib.CV_EXPERIENCE)
    const referenceList = SheetLib.filterSheet(sheet, GSheetLib.CV_REFERENCE)
    const educationList = SheetLib.filterSheet(sheet, GSheetLib.CV_EDUCATION)
    const tabTitleList = SheetLib.filterSheet(sheet, GSheetLib.CV_TABTITLE)
    const techList = SheetLib.filterSheet(sheet, GSheetLib.CV_TECH)
    
    const experienceList = _experienceList.map(sheet => {
      const keyArr = sheet.key.split('_')
      const key = `${keyArr[0]}_${keyArr[1]}`
      if (keyArr.length > 1) 
        return { ...sheet, key2: keyArr[2], key3: keyArr[3], key }

      return { ...sheet, key}
    })
    
    const experienceGroupObj = SheetLib.groupData(experienceList)
    const experienceGroupList = Object.keys(experienceGroupObj).map(key => {
      const list: IGSheet[] = experienceGroupObj[key]
      const expList = list.filter(x => !x.key2 && !x.key3)
      const techObj = list.find(x => x.key2 == "TECH")
      const expAppCompany = list.find(x => x.key2 == "COMPANY")      
      
      const obj: ICvExperience = {
        position: expList[0]?.value2,
        timeperiod: expList[0]?.value3,
        technologies: [],
        descriptions: expList.map(x => x.description),
        company: expAppCompany!,
        expApps: []
      }

      if (techObj) {
        obj.technologies = techObj.description.split(',')
      }

      const toGrpExperienceList =  list.filter(x => x.key2 && x.key3)
      const expAppGroupObj = SheetLib.groupData(toGrpExperienceList, "key2")

      obj.expApps = Object.keys(expAppGroupObj).map(expAppKey => {
        const expAppList: IGSheet[] = expAppGroupObj[expAppKey]
        const expAppObj = expAppList.find(x => x.key3 == "APP")
        const expAppTechObj = expAppList.find(x => x.key3 == "TECH")
        const expAppSpecObjList = expAppList.filter(x => x.key3 == "SPEC")
        const expAppContObjList = expAppList.filter(x => x.key3 == "CONT")
        const expAppImgsObjList = expAppList.filter(x => x.key3 == "IMG")
        
        return {
          expApp: expAppObj!,
          expAppTechs: expAppTechObj!.description?.split(','),
          expAppSpecs: expAppSpecObjList,
          expAppConts: expAppContObjList,
          expAppImgs: expAppImgsObjList
        }
      })
      
      return obj
    })

    // reference group-mapping
    const referenceGroupObj = SheetLib.groupData(referenceList)
    const referenceGroupList: ICvReference[] = Object.keys(referenceGroupObj).map(key => {
      const list: IGSheet[] = referenceGroupObj[key]
      return {
        list: list.map(x => ({
          key: x.value2,
          value: x.value
        }))
      }
    })

    // education group-mapping
    const educationGroupObj = SheetLib.groupData(educationList)
    const educationGroupList: ICvEducation[] = Object.keys(educationGroupObj).map(key => {
      const list: IGSheet[] = educationGroupObj[key]
      return { list }
    })

    if (tabTitleList?.length && tabTitleList[0]) {
      document.title = tabTitleList[0].value
    }
    
    setCv({
      profile: {
        photo: SheetLib.findData(profileList, "PHOTO"),
        name: SheetLib.findData(profileList, "NAME"),
        email: SheetLib.findData(profileList, "EMAIL"),
        emailObj: profileList.find(x => x.key == "EMAIL")!,
        address: SheetLib.findData(profileList, "ADDRESS"),
        addressObj: profileList.find(x => x.key == "ADDRESS")!,
        position: SheetLib.findData(profileList, "POSITION"),
        number: SheetLib.findData(profileList, "NUMBER"),
        numberObj: profileList.find(x => x.key == "NUMBER")!,        
        links: profileList.filter((x: IGSheet) => x.key.includes("LINK_")),
        techs: techList,
        screenWidth,
      },
      skill: {
        backend: {
          level: SheetLib.findData(skillList, "BACKEND_LVL"),
          list: SheetLib.filterData(skillList, "BACKEND")
        },
        frontend: {
          level: SheetLib.findData(skillList, "FRONTEND_LVL"),
          list: SheetLib.filterData(skillList, "FRONTEND")
        },
        databases: {
          level: SheetLib.findData(skillList, "DATABASES_LVL"),
          list: SheetLib.filterData(skillList, "DATABASES")
        },
        miscellaneuos: {
          level: SheetLib.findData(skillList, "MISCELLANEUOS_LVL"),
          list: SheetLib.filterData(skillList, "MISCELLANEUOS")
        }
      },
      summary: {
        title: SheetLib.findData(summaryList, "TITLE")
      },
      experience: experienceGroupList,
      referecence: referenceGroupList,
      education: educationGroupList
    })
  }, [data])

  return (
    <div className="font-roboto grid items-center dark:bg-gray-900">
      <div className="w-[75%] m-auto">
        <main className="flex flex-col row-start-2 items-center pb-8">

          { cv.profile && <Profile data={cv.profile}></Profile> }
        </main>

        <div style={{ opacity: showLoader ? 0 : 1 }}>
          { cv.experience && cv.experience.filter(x => x.expApps.length).map((exp, i) => 
            <ExpApp key={i} data={exp}></ExpApp>
          ) }
        </div>        
        
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          
        </footer>
      </div>
      
      { showLoader && <Spinner></Spinner> }
    </div>
  )
}
