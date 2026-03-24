import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { Language } from '../i18n';
import { blockText } from './locale';

type EventDefinition = {
  type: string;
  labelJa: string;
  labelEn: string;
  tooltipJa: string;
  tooltipEn: string;
};

const simpleEvents: EventDefinition[] = [
  {
    type: 'on_block_break',
    labelJa: 'プレイヤーがブロックを壊したとき',
    labelEn: 'when the player breaks a block',
    tooltipJa: 'ブロックが壊されたときに実行されます。',
    tooltipEn: 'Runs when a block is broken.',
  },
  {
    type: 'on_entity_interact',
    labelJa: 'プレイヤーがエンティティと対話したとき',
    labelEn: 'when the player interacts with an entity',
    tooltipJa: 'エンティティと対話したときに実行されます。',
    tooltipEn: 'Runs when the player interacts with an entity.',
  },
  {
    type: 'on_player_sneak',
    labelJa: 'プレイヤーがスニークしたとき',
    labelEn: 'when the player sneaks',
    tooltipJa: 'プレイヤーがスニークしたときに実行されます。',
    tooltipEn: 'Runs when the player sneaks.',
  },
  {
    type: 'on_player_damage',
    labelJa: 'プレイヤーがダメージを受けたとき',
    labelEn: 'when the player takes damage',
    tooltipJa: 'プレイヤーがダメージを受けたときに実行されます。',
    tooltipEn: 'Runs when the player takes damage.',
  },
  {
    type: 'on_player_jump',
    labelJa: 'プレイヤーがジャンプしたとき',
    labelEn: 'when the player jumps',
    tooltipJa: 'プレイヤーがジャンプしたときに実行されます。',
    tooltipEn: 'Runs when the player jumps.',
  },
  {
    type: 'on_player_move',
    labelJa: 'プレイヤーが移動したとき',
    labelEn: 'when the player moves',
    tooltipJa: 'プレイヤーが移動したときに実行されます。',
    tooltipEn: 'Runs when the player moves.',
  },
  {
    type: 'on_player_spawn',
    labelJa: 'プレイヤーがスポーンしたとき',
    labelEn: 'when the player spawns',
    tooltipJa: 'プレイヤーがスポーンしたときに実行されます。',
    tooltipEn: 'Runs when the player spawns.',
  },
  {
    type: 'on_player_death',
    labelJa: 'プレイヤーが死亡したとき',
    labelEn: 'when the player dies',
    tooltipJa: 'プレイヤーが死亡したときに実行されます。',
    tooltipEn: 'Runs when the player dies.',
  },
  {
    type: 'on_player_join',
    labelJa: 'プレイヤーがワールドに参加したとき',
    labelEn: 'when the player joins the world',
    tooltipJa: 'プレイヤーがワールドに参加したときに実行されます。',
    tooltipEn: 'Runs when the player joins the world.',
  },
  {
    type: 'on_player_leave',
    labelJa: 'プレイヤーがワールドから退出したとき',
    labelEn: 'when the player leaves the world',
    tooltipJa: 'プレイヤーがワールドから退出したときに実行されます。',
    tooltipEn: 'Runs when the player leaves the world.',
  },
  {
    type: 'on_player_arrow_shot',
    labelJa: 'プレイヤーが矢を撃ったとき',
    labelEn: 'when the player shoots an arrow',
    tooltipJa: 'プレイヤーが矢を撃ったときに実行されます。',
    tooltipEn: 'Runs when the player shoots an arrow.',
  },
  {
    type: 'on_player_teleport',
    labelJa: 'プレイヤーがテレポートしたとき',
    labelEn: 'when the player teleports',
    tooltipJa: 'プレイヤーがテレポートしたときに実行されます。',
    tooltipEn: 'Runs when the player teleports.',
  },
];

export function initEventBlocks(language: Language) {
  Blockly.Blocks['on_item_use'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'プレイヤーが', 'when the player uses'))
        .appendField(new SearchableDropdown(), 'ITEM')
        .appendField(blockText(language, 'を使ったとき', ''));
      this.appendStatementInput('DO').setCheck(null);
      this.setColour(120);
      this.setTooltip(
        blockText(
          language,
          '選択したアイテムを使ったときに実行されます。',
          'Runs when the selected item is used.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  Blockly.Blocks['on_player_chat'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(blockText(language, 'プレイヤーが', 'when the player says'))
        .appendField(
          new Blockly.FieldTextInput(blockText(language, 'こんにちは', 'hello')),
          'MESSAGE',
        )
        .appendField(blockText(language, 'とチャットしたとき', ''));
      this.appendStatementInput('DO').setCheck(null);
      this.setColour(120);
      this.setTooltip(
        blockText(
          language,
          'プレイヤーが指定した文字をチャットしたときに実行されます。',
          'Runs when the player sends the specified chat message.',
        ),
      );
      this.setHelpUrl('');
    },
  };

  for (const event of simpleEvents) {
    Blockly.Blocks[event.type] = {
      init: function () {
        this.appendDummyInput().appendField(
          blockText(language, event.labelJa, event.labelEn),
        );
        this.appendStatementInput('DO').setCheck(null);
        this.setColour(120);
        this.setTooltip(blockText(language, event.tooltipJa, event.tooltipEn));
        this.setHelpUrl('');
      },
    };
  }

  javascriptGenerator['on_player_spawn'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerSpawn.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_death'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.entityDie.subscribe((event) => {
  if (event.deadEntity.typeId === "minecraft:player") {
${statements}  }
});
`;
  };

  javascriptGenerator['on_player_join'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerJoin.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_leave'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerLeave.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_item_use'] = function (block: Blockly.Block) {
    const item = block.getFieldValue('ITEM');
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack.typeId === "${item}") {
${statements}  }
});
`;
  };

  javascriptGenerator['on_block_break'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.blockBreak.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_entity_interact'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.entityInteract.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_sneak'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerSneak.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_damage'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.entityHurt.subscribe((event) => {
  if (event.hurtEntity.typeId === "minecraft:player") {
${statements}  }
});
`;
  };

  javascriptGenerator['on_player_jump'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerJump.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_move'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerMove.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_chat'] = function (block: Blockly.Block) {
    const message = block.getFieldValue('MESSAGE');
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.beforeEvents.playerChat.subscribe((event) => {
  if (event.message === "${message}") {
${statements}  }
});
`;
  };

  javascriptGenerator['on_player_arrow_shot'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerArrowShot.subscribe((event) => {
${statements}});
`;
  };

  javascriptGenerator['on_player_teleport'] = function (block: Blockly.Block) {
    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `import { world } from "@minecraft/server";

world.afterEvents.playerTeleport.subscribe((event) => {
${statements}});
`;
  };
}

export function createItemDropdownStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .blockly-item-dropdown {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
    }
    .blockly-item-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      padding: 4px;
      border: 1px solid transparent;
      border-radius: 4px;
    }
    .blockly-item-option:hover {
      background-color: #f0f0f0;
      border-color: #ccc;
    }
    .blockly-item-option img {
      width: 32px;
      height: 32px;
      image-rendering: pixelated;
    }
    .blockly-item-option span {
      font-size: 10px;
      margin-top: 4px;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}
