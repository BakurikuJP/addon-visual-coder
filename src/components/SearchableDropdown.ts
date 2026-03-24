import * as Blockly from 'blockly/core';
import { getBlocklyItemOptions, getItemLabel, getItemLanguage, MINECRAFT_ITEMS } from '../constants/items';

const style = document.createElement('style');
style.textContent = `
  .blockly-searchable-dropdown {
    padding: 8px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .blockly-searchable-dropdown-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .blockly-searchable-dropdown-options {
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .blockly-searchable-dropdown-option {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .blockly-searchable-dropdown-option:hover {
    background-color: #f0f0f0;
  }
`;
document.head.appendChild(style);

export class SearchableDropdown extends Blockly.FieldDropdown {
  private searchInput: HTMLInputElement | null = null;
  private dropdownDiv: HTMLDivElement | null = null;
  private filteredOptions: string[][] = [...getBlocklyItemOptions()];

  constructor() {
    super(() => getBlocklyItemOptions());
  }

  protected showEditor_() {
    this.filteredOptions = [...getBlocklyItemOptions()];
    this.dropdownDiv = document.createElement('div');
    this.dropdownDiv.className = 'blockly-searchable-dropdown';

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.placeholder = getItemLanguage() === 'en' ? 'Search items...' : 'アイテムを検索...';
    this.searchInput.className = 'blockly-searchable-dropdown-input';
    this.searchInput.addEventListener('input', () => this.filterOptions());
    this.dropdownDiv.appendChild(this.searchInput);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'blockly-searchable-dropdown-options';
    this.dropdownDiv.appendChild(optionsContainer);

    this.renderOptions(optionsContainer);

    Blockly.DropDownDiv.getContentDiv().appendChild(this.dropdownDiv);
    Blockly.DropDownDiv.showPositionedByField(
      this as unknown as Blockly.Field<string>,
      () => this.dropdownDiv,
      this.sourceBlock_?.RTL ? 1 : 0,
    );

    this.searchInput.focus();
  }

  private filterOptions() {
    if (!this.searchInput) return;

    const searchTerm = this.searchInput.value.toLowerCase();
    this.filteredOptions = getBlocklyItemOptions().filter(([label, value]) => {
      const plainValue = value.replace('minecraft:', '').toLowerCase();
      return label.toLowerCase().includes(searchTerm) || plainValue.includes(searchTerm);
    });

    if (this.dropdownDiv) {
      const optionsContainer = this.dropdownDiv.querySelector('.blockly-searchable-dropdown-options');
      if (optionsContainer) {
        this.renderOptions(optionsContainer as HTMLDivElement);
      }
    }
  }

  private renderOptions(container: HTMLDivElement) {
    container.innerHTML = '';

    this.filteredOptions.forEach(([label, value]) => {
      const option = document.createElement('div');
      option.className = 'blockly-searchable-dropdown-option';
      option.textContent = label;
      option.addEventListener('click', () => {
        this.setValue(value);
        Blockly.DropDownDiv.hideIfOwner(this as unknown as Blockly.Field<string>);
      });
      container.appendChild(option);
    });
  }

  override getText_() {
    const item = MINECRAFT_ITEMS.find((entry) => entry.value === this.getValue());
    return item ? getItemLabel(item) : super.getText_();
  }
}

export function createSearchableDropdown() {
  return new SearchableDropdown();
}
