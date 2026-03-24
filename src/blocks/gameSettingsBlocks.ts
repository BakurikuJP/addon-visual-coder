import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { Language } from '../i18n';
import { blockText } from './locale';

export function initGameSettingsBlocks(language: Language) {
  Blockly.Blocks['set_gamemode'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'ゲームモードを', 'Set game mode to'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, 'サバイバル', 'Survival'), 'survival'],
            [blockText(language, 'クリエイティブ', 'Creative'), 'creative'],
            [blockText(language, 'アドベンチャー', 'Adventure'), 'adventure'],
            [blockText(language, 'スペクテイター', 'Spectator'), 'spectator'],
          ]),
          'MODE',
        )
        .appendField(blockText(language, 'に変更', ''));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(320);
      this.setTooltip(blockText(language, 'プレイヤーのゲームモードを変更します', 'Changes the player game mode'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['set_difficulty'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '難易度を', 'Set difficulty to'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, 'ピースフル', 'Peaceful'), 'peaceful'],
            [blockText(language, 'イージー', 'Easy'), 'easy'],
            [blockText(language, 'ノーマル', 'Normal'), 'normal'],
            [blockText(language, 'ハード', 'Hard'), 'hard'],
          ]),
          'DIFFICULTY',
        )
        .appendField(blockText(language, 'に設定', ''));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(320);
      this.setTooltip(blockText(language, 'ワールドの難易度を変更します', 'Changes the world difficulty'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['set_gamerule'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'ゲームルール:', 'Game rule:'))
        .appendField(
          new Blockly.FieldDropdown([
            ['PvP', 'pvp'],
            [blockText(language, '天候サイクル', 'Weather cycle'), 'doWeatherCycle'],
            [blockText(language, '昼夜サイクル', 'Daylight cycle'), 'doDaylightCycle'],
            [blockText(language, 'モブのスポーン', 'Mob spawning'), 'doMobSpawning'],
            [blockText(language, 'モブのドロップ', 'Mob loot'), 'doMobLoot'],
            [blockText(language, 'キープインベントリ', 'Keep inventory'), 'keepInventory'],
            [blockText(language, 'コマンドブロックの出力', 'Command block output'), 'commandBlockOutput'],
          ]),
          'RULE',
        )
        .appendField(blockText(language, 'を', ''))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '有効', 'Enabled'), 'true'],
            [blockText(language, '無効', 'Disabled'), 'false'],
          ]),
          'VALUE',
        )
        .appendField(blockText(language, 'にする', ''));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(320);
      this.setTooltip(blockText(language, 'ゲームルールを変更します', 'Changes a gamerule'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['set_worldspawn'] = {
    init: function () {
      this.appendDummyInput().appendField(blockText(language, 'ワールドのスポーン地点を設定', 'Set world spawn'));
      this.appendValueInput('POSITION').setCheck('Vector3').appendField(blockText(language, '座標:', 'Position:'));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(320);
      this.setTooltip(blockText(language, 'ワールドのスポーン地点を設定します', 'Sets the world spawn position'));
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['set_time'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '時間を', 'Set time to'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '朝 (0時)', 'Morning (0)'), '0'],
            [blockText(language, '昼 (6000)', 'Day (6000)'), '6000'],
            [blockText(language, '夕方 (12000)', 'Evening (12000)'), '12000'],
            [blockText(language, '夜 (18000)', 'Night (18000)'), '18000'],
          ]),
          'TIME',
        )
        .appendField(blockText(language, 'に設定', ''));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(320);
      this.setTooltip(blockText(language, 'ワールドの時間を設定します', 'Sets the world time'));
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['set_gamemode'] = function (block: Blockly.Block) {
    const mode = block.getFieldValue('MODE');
    return `    event.source.runCommand(\`gamemode ${mode} @s\`);\n`;
  };

  javascriptGenerator['set_difficulty'] = function (block: Blockly.Block) {
    const difficulty = block.getFieldValue('DIFFICULTY');
    return `    event.source.runCommand(\`difficulty ${difficulty}\`);\n`;
  };

  javascriptGenerator['set_gamerule'] = function (block: Blockly.Block) {
    const rule = block.getFieldValue('RULE');
    const value = block.getFieldValue('VALUE');
    return `    event.source.runCommand(\`gamerule ${rule} ${value}\`);\n`;
  };

  javascriptGenerator['set_worldspawn'] = function (block: Blockly.Block) {
    const position = javascriptGenerator.valueToCode(block, 'POSITION', javascriptGenerator.ORDER_ATOMIC) || '{x: 0, y: 0, z: 0}';
    return `    import { world } from '@minecraft/server';\n    world.setDefaultSpawnLocation(${position});\n`;
  };

  javascriptGenerator['set_time'] = function (block: Blockly.Block) {
    const time = block.getFieldValue('TIME');
    return `    event.source.runCommand(\`time set ${time}\`);\n`;
  };
}
