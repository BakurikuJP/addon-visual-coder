import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { Language } from '../i18n';
import { blockText } from './locale';

export function initTimeBlocks(language: Language) {
  Blockly.Blocks['delay_action'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '待機する', 'wait for'))
        .appendField(new Blockly.FieldNumber(1, 0.1, 3600, 0.1), 'SECONDS')
        .appendField(blockText(language, '秒', 'seconds'));
      this.appendStatementInput('DO').appendField(
        blockText(language, 'その後に実行', 'then do'),
      );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip(
        blockText(
          language,
          '指定した秒数待ってから処理を実行します。',
          'Runs the next statements after waiting the specified number of seconds.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['check_time'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'もし現在の時間が', 'if the current time is within'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '朝 (0時)', 'morning (0:00)'), '0'],
            [blockText(language, '昼 (6時)', 'day (6:00)'), '6000'],
            [blockText(language, '夕方 (12時)', 'evening (12:00)'), '12000'],
            [blockText(language, '夜 (18時)', 'night (18:00)'), '18000'],
          ]),
          'TIME',
        )
        .appendField(blockText(language, 'から', 'for'))
        .appendField(new Blockly.FieldNumber(1000, 0, 24000), 'DURATION')
        .appendField(blockText(language, 'tick の間', 'ticks'));
      this.appendStatementInput('DO').setCheck(null);
      this.appendStatementInput('ELSE')
        .appendField(blockText(language, 'でなければ', 'otherwise'))
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip(
        blockText(
          language,
          '指定した時間帯に処理を実行する条件分岐です。',
          'Conditionally runs statements during the selected time range.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['interval_action'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '毎', 'repeat every'))
        .appendField(new Blockly.FieldNumber(1, 0.1, 3600, 0.1), 'SECONDS')
        .appendField(blockText(language, '秒ごとに実行', 'seconds'));
      this.appendStatementInput('DO').setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip(
        blockText(
          language,
          '指定した間隔で繰り返し処理を実行します。',
          'Runs the statements repeatedly at the specified interval.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['create_timer'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'タイマーを', 'timer'))
        .appendField(
          new Blockly.FieldDropdown([
            [blockText(language, '開始', 'start'), 'start'],
            [blockText(language, '停止', 'stop'), 'stop'],
          ]),
          'ACTION',
        )
        .appendField('ID:')
        .appendField(new Blockly.FieldTextInput('timer1'), 'TIMER_ID');
      this.appendDummyInput()
        .appendField(blockText(language, '時間:', 'duration:'))
        .appendField(new Blockly.FieldNumber(10, 1, 3600), 'SECONDS')
        .appendField(blockText(language, '秒', 'seconds'));
      this.appendStatementInput('DO')
        .appendField(blockText(language, '時間経過後に実行', 'when finished'))
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip(
        blockText(
          language,
          'タイマーを開始または停止します。',
          'Starts or stops a timer.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['countdown'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'カウントダウン', 'countdown'))
        .appendField(blockText(language, '開始値:', 'start:'))
        .appendField(new Blockly.FieldNumber(10, 1, 3600), 'START')
        .appendField(blockText(language, '秒', 'seconds'))
        .appendField(blockText(language, '間隔:', 'interval:'))
        .appendField(new Blockly.FieldNumber(1, 1, 60), 'INTERVAL')
        .appendField(blockText(language, '秒', 'seconds'));
      this.appendStatementInput('DO')
        .appendField(blockText(language, 'カウントダウン中に実行', 'during countdown'))
        .setCheck(null);
      this.appendStatementInput('FINISH')
        .appendField(blockText(language, '終了時に実行', 'when finished'))
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip(
        blockText(
          language,
          'カウントダウンを実行します。',
          'Runs a countdown timer.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['execute_at_time'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, '特定の時間に実行', 'run at time'))
        .appendField(
          new Blockly.FieldDropdown([
            ['6:00', '6000'],
            ['12:00', '12000'],
            ['18:00', '18000'],
            ['0:00', '0'],
            ['3:00', '3000'],
            ['4:30', '4500'],
          ]),
          'TIME',
        );
      this.appendStatementInput('DO')
        .appendField(blockText(language, '実行する処理', 'do'))
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip(
        blockText(
          language,
          '指定した時間になったときに処理を実行します。',
          'Runs the statements when the selected time is reached.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['delay_action'] = function (block: Blockly.Block) {
    const seconds = Number(block.getFieldValue('SECONDS'));
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { system } from "@minecraft/server";

system.runTimeout(() => {
${statements}}, ${seconds * 20});
`;
  };

  javascriptGenerator['check_time'] = function (block: Blockly.Block) {
    const time = block.getFieldValue('TIME');
    const duration = block.getFieldValue('DURATION');
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    const elseStatements = javascriptGenerator.statementToCode(block, 'ELSE');

    let code = `import { world } from "@minecraft/server";

const currentTime = world.getTime() % 24000;
const startTime = ${time};
const endTime = (${time} + ${duration}) % 24000;

if (
  endTime > startTime
    ? currentTime >= startTime && currentTime < endTime
    : currentTime >= startTime || currentTime < endTime
) {
${statements}}`;

    if (elseStatements) {
      code += ` else {
${elseStatements}}`;
    }

    return `${code}\n`;
  };

  javascriptGenerator['interval_action'] = function (block: Blockly.Block) {
    const seconds = Number(block.getFieldValue('SECONDS'));
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { system } from "@minecraft/server";

system.runInterval(() => {
${statements}}, ${seconds * 20});
`;
  };

  javascriptGenerator['create_timer'] = function (block: Blockly.Block) {
    const action = block.getFieldValue('ACTION');
    const timerId = block.getFieldValue('TIMER_ID');
    const seconds = Number(block.getFieldValue('SECONDS'));
    const statements = javascriptGenerator.statementToCode(block, 'DO');

    if (action === 'start') {
      return `import { system } from "@minecraft/server";

const ${timerId} = system.runTimeout(() => {
${statements}}, ${seconds * 20});
system.timers = system.timers || {};
system.timers["${timerId}"] = ${timerId};
`;
    }

    return `if (system.timers && system.timers["${timerId}"]) {
  system.clearRun(system.timers["${timerId}"]);
  delete system.timers["${timerId}"];
}
`;
  };

  javascriptGenerator['countdown'] = function (block: Blockly.Block) {
    const start = Number(block.getFieldValue('START'));
    const interval = Number(block.getFieldValue('INTERVAL'));
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    const finishStatements = javascriptGenerator.statementToCode(block, 'FINISH');
    const countdownLabel = blockText(language, '残り', 'Remaining');
    const secondsLabel = blockText(language, '秒', 's');

    return `import { system } from "@minecraft/server";

let countdown = ${start};
const countdownInterval = system.runInterval(() => {
  countdown -= ${interval};
  event.source.sendMessage(\`${countdownLabel} \${countdown}${secondsLabel}\`);
${statements}  if (countdown <= 0) {
    system.clearRun(countdownInterval);
${finishStatements}  }
}, ${interval * 20});
`;
  };

  javascriptGenerator['execute_at_time'] = function (block: Blockly.Block) {
    const time = block.getFieldValue('TIME');
    const statements = javascriptGenerator.statementToCode(block, 'DO');

    return `import { world, system } from "@minecraft/server";

system.runInterval(() => {
  const currentTime = world.getTime() % 24000;
  if (Math.abs(currentTime - ${time}) < 20) {
${statements}  }
}, 20);
`;
  };
}
