import { Language } from '../i18n';

export const blockText = (language: Language, ja: string, en: string) =>
  language === 'en' ? en : ja;

export const compareOptions = (language: Language): [string, string][] => [
  [blockText(language, '以下', 'at most'), '<='],
  [blockText(language, '以上', 'at least'), '>='],
  [blockText(language, 'と等しい', 'equal to'), '=='],
];

export const scoreCompareOptions = (language: Language): [string, string][] => [
  [blockText(language, '以上', 'at least'), '>='],
  [blockText(language, '以下', 'at most'), '<='],
  [blockText(language, 'と等しい', 'equal to'), '=='],
  [blockText(language, 'より大きい', 'greater than'), '>'],
  [blockText(language, 'より小さい', 'less than'), '<'],
];

export const playerStateOptions = (language: Language): [string, string][] => [
  [blockText(language, '歩いている', 'walking'), 'isWalking'],
  [blockText(language, '泳いでいる', 'swimming'), 'isSwimming'],
  [blockText(language, '落下している', 'falling'), 'isFalling'],
  [blockText(language, '溶岩の中にいる', 'in lava'), 'isInLava'],
  [blockText(language, 'エンティティに乗っている', 'riding an entity'), 'isRiding'],
  [blockText(language, 'スニークしている', 'sneaking'), 'isSneaking'],
  [blockText(language, '走っている', 'sprinting'), 'isSprinting'],
];
