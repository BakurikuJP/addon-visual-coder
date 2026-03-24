import { initEventBlocks } from './eventBlocks';
import { initActionBlocks } from './actionBlocks';
import { initConditionBlocks } from './conditionBlocks';
import { initTimeBlocks } from './timeBlocks';
import { Language } from '../i18n';

export function initCustomBlocks(language: Language) {
  initEventBlocks(language);
  initActionBlocks(language);
  initConditionBlocks(language);
  initTimeBlocks(language);
}
