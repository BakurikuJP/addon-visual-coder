import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { Language } from '../i18n';
import { blockText, scoreCompareOptions } from './locale';

export function initScoreboardBlocks(language: Language) {
  Blockly.Blocks['create_scoreboard'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'スコアボードを作成', 'Create scoreboard'))
        .appendField(blockText(language, '名前:', 'Name:'))
        .appendField(new Blockly.FieldTextInput('score'), 'OBJECTIVE')
        .appendField(blockText(language, '表示名:', 'Display name:'))
        .appendField(new Blockly.FieldTextInput(blockText(language, 'スコア', 'Score')), 'DISPLAY_NAME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip(blockText(language, '新しいスコアボードを作成します', 'Creates a new scoreboard'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['set_score'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'スコアを', 'Score'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '設定', 'Set'), 'set'],
            [blockText(language, '加算', 'Add'), 'add'],
            [blockText(language, '減算', 'Remove'), 'remove'],
          ]),
          'ACTION',
        )
        .appendField(blockText(language, 'スコアボード:', 'Objective:'))
        .appendField(new Blockly.FieldTextInput('score'), 'OBJECTIVE')
        .appendField(blockText(language, '値:', 'Value:'))
        .appendField(new Blockly.FieldNumber(1, -999999, 999999), 'VALUE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip(blockText(language, 'プレイヤーのスコアを変更します', 'Changes the player score'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_score'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もしスコアが', 'If score'))
        .appendField(blockText(language, 'スコアボード:', 'Objective:'))
        .appendField(new Blockly.FieldTextInput('score'), 'OBJECTIVE')
        .appendField(new Blockly.FieldDropdown(scoreCompareOptions(language)), 'COMPARE')
        .appendField(blockText(language, '値:', 'Value:'))
        .appendField(new Blockly.FieldNumber(0), 'VALUE');
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE').appendField(blockText(language, 'でなければ', 'Else')).setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip(blockText(language, 'スコアを条件として確認します', 'Checks score as a condition'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['display_scoreboard'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'スコアボードを', 'Scoreboard'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '表示', 'Show'), 'show'],
            [blockText(language, '非表示', 'Hide'), 'hide'],
          ]),
          'ACTION',
        )
        .appendField(blockText(language, 'スコアボード:', 'Objective:'))
        .appendField(new Blockly.FieldTextInput('score'), 'OBJECTIVE')
        .appendField(blockText(language, '表示位置:', 'Display slot:'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, 'サイドバー', 'Sidebar'), 'sidebar'],
            [blockText(language, 'リスト', 'List'), 'list'],
            [blockText(language, '名前の下', 'Below Name'), 'belowname'],
          ]),
          'DISPLAY_SLOT',
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip(blockText(language, 'スコアボードの表示設定を変更します', 'Changes scoreboard display settings'));
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['create_scoreboard'] = function (block: Blockly.Block) {
    const objective = block.getFieldValue('OBJECTIVE');
    const displayName = block.getFieldValue('DISPLAY_NAME');
    return `    event.source.runCommand(\`scoreboard objectives add ${objective} dummy "${displayName}"\`);\n`;
  };

  javascriptGenerator['set_score'] = function (block: Blockly.Block) {
    const action = block.getFieldValue('ACTION');
    const objective = block.getFieldValue('OBJECTIVE');
    const value = block.getFieldValue('VALUE');
    const command =
      action === 'set'
        ? `scoreboard players set @s ${objective} ${value}`
        : action === 'add'
          ? `scoreboard players add @s ${objective} ${value}`
          : `scoreboard players remove @s ${objective} ${value}`;

    return `    event.source.runCommand(\`${command}\`);\n`;
  };

  javascriptGenerator['check_score'] = function (block: Blockly.Block) {
    const objective = block.getFieldValue('OBJECTIVE');
    const compare = block.getFieldValue('COMPARE');
    const value = block.getFieldValue('VALUE');
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    const elseStatements = javascriptGenerator.statementToCode(block, 'ELSE');

    return `    const score = event.source.runCommand(\`scoreboard players test @s ${objective} *\`).statusMessage.split(" ")[1];
    if (parseInt(score) ${compare} ${value}) {
${statements}    } else {
${elseStatements}    }\n`;
  };

  javascriptGenerator['display_scoreboard'] = function (block: Blockly.Block) {
    const action = block.getFieldValue('ACTION');
    const objective = block.getFieldValue('OBJECTIVE');
    const displaySlot = block.getFieldValue('DISPLAY_SLOT');

    if (action === 'show') {
      return `    event.source.runCommand(\`scoreboard objectives setdisplay ${displaySlot} ${objective}\`);\n`;
    }

    return `    event.source.runCommand(\`scoreboard objectives setdisplay ${displaySlot}\`);\n`;
  };
}
