export interface Skill {
  type: string;
  name: string;
  imgPath: string;
  level: number;
  description: string;
  requiredLevels: [number];
  requiredSkillPoints: [number];
  requiredHeroicPoints: [number];
  requirements: {};
  stats: {};
}
