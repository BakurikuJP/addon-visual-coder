import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { Language } from '../i18n';
import { blockText } from './locale';

export const initPositionBlocks = (language: Language) => {
  Blockly.Blocks['position_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '座標', 'Position'))
        .appendField('X:')
        .appendField(new Blockly.FieldNumber(0), 'X')
        .appendField('Y:')
        .appendField(new Blockly.FieldNumber(0), 'Y')
        .appendField('Z:')
        .appendField(new Blockly.FieldNumber(0), 'Z');
      this.setOutput(true, 'Vector3');
      this.setColour(160);
      this.setTooltip(blockText(language, 'Minecraft内の座標を表すVector3オブジェクトを作成します', 'Creates a Vector3 object for a Minecraft position'));
    },
  };

  javascriptGenerator['position_block'] = function (block: Blockly.Block) {
    const x = block.getFieldValue('X');
    const y = block.getFieldValue('Y');
    const z = block.getFieldValue('Z');
    return [`{ x: ${x}, y: ${y}, z: ${z} }`, javascriptGenerator.ORDER_ATOMIC];
  };

  Blockly.Blocks['player_position_block'] = {
    init: function () {
      this.appendDummyInput().appendField(blockText(language, 'プレイヤーの座標', 'Player Position'));
      this.setOutput(true, 'Vector3');
      this.setColour(230);
      this.setTooltip(blockText(language, 'プレイヤーの現在位置を取得します', 'Gets the player current position'));
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['player_position_block'] = function () {
    return ['event.source.location', javascriptGenerator.ORDER_MEMBER];
  };

  Blockly.Blocks['add_positions_block'] = {
    init: function () {
      this.appendValueInput('POSITION1')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標の和', 'Add Positions'));
      this.appendValueInput('POSITION2').setCheck('Vector3').appendField('+');
      this.setInputsInline(true);
      this.setOutput(true, 'Vector3');
      this.setColour(160);
      this.setTooltip(blockText(language, '2つの座標を足し合わせます', 'Adds two positions together'));
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['add_positions_block'] = function (block: Blockly.Block) {
    const position1 = javascriptGenerator.valueToCode(block, 'POSITION1', javascriptGenerator.ORDER_MEMBER) || '{ x: 0, y: 0, z: 0 }';
    const position2 = javascriptGenerator.valueToCode(block, 'POSITION2', javascriptGenerator.ORDER_MEMBER) || '{ x: 0, y: 0, z: 0 }';
    return [
      `{ x: (${position1}).x + (${position2}).x, y: (${position1}).y + (${position2}).y, z: (${position1}).z + (${position2}).z }`,
      javascriptGenerator.ORDER_ATOMIC,
    ];
  };
};
