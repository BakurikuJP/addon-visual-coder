import itemsData from './items.json';
import { Language } from '../i18n';

export interface MinecraftItem {
  label: string;
  value: string;
  category: 'blocks' | 'food' | 'materials' | 'special' | 'tools' | 'weapons';
}

let currentItemLanguage: Language = 'ja';

function getCategoryFromId(id: string): MinecraftItem['category'] {
  if (id.includes('block') || id.includes('stone') || id.includes('dirt') || id.includes('wood')) return 'blocks';
  if (id.includes('sword') || id.includes('bow') || id.includes('arrow')) return 'weapons';
  if (id.includes('pickaxe') || id.includes('axe') || id.includes('shovel')) return 'tools';
  if (id.includes('apple') || id.includes('bread') || id.includes('beef') || id.includes('food')) return 'food';
  if (id.includes('ingot') || id.includes('diamond') || id.includes('stick')) return 'materials';
  return 'special';
}

function toEnglishLabel(value: string) {
  const normalized = value.replace('minecraft:', '').replace(/_/g, ' ');
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
}

function generateItemsFromJson(): MinecraftItem[] {
  return itemsData.map((item) => ({
    label: item.name,
    value: item.id.startsWith('minecraft:') ? item.id : `minecraft:${item.id}`,
    category: getCategoryFromId(item.id),
  }));
}

export const MINECRAFT_ITEMS: MinecraftItem[] = generateItemsFromJson();

export function setItemLanguage(language: Language) {
  currentItemLanguage = language;
}

export function getItemLanguage() {
  return currentItemLanguage;
}

export function getItemLabel(item: MinecraftItem, language = currentItemLanguage) {
  return language === 'en' ? toEnglishLabel(item.value) : item.label;
}

export function getBlocklyItemOptions(language = currentItemLanguage): [string, string][] {
  return MINECRAFT_ITEMS.map((item) => [getItemLabel(item, language), item.value]);
}
