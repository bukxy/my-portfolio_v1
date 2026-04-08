import {ImagesInterface} from './image-interface';
import {SkillsInterface} from './skill-interface';
import { CategoryInterface } from './category-interface';

export interface ProjectFilter {
  categoryIds?: number[];
  skillIds?: number[];
}

export interface ProjectInterface {
  id: number;
  name: string;
  url: string;
  is_github: boolean;
  description: string;
  short_description: string;
  date_start: string;
  date_end: string;
  category?: CategoryInterface;
  images: ImagesInterface;
  skills: SkillsInterface;
}

export type ProjectsInterface = ProjectInterface[];
