export interface Skill {
  name: string;
  imgPath: string;
  level: number;
  description: string;
  skillPoints: [number];
  heroicPoints: [number];
  requiredLevels: [number];
  requiredSkills: {};
  requiredHeroicPoints: number;
  stats: {};
}
