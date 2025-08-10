export interface ICv {
    profile: ICvProfile;
    skill: ICvSkill;
    summary: ICvSummary;
    experience: ICvExperience[];
    referecence: ICvReference[];
    education: ICvEducation[];
}

export interface ICvProfile {
    photo: string;
    name: string;
    email: string;
    address: string;
    position: string;
    number: string;
    links: ICvLink[];
}

export type ICvLink = ICvBase

export interface ICvSkill {
    frontend: ICvSkillObj;
    backend: ICvSkillObj;
    databases: ICvSkillObj;
    miscellaneuos: ICvSkillObj;
}

export interface ICvSkillObj {
    level: number | string;
    list: string[];
}

export interface ICvSummary {
    title: string;
}

export interface ICvExperience {
    timeperiod: string;
    position: string;
    company: IGSheet;
    technologies: string[];
    descriptions: string[];
    expApps: ICvExpApp[];
}

export interface ICvExpApp {
    expApp: IGSheet;
    expAppTechs: string[];
    expAppSpecs: IGSheet[];
    expAppConts: IGSheet[];
    expAppImgs: IGSheet[];
}

export interface ICvExperienceApp {
    timeperiod: string;
    position: string;
    company: string;
    technologies: string[];
    descriptions: string[];
}

export interface ICvReference {
    list: ICvBase[]
}

export interface ICvEducation {
    list: IGSheet[]
}

export interface ICvBase {
    key: string;
    value: string;
}

export interface IGSheet extends ICvBase {
    key2?: string;
    key3?: string;
    groupId: string;
    value2: string;
    value3: string;
    description: string;
}

export class GSheetLib {
    public static readonly KEY_GROUP_ID = "groupId";
    public static readonly KEY_KEY = "key";
    public static readonly KEY_VALUE = "value";
    public static readonly KEY_DESCRIPTION = "description";

    public static readonly CV_PROFILE = "CVPRL";
    public static readonly CV_SKILL = "CVSKL";
    public static readonly CV_SUMMARY = "CVSMY";
    public static readonly CV_EXPERIENCE = "CVEXP";
    public static readonly CV_REFERENCE = "CVREF";
    public static readonly CV_EDUCATION = "CVEDU";
    public static readonly CV_TABTITLE = "CVTABTITLE";
}