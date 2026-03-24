import { initEventBlocks } from './eventBlocks';
import { initActionBlocks } from './actionBlocks';
import { initConditionBlocks } from './conditionBlocks';
import { initTimeBlocks } from './timeBlocks';
import { initScoreboardBlocks } from './scoreboardBlocks';
import { initGameSettingsBlocks } from './gameSettingsBlocks';
import { initInventoryBlocks } from './inventoryBlocks';
import { initPositionBlocks } from './position';
import { initDataBlocks } from './dataBlocks';
import { Language } from '../i18n';

export function initCustomBlocks(language: Language) {
  initEventBlocks(language);
  initActionBlocks(language);
  initConditionBlocks(language);
  initTimeBlocks(language);
  initScoreboardBlocks(language);
  initGameSettingsBlocks(language);
  initInventoryBlocks(language);
  initPositionBlocks(language);
  initDataBlocks(language);
}
