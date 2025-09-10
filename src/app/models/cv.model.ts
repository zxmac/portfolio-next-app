export interface Cv {
    profile: CvProfile;
    skill: CvSkill;
    summary: CvSummary;
    experience: CvExperience[];
    referecence: CvReference[];
    education: CvEducation[];
    techStack: CvTechStack;
}

export interface CvProfile {
    photo: string;
    name: string;
    email: string;
    emailObj: GSheet;
    address: string;
    addressObj: GSheet;
    position: string;
    number: string;
    numberObj: GSheet;    
    links: GSheet[];
}

export interface CvTechStack {
    techs: GSheet[];
}

export type CvLink = CvBase

export interface CvSkill {
    frontend: CvSkillObj;
    backend: CvSkillObj;
    databases: CvSkillObj;
    miscellaneuos: CvSkillObj;
}

export interface CvSkillObj {
    level: number | string;
    list: string[];
}

export interface CvSummary {
    title: string;
}

export interface CvExperience {
    timeperiod: string;
    position: string;
    company: GSheet;
    technologies: string[];
    descriptions: string[];
    expApps: CvExpApp[];
}

export interface CvExpApp {
    expApp: GSheet;
    expAppTechs: string[];
    expAppSpecs: GSheet[];
    expAppConts: GSheet[];
    expAppImgs: GSheet[];
}

export interface CvExperienceApp {
    timeperiod: string;
    position: string;
    company: string;
    technologies: string[];
    descriptions: string[];
}

export interface CvReference {
    list: CvBase[]
}

export interface CvEducation {
    list: GSheet[]
}

export interface CvBase {
    key: string;
    value: string;
}

export interface GSheet extends CvBase {
    key2?: string;
    key3?: string;
    groupId: string;
    value2: string;
    value3: string;
    description: string;
}

