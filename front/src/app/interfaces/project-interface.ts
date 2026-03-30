import {ImagesInterface} from './image-interface';
import {SkillsInterface} from './skill-interface';

export interface ProjectInterface {
  id: number;
  name: string;
  url: string;
  is_github: boolean;
  description: string;
  short_description: string;
  date_start: string;
  date_end: string;
  images: ImagesInterface;
  skills: SkillsInterface;
}

export type ProjectsInterface = ProjectInterface[];
