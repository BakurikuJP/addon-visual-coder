import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { Language } from '../i18n';
import { blockText } from './locale';

export const initDataBlocks = (language: Language) => {
  Blockly.Blocks['player_name_block'] = {
    init: function () {
      this.appendDummyInput().appendField(
        blockText(language, 'プレイヤーの名前', 'player name'),
      );
      this.setOutput(true, 'String');
      this.setColour(230);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーの名前を取得します。',
          'Gets the player name.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  javascriptGenerator['player_name_block'] = function () {
    const code = 'event.source.name';
    return [code, javascriptGenerator.ORDER_MEMBER];
  };
};
