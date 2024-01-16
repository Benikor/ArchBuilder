export interface Skill {
  type: string;
  name: string;
  imgPath: string;
  level: number;
  description: string;
  requiredLevels: [number];
  requiredHeroicPoints: [number];
  skillPoints: [number];
  heroicPoints: [number];
  requiredSkills: {};
  stats: {};
}
