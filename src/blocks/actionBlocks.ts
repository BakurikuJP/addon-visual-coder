import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { Language } from '../i18n';
import { blockText, playerStateOptions } from './locale';

export function initActionBlocks(language: Language) {
  const effectOptions: [string, string][] = [
    [blockText(language, 'スピード', 'Speed'), 'speed'],
    [blockText(language, '移動速度低下', 'Slowness'), 'slowness'],
    [blockText(language, '採掘速度上昇', 'Haste'), 'haste'],
    [blockText(language, '採掘速度低下', 'Mining Fatigue'), 'mining_fatigue'],
    [blockText(language, '攻撃力上昇', 'Strength'), 'strength'],
    [blockText(language, '即時回復', 'Instant Health'), 'instant_health'],
    [blockText(language, '即時ダメージ', 'Instant Damage'), 'instant_damage'],
    [blockText(language, '跳躍力上昇', 'Jump Boost'), 'jump_boost'],
    [blockText(language, '吐き気', 'Nausea'), 'nausea'],
    [blockText(language, '再生', 'Regeneration'), 'regeneration'],
    [blockText(language, '耐性', 'Resistance'), 'resistance'],
    [blockText(language, '火炎耐性', 'Fire Resistance'), 'fire_resistance'],
    [blockText(language, '水中呼吸', 'Water Breathing'), 'water_breathing'],
    [blockText(language, '透明化', 'Invisibility'), 'invisibility'],
    [blockText(language, '盲目', 'Blindness'), 'blindness'],
    [blockText(language, '暗視', 'Night Vision'), 'night_vision'],
    [blockText(language, '空腹', 'Hunger'), 'hunger'],
    [blockText(language, '弱体化', 'Weakness'), 'weakness'],
    [blockText(language, '毒', 'Poison'), 'poison'],
    [blockText(language, '衰弱', 'Wither'), 'wither'],
    [blockText(language, '体力増強', 'Health Boost'), 'health_boost'],
    [blockText(language, '吸収', 'Absorption'), 'absorption'],
    [blockText(language, '満腹度回復', 'Saturation'), 'saturation'],
    [blockText(language, '発光', 'Glowing'), 'glowing'],
    [blockText(language, '浮遊', 'Levitation'), 'levitation'],
    [blockText(language, '幸運', 'Luck'), 'luck'],
    [blockText(language, '不運', 'Unluck'), 'unluck'],
  ];

  const soundOptions: [string, string][] = [
    [blockText(language, 'レベルアップ', 'Level Up'), 'random.levelup'],
    [blockText(language, 'TNT爆発', 'TNT Explosion'), 'random.explode'],
    [blockText(language, '雷', 'Thunder'), 'ambient.weather.thunder'],
    [blockText(language, '矢を放つ', 'Shoot Arrow'), 'random.bow'],
    [blockText(language, 'アイテムを拾う', 'Pick Up Item'), 'random.pop'],
    [blockText(language, 'ダメージを受ける', 'Take Damage'), 'random.hurt'],
    [blockText(language, 'クリック音', 'Click'), 'random.click'],
    [blockText(language, 'アンビル設置', 'Anvil Land'), 'random.anvil_land'],
    [blockText(language, 'ドアを開く', 'Open Door'), 'random.door_open'],
    [blockText(language, 'ドアを閉じる', 'Close Door'), 'random.door_close'],
  ];

  const particleOptions: [string, string][] = [
    [blockText(language, 'ハート', 'Heart'), 'minecraft:heart_particle'],
    [blockText(language, '炎', 'Flame'), 'minecraft:flame_particle'],
    [blockText(language, '煙', 'Smoke'), 'minecraft:smoke_particle'],
    [blockText(language, 'バブル', 'Bubble'), 'minecraft:bubble_particle'],
    [blockText(language, 'クリティカル', 'Critical'), 'minecraft:critical_hit_particle'],
    [blockText(language, 'エンチャント', 'Enchant'), 'minecraft:enchanting_particle'],
    [blockText(language, 'レッドストーン', 'Redstone'), 'minecraft:redstone_wire_particle'],
    [blockText(language, 'スライム', 'Slime'), 'minecraft:slime_particle'],
    [blockText(language, '雪', 'Snow'), 'minecraft:snowflake_particle'],
    [blockText(language, '水滴', 'Water Drop'), 'minecraft:water_wake_particle'],
  ];

  Blockly.Blocks['show_title'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'タイトルを表示', 'Show title'))
        .appendField(new Blockly.FieldTextInput('Hello!'), 'TITLE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーの画面中央にタイトルを表示します',
          'Shows a title in the center of the player screen',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['give_item'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'アイテムを与える:', 'Give item:'))
        .appendField(new SearchableDropdown(), 'ITEM')
        .appendField(blockText(language, '個数:', 'Count:'))
        .appendField(new Blockly.FieldNumber(1, 1, 64), 'COUNT');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーに指定したアイテムを与えます',
          'Gives the selected item to the player',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['teleport_player'] = {
    init: function () {
      this.appendDummyInput().appendField(
        blockText(language, 'プレイヤーをテレポート', 'Teleport player'),
      );
      this.appendValueInput('POSITION')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標:', 'Position:'));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーを指定した座標にテレポートさせます',
          'Teleports the player to the selected position',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['send_message'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'メッセージを送信', 'Send message'))
        .appendField(new Blockly.FieldTextInput(blockText(language, 'こんにちは', 'hello')), 'MESSAGE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーにメッセージを送信します',
          'Sends a message to the player',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['create_explosion'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '爆発を起こす', 'Create explosion'))
        .appendField(blockText(language, '威力:', 'Power:'))
        .appendField(new Blockly.FieldNumber(1, 1, 10), 'POWER');
      this.appendValueInput('POSITION')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標:', 'Position:'));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          '指定した座標で指定した威力の爆発を起こします',
          'Creates an explosion at the selected position with the chosen power',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['place_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'ブロックを設置', 'Place block'))
        .appendField(blockText(language, '種類:', 'Type:'))
        .appendField(new SearchableDropdown(), 'BLOCK_TYPE');
      this.appendValueInput('POSITION')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標:', 'Position:'));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          '指定した座標にブロックを設置します',
          'Places a block at the selected position',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['add_effect'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'エフェクトを付与', 'Add effect'))
        .appendField(new Blockly.FieldDropdown(effectOptions), 'EFFECT')
        .appendField(blockText(language, '時間:', 'Duration:'))
        .appendField(new Blockly.FieldNumber(10, 1, 999), 'DURATION')
        .appendField(blockText(language, '秒', 'seconds'))
        .appendField(blockText(language, 'レベル:', 'Level:'))
        .appendField(new Blockly.FieldNumber(1, 1, 5), 'AMPLIFIER');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーに指定したエフェクトを付与します',
          'Adds the selected effect to the player',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['modify_experience'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '経験値を', 'Experience'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '追加', 'Add'), 'add'],
            [blockText(language, '削除', 'Remove'), 'remove'],
          ]),
          'ACTION',
        )
        .appendField(blockText(language, 'レベル:', 'Level:'))
        .appendField(new Blockly.FieldNumber(1, 1, 100), 'LEVEL');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーの経験値レベルを変更します',
          'Changes the player experience level',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['play_sound'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'サウンドを再生', 'Play sound'))
        .appendField(new Blockly.FieldDropdown(soundOptions), 'SOUND')
        .appendField(blockText(language, '音量:', 'Volume:'))
        .appendField(new Blockly.FieldNumber(1, 0.1, 3, 0.1), 'VOLUME')
        .appendField(blockText(language, 'ピッチ:', 'Pitch:'))
        .appendField(new Blockly.FieldNumber(1, 0.5, 2, 0.1), 'PITCH');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(language, '指定したサウンドを再生します', 'Plays the selected sound'),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['spawn_particle'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'パーティクルを生成', 'Spawn particle'))
        .appendField(new Blockly.FieldDropdown(particleOptions), 'PARTICLE')
        .appendField(blockText(language, '数:', 'Count:'))
        .appendField(new Blockly.FieldNumber(10, 1, 100), 'COUNT');
      this.appendValueInput('POSITION')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標:', 'Position:'));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(
          language,
          '指定した座標にパーティクルを生成します',
          'Spawns particles at the selected position',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['set_player_rotation'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'プレイヤーの向きを変更', 'Set player rotation'))
        .appendField(blockText(language, '水平角度:', 'Yaw:'))
        .appendField(new Blockly.FieldNumber(0, -180, 180), 'YAW')
        .appendField(blockText(language, '垂直角度:', 'Pitch:'))
        .appendField(new Blockly.FieldNumber(0, -90, 90), 'PITCH');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(language, 'プレイヤーの向きを変更します', 'Changes the player rotation'),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['player_state_condition'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もしプレイヤーが', 'If player is'))
        .appendField(new Blockly.FieldDropdown(playerStateOptions(language)), 'STATE')
        .appendField(blockText(language, 'ならば', 'then'));
      this.appendStatementInput('DO').setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーの状態を条件として使用します',
          'Uses player state as a condition',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['run_command'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'コマンドを実行', 'Run command'))
        .appendField(new Blockly.FieldTextInput(''), 'String');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip(
        blockText(language, '指定したコマンドを実行します', 'Runs the specified command'),
      );
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['show_title'] = function (block: Blockly.Block) {
    const title = block.getFieldValue('TITLE');
    return `    event.source.runCommand(\`title @s title "${title}"\`);\n`;
  };

  javascriptGenerator['give_item'] = function (block: Blockly.Block) {
    const item = block.getFieldValue('ITEM');
    const count = block.getFieldValue('COUNT');
    return `    event.source.runCommand(\`give @s ${item} ${count}\`);\n`;
  };

  javascriptGenerator['teleport_player'] = function (block: Blockly.Block) {
    const position =
      javascriptGenerator.valueToCode(block, 'POSITION', javascriptGenerator.ORDER_ATOMIC) ||
      '{x: 0, y: 0, z: 0}';
    return `    event.source.teleport(${position});\n`;
  };

  javascriptGenerator['send_message'] = function (block: Blockly.Block) {
    const message = block.getFieldValue('MESSAGE');
    return `    event.source.sendMessage("${message}");\n`;
  };

  javascriptGenerator['create_explosion'] = function (block: Blockly.Block) {
    const power = block.getFieldValue('POWER');
    const position =
      javascriptGenerator.valueToCode(block, 'POSITION', javascriptGenerator.ORDER_ATOMIC) ||
      'event.source.location';
    return `    event.source.dimension.createExplosion(${position}, ${power});\n`;
  };

  javascriptGenerator['place_block'] = function (block: Blockly.Block) {
    const blockType = block.getFieldValue('BLOCK_TYPE');
    const position =
      javascriptGenerator.valueToCode(block, 'POSITION', javascriptGenerator.ORDER_ATOMIC) ||
      '{x: 0, y: 0, z: 0}';
    return `    event.source.dimension.getBlock(${position}).setType("${blockType}");\n`;
  };

  javascriptGenerator['add_effect'] = function (block: Blockly.Block) {
    const effect = block.getFieldValue('EFFECT');
    const duration = block.getFieldValue('DURATION');
    const amplifier = block.getFieldValue('AMPLIFIER');
    return `    event.source.runCommand(\`effect @s ${effect} ${duration} ${amplifier}\`);\n`;
  };

  javascriptGenerator['modify_experience'] = function (block: Blockly.Block) {
    const action = block.getFieldValue('ACTION');
    const level = block.getFieldValue('LEVEL');
    const operation = action === 'add' ? '+=' : '-=';
    return `    event.source.level ${operation} ${level};\n`;
  };

  javascriptGenerator['play_sound'] = function (block: Blockly.Block) {
    const sound = block.getFieldValue('SOUND');
    const volume = block.getFieldValue('VOLUME');
    const pitch = block.getFieldValue('PITCH');
    return `    event.source.runCommand(\`playsound ${sound} @s ~ ~ ~ ${volume} ${pitch}\`);\n`;
  };

  javascriptGenerator['spawn_particle'] = function (block: Blockly.Block) {
    const particle = block.getFieldValue('PARTICLE');
    const count = block.getFieldValue('COUNT');
    const position =
      javascriptGenerator.valueToCode(block, 'POSITION', javascriptGenerator.ORDER_ATOMIC) ||
      'event.source.location';
    return `    event.source.dimension.spawnParticle("${particle}", ${position}, ${count});\n`;
  };

  javascriptGenerator['set_player_rotation'] = function (block: Blockly.Block) {
    const yaw = block.getFieldValue('YAW');
    const pitch = block.getFieldValue('PITCH');
    return `    event.source.setRotation({x: ${pitch}, y: ${yaw}});\n`;
  };

  javascriptGenerator['player_state_condition'] = function (block: Blockly.Block) {
    const state = block.getFieldValue('STATE');
    const statements = javascriptGenerator.statementToCode(block, 'DO');

    const playerVarCode = `
    const player = (function() {
      if (event.player) return event.player;
      if (event.source) return event.source;
      if (event.entity && event.entity.typeId === "minecraft:player") return event.entity;
      return undefined;
    })();

    if (player) `;

    let conditionCode = '';

    switch (state) {
      case 'isWalking':
        conditionCode = 'player.isOnGround && !player.isSneaking && !player.isSprinting && !player.isSwimming';
        break;
      case 'isSwimming':
        conditionCode = 'player.isSwimming';
        break;
      case 'isFalling':
        conditionCode = '!player.isOnGround';
        break;
      case 'isInLava':
        conditionCode = `(function() {
      const block = player.dimension.getBlock(player.location);
      return block && block.type === "minecraft:lava";
    })()`;
        break;
      case 'isRiding':
        conditionCode = 'player.getComponent("minecraft:rideable") !== undefined';
        break;
      case 'isSneaking':
        conditionCode = 'player.isSneaking';
        break;
      case 'isSprinting':
        conditionCode = 'player.isSprinting';
        break;
    }

    return `${playerVarCode}{\n    if (${conditionCode}) {\n${statements}    }\n  }\n`;
  };

  javascriptGenerator['run_command'] = function (block: Blockly.Block) {
    const command = block.getFieldValue('String');
    return `    event.source.runCommand("${command}");\n`;
  };
}
