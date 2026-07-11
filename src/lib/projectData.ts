import projectJsonEn from '../../public/project/project_en.json';
import projectJsonBn from '../../public/project/project_bn.json';
import projectJsonEs from '../../public/project/project_es.json';
import projectJsonFr from '../../public/project/project_fr.json';
import projectJsonDe from '../../public/project/project_de.json';
import projectJsonIt from '../../public/project/project_it.json';
import projectJsonJa from '../../public/project/project_ja.json';

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  live_demo?: string;
  github_repo?: string;
  case_study?: string;
  silicon_img_banner?: string;
  gearup_img_banner?: string;
  koda_img_banner?: string;
  screenshots?: string[];
  architecture?: any;
  tech_stack?: any;
  role?: string;
  responsibilities?: string[];
  challenges?: string[];
  outcome_profit?: any;
  sitemap_details?: any;
  api_endpoints_detail?: any;
  database_schema?: any;
  rental_flow?: any;
  future_enhancements?: string[];
  key_features?: any;
  api_endpoints?: any;
  performance_optimizations?: any;
  security_features?: string[];
}

export function getAllProjects(locale: string = 'en'): ProjectData[] {
  let projectJson;
  switch (locale) {
    case 'bn': projectJson = projectJsonBn; break;
    case 'es': projectJson = projectJsonEs; break;
    case 'fr': projectJson = projectJsonFr; break;
    case 'de': projectJson = projectJsonDe; break;
    case 'it': projectJson = projectJsonIt; break;
    case 'ja': projectJson = projectJsonJa; break;
    default: projectJson = projectJsonEn;
  }

  const allProjects: ProjectData[] = [];
  
  if ('projects1' in projectJson) {
    allProjects.push(...(projectJson as any).projects1);
  }
  if ('projects2' in projectJson) {
    allProjects.push(...(projectJson as any).projects2);
  }
  if ('projects3' in projectJson) {
    allProjects.push(...(projectJson as any).projects3);
  }
  if ('projects4' in projectJson) {
    allProjects.push(...(projectJson as any).projects4);
  }
  
  return allProjects;
}

export function getProjectById(id: string, locale: string = 'en'): ProjectData | undefined {
  const allProjects = getAllProjects(locale);
  return allProjects.find(p => p.id === id);
}

export function getProjectBanner(project: ProjectData): string {
  const bannerKey = Object.keys(project).find(key => key.endsWith('_img_banner'));
  if (bannerKey && (project as any)[bannerKey]) {
    const imgPath = (project as any)[bannerKey];
    return imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
  }
  return '/images/placeholder.svg';
}
