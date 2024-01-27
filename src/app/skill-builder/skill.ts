export interface Skill {
  type: string;
  name: string;
  imgPath: string;
  level: number;
  description: string;
  requiredLevels: [number];
  requiredSpentHeroicPoints: [number];
  requiredSkillPoints: [number];
  requiredHeroicPoints: [number];
  requiredSkills: {};
  stats: {};
}
