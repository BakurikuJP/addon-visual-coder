import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { Language } from '../i18n';
import { blockText } from './locale';

export function initInventoryBlocks(language: Language) {
  Blockly.Blocks['inventory_add_item'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'インベントリにアイテムを追加', 'add item to inventory'))
        .appendField(blockText(language, 'アイテム:', 'item:'))
        .appendField(new SearchableDropdown(), 'ITEM')
        .appendField(blockText(language, '個数:', 'count:'))
        .appendField(new Blockly.FieldNumber(1, 1, 64), 'COUNT')
        .appendField(blockText(language, 'スロット:', 'slot:'))
        .appendField(new Blockly.FieldNumber(0, 0, 35), 'SLOT');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(180);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーのインベントリに指定したアイテムを追加します。',
          'Adds the selected item to the player inventory.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['inventory_remove_item'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(
          blockText(language, 'インベントリからアイテムを削除', 'remove item from inventory'),
        )
        .appendField(blockText(language, 'アイテム:', 'item:'))
        .appendField(new SearchableDropdown(), 'ITEM')
        .appendField(blockText(language, '個数:', 'count:'))
        .appendField(new Blockly.FieldNumber(1, 1, 64), 'COUNT');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(180);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーのインベントリから指定したアイテムを削除します。',
          'Removes the selected item from the player inventory.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['inventory_clear'] = {
    init: function () {
      this.appendDummyInput().appendField(
        blockText(language, 'インベントリをクリア', 'clear inventory'),
      );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(180);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーのインベントリをすべてクリアします。',
          'Clears the entire player inventory.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['equip_item'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '装備を変更', 'equip item'))
        .appendField(blockText(language, 'スロット:', 'slot:'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '頭', 'head'), 'head'],
            [blockText(language, '胴体', 'chest'), 'chest'],
            [blockText(language, '脚', 'legs'), 'legs'],
            [blockText(language, '足', 'feet'), 'feet'],
            [blockText(language, 'メインハンド', 'main hand'), 'mainhand'],
            [blockText(language, 'オフハンド', 'off hand'), 'offhand'],
          ]),
          'SLOT',
        )
        .appendField(blockText(language, 'アイテム:', 'item:'))
        .appendField(new SearchableDropdown(), 'ITEM');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(180);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーの装備を変更します。',
          'Changes the player equipment.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_inventory'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もし', 'if'))
        .appendField(
          new Blockly.FieldDropdown([
            [
              blockText(language, 'インベントリに指定のアイテムがある', 'inventory has the item'),
              'has_item',
            ],
            [blockText(language, 'インベントリに空きがある', 'inventory has space'), 'has_space'],
            [blockText(language, '指定の装備をしている', 'item is equipped'), 'has_equipment'],
          ]),
          'CHECK_TYPE',
        );
      this.appendDummyInput()
        .appendField(blockText(language, 'アイテム:', 'item:'))
        .appendField(new SearchableDropdown(), 'ITEM');
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE')
        .appendField(blockText(language, 'でなければ', 'otherwise'))
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(180);
      this.setTooltip(
        blockText(
          language,
          'インベントリの状態を確認します。',
          'Checks the inventory state.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['inventory_add_item'] = function (block: Blockly.Block) {
    const item = block.getFieldValue('ITEM');
    const count = block.getFieldValue('COUNT');
    const slot = block.getFieldValue('SLOT');
    return `const inventory = event.source.getComponent("inventory");
inventory.container.setItem(${slot}, new ItemStack("${item}", ${count}));
`;
  };

  javascriptGenerator['inventory_remove_item'] = function (block: Blockly.Block) {
    const item = block.getFieldValue('ITEM');
    const count = block.getFieldValue('COUNT');
    return `event.source.runCommand(\`clear @s ${item} ${count}\`);
`;
  };

  javascriptGenerator['inventory_clear'] = function () {
    return 'event.source.runCommand(`clear @s`);\n';
  };

  javascriptGenerator['equip_item'] = function (block: Blockly.Block) {
    const slot = block.getFieldValue('SLOT');
    const item = block.getFieldValue('ITEM');
    const targetSlot = slot === 'mainhand' || slot === 'offhand' ? `slot.weapon.${slot}` : `slot.armor.${slot}`;
    return `event.source.runCommand(\`replaceitem entity @s ${targetSlot} ${item}\`);
`;
  };

  javascriptGenerator['check_inventory'] = function (block: Blockly.Block) {
    const checkType = block.getFieldValue('CHECK_TYPE');
    const item = block.getFieldValue('ITEM');
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    const elseStatements = javascriptGenerator.statementToCode(block, 'ELSE');

    let code = '';

    switch (checkType) {
      case 'has_item':
        code = `const inventory = event.source.getComponent("inventory");
if (inventory.container.getItemCount("${item}") > 0) {
${statements}} else {
${elseStatements}}`;
        break;
      case 'has_space':
        code = `const inventory = event.source.getComponent("inventory");
if (inventory.container.emptySlotsCount > 0) {
${statements}} else {
${elseStatements}}`;
        break;
      case 'has_equipment':
        code = `const equipment = event.source.getComponent("equipment_inventory");
if (equipment.getEquipment("${item}") !== undefined) {
${statements}} else {
${elseStatements}}`;
        break;
    }

    return `${code}\n`;
  };
}
