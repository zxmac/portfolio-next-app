import { SheetLib } from "../lib/sheet.lib"
import { GSheet, CvExperience, CvReference, CvEducation } from "../models/cv.model"
import { GSheetConstant } from "../lib/constants/gsheet.contact"
import { GSheetService } from "./gsheet.services"

function map(sheet: GSheet[]) {
  const profileList = SheetLib.filterSheet(sheet, GSheetConstant.CV_PROFILE)
  const skillList = SheetLib.filterSheet(sheet, GSheetConstant.CV_SKILL)
  const summaryList = SheetLib.filterSheet(sheet, GSheetConstant.CV_SUMMARY)
  const experienceList = SheetLib.filterSheet(sheet, GSheetConstant.CV_EXPERIENCE)
  const referenceList = SheetLib.filterSheet(sheet, GSheetConstant.CV_REFERENCE)
  const educationList = SheetLib.filterSheet(sheet, GSheetConstant.CV_EDUCATION)
  return { profileList, skillList, summaryList, experienceList, referenceList, educationList }
}

async function get(sheetId: string) {
  const obj = await GSheetService.get(sheetId);
  const sheetValues = SheetLib.formatSheets(obj.valueRanges[0].values)
  const data = map(sheetValues)
  
  const techList = SheetLib.filterSheet(sheetValues, GSheetConstant.CV_TECH)
  const experienceList: GSheet[] = data.experienceList.map(sheet => {
    const keyArr = sheet.key.split('_')
    const key = `${keyArr[0]}_${keyArr[1]}`
    if (keyArr.length > 1) 
      return { ...sheet, key2: keyArr[2], key3: keyArr[3], key } as GSheet

    return { ...sheet, key} as GSheet
  })
  
  const experienceGroupObj = SheetLib.groupData(experienceList)
  const experienceGroupList = Object.keys(experienceGroupObj).map(key => {
    const list: GSheet[] = experienceGroupObj[key]
    const expList = list.filter(x => !x.key2 && !x.key3)
    const techObj = list.find(x => x.key2 == "TECH")
    const expAppCompany = list.find(x => x.key2 == "COMPANY")      
    
    const obj: CvExperience = {
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
      const expAppList: GSheet[] = expAppGroupObj[expAppKey]
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
        expAppImgs: expAppImgsObjList,
        expAppTechs_: expAppTechObj!.description
      }
    })      
    return obj
  })

  // reference group-mapping
  const referenceGroupObj = SheetLib.groupData(data.referenceList)
  const referenceGroupList: CvReference[] = Object.keys(referenceGroupObj).map(key => {
    const list: GSheet[] = referenceGroupObj[key]
    return {
      list: list.map(x => ({
        key: x.value2,
        value: x.value
      }))
    }
  })

  // education group-mapping
  const educationGroupObj = SheetLib.groupData(data.educationList)
  const educationGroupList: CvEducation[] = Object.keys(educationGroupObj).map(key => {
    const list: GSheet[] = educationGroupObj[key]
    return { list }
  })

  const objData = {
    profile: {
      photo: SheetLib.findData(data.profileList, "PHOTO"),
      name: SheetLib.findData(data.profileList, "NAME"),
      email: SheetLib.findData(data.profileList, "EMAIL"),
      emailObj: data.profileList.find(x => x.key == "EMAIL")!,
      address: SheetLib.findData(data.profileList, "ADDRESS"),
      addressObj: data.profileList.find(x => x.key == "ADDRESS")!,
      position: SheetLib.findData(data.profileList, "POSITION"),
      number: SheetLib.findData(data.profileList, "NUMBER"),
      numberObj: data.profileList.find(x => x.key == "NUMBER")!,        
      links: data.profileList.filter((x: GSheet) => x.key.includes("LINK_"))
    },
    techStack: {
      techs: techList
    },
    skill: {
      backend: {
        level: SheetLib.findData(data.skillList, "BACKEND_LVL"),
        list: SheetLib.filterData(data.skillList, "BACKEND")
      },
      frontend: {
        level: SheetLib.findData(data.skillList, "FRONTEND_LVL"),
        list: SheetLib.filterData(data.skillList, "FRONTEND")
      },
      databases: {
        level: SheetLib.findData(data.skillList, "DATABASES_LVL"),
        list: SheetLib.filterData(data.skillList, "DATABASES")
      },
      miscellaneuos: {
        level: SheetLib.findData(data.skillList, "MISCELLANEUOS_LVL"),
        list: SheetLib.filterData(data.skillList, "MISCELLANEUOS")
      }
    },
    summary: {
      title: SheetLib.findData(data.summaryList, "TITLE")
    },
    experience: experienceGroupList,
    referecence: referenceGroupList,
    education: educationGroupList
  }

  return objData
}

export const CvService = { get }