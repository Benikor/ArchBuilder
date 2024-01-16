export interface Skill {
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
