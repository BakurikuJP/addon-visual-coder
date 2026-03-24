import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { Language } from '../i18n';
import { blockText, compareOptions } from './locale';

interface BlocklyBlock {
  getFieldValue(name: string): string | number;
  itemCount_?: number;
  updateShape_?: () => void;
}

interface BlocklyXMLElement extends Element {
  getAttribute(name: string): string;
}

const minusIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMTkgMTNINXYtMmgxNHYyeiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';
const plusIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyeiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';

export function initConditionBlocks(language: Language) {
  const removeLabel = blockText(language, '削除', 'Remove');
  const addLabel = blockText(language, '追加', 'Add');
  const ifLabel = blockText(language, 'もし', 'If');
  const elseIfLabel = blockText(language, 'そうでなく、もし', 'Else if');
  const elseLabel = blockText(language, 'それ以外なら', 'Else');
  const otherwiseLabel = blockText(language, 'でなければ', 'Else');

  Blockly.Blocks['check_has_item'] = {
    init: function () {
      this.itemCount_ = 1;
      this.updateShape_();
      this.setColour(210);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーが指定したアイテムを持っているか確認します',
          'Checks whether the player has the selected item',
        ),
      );
      this.setHelpUrl('');
    },

    updateShape_: function () {
      const thisBlock = this as Blockly.Block & BlocklyBlock;
      const connections = [];

      for (let i = 0; i < (thisBlock.itemCount_ || 0); i++) {
        const input = thisBlock.getInput(`DO${i}`);
        if (input?.connection?.targetConnection) {
          connections[i] = input.connection.targetConnection;
        }
      }

      const elseConnection = thisBlock.getInput('ELSE_DO')?.connection?.targetConnection;

      if (thisBlock.getInput('IF0')) thisBlock.removeInput('IF0');
      if (thisBlock.getInput('DO0')) thisBlock.removeInput('DO0');

      thisBlock
        .appendDummyInput('IF0')
        .appendField(ifLabel)
        .appendField(new SearchableDropdown() as any, 'ITEM0')
        .appendField(blockText(language, 'を', ''))
        .appendField(new Blockly.FieldNumber(1, 1, 64), 'COUNT0')
        .appendField(blockText(language, '個以上持っていたら', 'has at least this many'));

      const do0 = thisBlock.appendStatementInput('DO0');
      if (connections[0]) do0.connection?.connect(connections[0]);

      for (let i = 1; i < (thisBlock.itemCount_ || 0); i++) {
        if (thisBlock.getInput(`IF${i}`)) thisBlock.removeInput(`IF${i}`);
        if (thisBlock.getInput(`DO${i}`)) thisBlock.removeInput(`DO${i}`);

        const input = thisBlock.appendDummyInput(`IF${i}`);
        const minusButton = new Blockly.FieldImage(minusIcon, 15, 15, removeLabel, () => {
          if (i >= 1 && i < (thisBlock.itemCount_ || 0)) {
            thisBlock.removeInput(`IF${i}`);
            thisBlock.removeInput(`DO${i}`);
            thisBlock.itemCount_ = (thisBlock.itemCount_ || 1) - 1;
            thisBlock.updateShape_?.();
          }
        });

        input
          .appendField(minusButton)
          .appendField(elseIfLabel)
          .appendField(new SearchableDropdown() as any, `ITEM${i}`)
          .appendField(blockText(language, 'を', ''))
          .appendField(new Blockly.FieldNumber(1, 1, 64), `COUNT${i}`)
          .appendField(blockText(language, '個以上持っていたら', 'has at least this many'));

        const doN = thisBlock.appendStatementInput(`DO${i}`);
        if (connections[i]) doN.connection?.connect(connections[i]);
      }

      if (thisBlock.getInput('ELSE')) thisBlock.removeInput('ELSE');
      if (thisBlock.getInput('ELSE_DO')) thisBlock.removeInput('ELSE_DO');

      if ((thisBlock.itemCount_ || 0) > 0) {
        const input = thisBlock.appendDummyInput('ELSE');
        const minusButton = new Blockly.FieldImage(minusIcon, 15, 15, removeLabel, () => {
          thisBlock.removeInput('ELSE');
          thisBlock.removeInput('ELSE_DO');
        });

        input.appendField(minusButton).appendField(elseLabel);
        const elseDo = thisBlock.appendStatementInput('ELSE_DO');
        if (elseConnection) elseDo.connection?.connect(elseConnection);
      }

      if (thisBlock.getInput('ADD')) thisBlock.removeInput('ADD');
      const addInput = thisBlock.appendDummyInput('ADD');
      const plusButton = new Blockly.FieldImage(plusIcon, 15, 15, addLabel, () => {
        if ((thisBlock.itemCount_ || 0) < 5) {
          thisBlock.itemCount_ = (thisBlock.itemCount_ || 0) + 1;
          thisBlock.updateShape_?.();
        }
      });

      addInput.appendField(plusButton).appendField(blockText(language, '条件を追加', 'Add condition'));
    },

    mutationToDom: function () {
      const container = document.createElement('mutation');
      container.setAttribute('items', String(this.itemCount_));
      return container;
    },

    domToMutation: function (xmlElement: BlocklyXMLElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },
  };

  Blockly.Blocks['check_position'] = {
    init: function () {
      this.appendDummyInput().appendField(blockText(language, 'もしプレイヤーが', 'If player is'));
      this.appendValueInput('POSITION1')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標1', 'Position 1'));
      this.appendValueInput('POSITION2')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標2', 'Position 2'));
      this.appendDummyInput().appendField(
        blockText(language, 'の範囲内にいたら', 'inside the area'),
      );
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE').appendField(otherwiseLabel).setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーが指定した座標範囲内にいるか確認します',
          'Checks whether the player is within the selected area',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_health'] = {
    init: function () {
      this.itemCount_ = 1;
      this.updateShape_();
      this.setColour(210);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(
        blockText(language, 'プレイヤーの体力を確認します', 'Checks the player health'),
      );
      this.setHelpUrl('');
    },

    updateShape_: function () {
      const thisBlock = this as Blockly.Block & BlocklyBlock;
      const connections = [];

      for (let i = 0; i < (thisBlock.itemCount_ || 0); i++) {
        const input = thisBlock.getInput(`DO${i}`);
        if (input?.connection?.targetConnection) {
          connections[i] = input.connection.targetConnection;
        }
      }

      const elseConnection = thisBlock.getInput('ELSE_DO')?.connection?.targetConnection;

      if (thisBlock.getInput('IF0')) thisBlock.removeInput('IF0');
      if (thisBlock.getInput('DO0')) thisBlock.removeInput('DO0');

      thisBlock
        .appendDummyInput('IF0')
        .appendField(blockText(language, 'もしプレイヤーの体力が', 'If player health is'))
        .appendField(new Blockly.FieldNumber(10, 0, 20), 'HEALTH0')
        .appendField(new Blockly.FieldDropdown(compareOptions(language)) as any, 'COMPARE0')
        .appendField(blockText(language, 'なら', 'then'));

      const do0 = thisBlock.appendStatementInput('DO0');
      if (connections[0]) do0.connection?.connect(connections[0]);

      for (let i = 1; i < (thisBlock.itemCount_ || 0); i++) {
        if (thisBlock.getInput(`IF${i}`)) thisBlock.removeInput(`IF${i}`);
        if (thisBlock.getInput(`DO${i}`)) thisBlock.removeInput(`DO${i}`);

        const input = thisBlock.appendDummyInput(`IF${i}`);
        const minusButton = new Blockly.FieldImage(minusIcon, 15, 15, removeLabel, () => {
          if (i >= 1 && i < (thisBlock.itemCount_ || 0)) {
            thisBlock.removeInput(`IF${i}`);
            thisBlock.removeInput(`DO${i}`);
            thisBlock.itemCount_ = (thisBlock.itemCount_ || 1) - 1;
            thisBlock.updateShape_?.();
          }
        });

        input
          .appendField(minusButton)
          .appendField(blockText(language, 'そうでなく、もし体力が', 'Else if health is'))
          .appendField(new Blockly.FieldNumber(10, 0, 20), `HEALTH${i}`)
          .appendField(new Blockly.FieldDropdown(compareOptions(language)) as any, `COMPARE${i}`)
          .appendField(blockText(language, 'なら', 'then'));

        const doN = thisBlock.appendStatementInput(`DO${i}`);
        if (connections[i]) doN.connection?.connect(connections[i]);
      }

      if (thisBlock.getInput('ELSE')) thisBlock.removeInput('ELSE');
      if (thisBlock.getInput('ELSE_DO')) thisBlock.removeInput('ELSE_DO');

      if ((thisBlock.itemCount_ || 0) > 0) {
        const input = thisBlock.appendDummyInput('ELSE');
        const minusButton = new Blockly.FieldImage(minusIcon, 15, 15, removeLabel, () => {
          thisBlock.removeInput('ELSE');
          thisBlock.removeInput('ELSE_DO');
        });

        input.appendField(minusButton).appendField(elseLabel);
        const elseDo = thisBlock.appendStatementInput('ELSE_DO');
        if (elseConnection) elseDo.connection?.connect(elseConnection);
      }

      if (thisBlock.getInput('ADD')) thisBlock.removeInput('ADD');
      const addInput = thisBlock.appendDummyInput('ADD');
      const plusButton = new Blockly.FieldImage(plusIcon, 15, 15, addLabel, () => {
        if ((thisBlock.itemCount_ || 0) < 5) {
          thisBlock.itemCount_ = (thisBlock.itemCount_ || 0) + 1;
          thisBlock.updateShape_?.();
        }
      });

      addInput.appendField(plusButton).appendField(blockText(language, '条件を追加', 'Add condition'));
    },

    mutationToDom: function () {
      const container = document.createElement('mutation');
      container.setAttribute('items', String(this.itemCount_));
      return container;
    },

    domToMutation: function (xmlElement: BlocklyXMLElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },
  };

  Blockly.Blocks['check_experience_level'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もしプレイヤーの経験値レベルが', 'If player XP level is'))
        .appendField(new Blockly.FieldNumber(1, 0, 100), 'LEVEL')
        .appendField(new Blockly.FieldDropdown(compareOptions(language)), 'COMPARE')
        .appendField(blockText(language, 'なら', 'then'));
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE').appendField(otherwiseLabel).setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip(
        blockText(language, 'プレイヤーの経験値レベルを確認します', 'Checks the player XP level'),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_weather'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もし天気が', 'If weather is'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '晴れ', 'Clear'), 'clear'],
            [blockText(language, '雨', 'Rain'), 'rain'],
            [blockText(language, '雷雨', 'Thunder'), 'thunder'],
          ]),
          'WEATHER',
        )
        .appendField(blockText(language, 'なら', 'then'));
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE').appendField(otherwiseLabel).setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip(
        blockText(language, '現在の天気を確認します', 'Checks the current weather'),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_block_exists'] = {
    init: function () {
      this.appendDummyInput().appendField(ifLabel);
      this.appendValueInput('POSITION')
        .setCheck('Vector3')
        .appendField(blockText(language, '座標', 'Position'));
      this.appendDummyInput()
        .appendField(blockText(language, 'に', 'at'))
        .appendField(new SearchableDropdown(), 'BLOCK')
        .appendField(blockText(language, 'があれば', 'exists'));
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE')
        .appendField(blockText(language, 'なければ', 'otherwise'))
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip(
        blockText(
          language,
          '指定した座標にブロックが存在するか確認します',
          'Checks whether a block exists at the selected position',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_player_direction'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もしプレイヤーの向きが', 'If player is facing'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '北', 'North'), 'north'],
            [blockText(language, '南', 'South'), 'south'],
            [blockText(language, '東', 'East'), 'east'],
            [blockText(language, '西', 'West'), 'west'],
          ]),
          'DIRECTION',
        )
        .appendField(blockText(language, 'なら', 'then'));
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE').appendField(otherwiseLabel).setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーの向いている方向を確認します',
          'Checks the direction the player is facing',
        ),
      );
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['check_has_item'] = function (block: BlocklyBlock) {
    let code = '    const inventory = event.source.getComponent("inventory");\n';

    const item0 = block.getFieldValue('ITEM0');
    const count0 = block.getFieldValue('COUNT0');
    const statements0 = javascriptGenerator.statementToCode(block as never, 'DO0');
    code += `    if (inventory.container.getItemCount("${item0}") >= ${count0}) {\n${statements0}    }`;

    for (let i = 1; i < (block.itemCount_ || 1); i++) {
      const item = block.getFieldValue(`ITEM${i}`);
      const count = block.getFieldValue(`COUNT${i}`);
      const statements = javascriptGenerator.statementToCode(block as never, `DO${i}`);
      code += ` else if (inventory.container.getItemCount("${item}") >= ${count}) {\n${statements}    }`;
    }

    const elseStatements = javascriptGenerator.statementToCode(block as never, 'ELSE_DO');
    if (elseStatements) {
      code += ` else {\n${elseStatements}    }`;
    }

    return `${code}\n`;
  };

  javascriptGenerator['check_position'] = function (block: BlocklyBlock) {
    const pos1 =
      javascriptGenerator.valueToCode(block as never, 'POSITION1', javascriptGenerator.ORDER_ATOMIC) ||
      '{x: 0, y: 0, z: 0}';
    const pos2 =
      javascriptGenerator.valueToCode(block as never, 'POSITION2', javascriptGenerator.ORDER_ATOMIC) ||
      '{x: 0, y: 0, z: 0}';
    const statements = javascriptGenerator.statementToCode(block as never, 'DO');
    const elseStatements = javascriptGenerator.statementToCode(block as never, 'ELSE');

    let code = `    const playerPos = event.source.location;
    const pos1 = ${pos1};
    const pos2 = ${pos2};

    const minX = Math.min(pos1.x, pos2.x);
    const maxX = Math.max(pos1.x, pos2.x);
    const minY = Math.min(pos1.y, pos2.y);
    const maxY = Math.max(pos1.y, pos2.y);
    const minZ = Math.min(pos1.z, pos2.z);
    const maxZ = Math.max(pos1.z, pos2.z);

    if (playerPos.x >= minX && playerPos.x <= maxX &&
        playerPos.y >= minY && playerPos.y <= maxY &&
        playerPos.z >= minZ && playerPos.z <= maxZ) {
${statements}    }`;

    if (elseStatements) {
      code += ` else {
${elseStatements}    }`;
    }

    return `${code}\n`;
  };

  javascriptGenerator['check_health'] = function (block: BlocklyBlock) {
    let code = '    const health = event.source.getComponent("health");\n';

    const health0 = block.getFieldValue('HEALTH0');
    const compare0 = block.getFieldValue('COMPARE0');
    const statements0 = javascriptGenerator.statementToCode(block as never, 'DO0');
    code += `    if (health.currentValue ${compare0} ${health0}) {\n${statements0}    }`;

    for (let i = 1; i < (block.itemCount_ || 1); i++) {
      const health = block.getFieldValue(`HEALTH${i}`);
      const compare = block.getFieldValue(`COMPARE${i}`);
      const statements = javascriptGenerator.statementToCode(block as never, `DO${i}`);
      code += ` else if (health.currentValue ${compare} ${health}) {\n${statements}    }`;
    }

    const elseStatements = javascriptGenerator.statementToCode(block as never, 'ELSE_DO');
    if (elseStatements) {
      code += ` else {\n${elseStatements}    }`;
    }

    return `${code}\n`;
  };

  javascriptGenerator['check_experience_level'] = function (block: BlocklyBlock) {
    const level = block.getFieldValue('LEVEL');
    const compare = block.getFieldValue('COMPARE');
    const statementsDo = javascriptGenerator.statementToCode(block as never, 'DO');
    const statementsElse = javascriptGenerator.statementToCode(block as never, 'ELSE');

    return `if (player.level ${compare} ${level}) {
${statementsDo}} else {
${statementsElse}}`;
  };

  javascriptGenerator['check_weather'] = function (block: BlocklyBlock) {
    const weather = block.getFieldValue('WEATHER');
    const statementsDo = javascriptGenerator.statementToCode(block as never, 'DO');
    const statementsElse = javascriptGenerator.statementToCode(block as never, 'ELSE');

    return `const currentWeather = world.getWeather();
if (currentWeather === "${weather}") {
${statementsDo}} else {
${statementsElse}}`;
  };

  javascriptGenerator['check_block_exists'] = function (block: BlocklyBlock) {
    const position =
      javascriptGenerator.valueToCode(block as never, 'POSITION', javascriptGenerator.ORDER_ATOMIC) ||
      '{x: 0, y: 0, z: 0}';
    const blockType = block.getFieldValue('BLOCK');
    const statementsDo = javascriptGenerator.statementToCode(block as never, 'DO');
    const statementsElse = javascriptGenerator.statementToCode(block as never, 'ELSE');

    return `    const block = event.source.dimension.getBlock(${position});
    if (block && block.typeId === "${blockType}") {
${statementsDo}    } else {
${statementsElse}    }`;
  };

  javascriptGenerator['check_player_direction'] = function (block: BlocklyBlock) {
    const direction = block.getFieldValue('DIRECTION');
    const statementsDo = javascriptGenerator.statementToCode(block as never, 'DO');
    const statementsElse = javascriptGenerator.statementToCode(block as never, 'ELSE');

    return `const rotation = player.getRotation();
const direction = getCardinalDirection(rotation.y);
if (direction === "${direction}") {
${statementsDo}} else {
${statementsElse}}`;
  };
}
