import { useEffect, useState, RefObject } from 'react';
import * as Blockly from 'blockly';
import * as BlocklyCore from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { initCustomBlocks } from '../blocks';
import { Language, messages } from '../i18n';
import { translateBlocklyDom } from '../blocklyTranslations';

interface UseBlocklyOptions {
  workspaceRef: RefObject<HTMLDivElement>;
  language: Language;
}

export function useBlockly({ workspaceRef, language }: UseBlocklyOptions) {
  const [workspace, setWorkspace] = useState<BlocklyCore.WorkspaceSvg | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  useEffect(() => {
    if (!workspaceRef.current) return;

    const savedState = workspace ? (Blockly as any).serialization.workspaces.save(workspace) : null;
    const c = messages[language].categories;

    initCustomBlocks(language);

    const ws = Blockly.inject(workspaceRef.current, {
      toolbox: {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: c.events,
            colour: '#5ba55b',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.eventPlayerBasic,
                colour: '#6fb76f',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'on_player_sneak' },
                  { kind: 'block', type: 'on_player_jump' },
                  { kind: 'block', type: 'on_player_move' },
                  { kind: 'block', type: 'on_player_chat' },
                  { kind: 'block', type: 'on_player_arrow_shot' },
                  { kind: 'block', type: 'on_player_teleport' },
                ],
              },
              {
                kind: 'category',
                name: c.eventPlayerState,
                colour: '#6fb76f',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'on_player_damage' },
                  { kind: 'block', type: 'on_player_death' },
                  { kind: 'block', type: 'on_player_join' },
                  { kind: 'block', type: 'on_player_leave' },
                  { kind: 'block', type: 'on_player_spawn' },
                  { kind: 'block', type: 'player_state_condition' },
                ],
              },
              {
                kind: 'category',
                name: c.eventWorld,
                colour: '#6fb76f',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'on_item_use' },
                  { kind: 'block', type: 'on_block_break' },
                  { kind: 'block', type: 'on_entity_interact' },
                ],
              },
            ],
          },
          {
            kind: 'category',
            name: c.conditions,
            colour: '#5b80a5',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.conditionsPlayer,
                colour: '#6b90b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'check_has_item' },
                  { kind: 'block', type: 'check_health' },
                  { kind: 'block', type: 'check_experience_level' },
                ],
              },
              {
                kind: 'category',
                name: c.conditionsWorld,
                colour: '#6b90b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'check_weather' },
                  { kind: 'block', type: 'check_block_exists' },
                ],
              },
              {
                kind: 'category',
                name: c.conditionsPosition,
                colour: '#6b90b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'check_position' },
                  { kind: 'block', type: 'check_player_direction' },
                ],
              },
            ],
          },
          {
            kind: 'category',
            name: c.actions,
            colour: '#5b67a5',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.actionMessage,
                colour: '#6b77b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'send_message' },
                  { kind: 'block', type: 'show_title' },
                ],
              },
              {
                kind: 'category',
                name: c.actionPlayer,
                colour: '#6b77b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'give_item' },
                  { kind: 'block', type: 'teleport_player' },
                  { kind: 'block', type: 'set_player_rotation' },
                  { kind: 'block', type: 'modify_experience' },
                ],
              },
              {
                kind: 'category',
                name: c.actionEffects,
                colour: '#6b77b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'add_effect' },
                  { kind: 'block', type: 'play_sound' },
                  { kind: 'block', type: 'spawn_particle' },
                ],
              },
              {
                kind: 'category',
                name: c.actionWorld,
                colour: '#6b77b5',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'create_explosion' },
                  { kind: 'block', type: 'place_block' },
                  { kind: 'block', type: 'run_command' },
                ],
              },
            ],
          },
          {
            kind: 'category',
            name: c.time,
            colour: '#9c27b0',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.timeOnce,
                colour: '#ac37c0',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'delay_action' },
                  { kind: 'block', type: 'create_timer' },
                ],
              },
              {
                kind: 'category',
                name: c.timeLoop,
                colour: '#ac37c0',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'interval_action' },
                  { kind: 'block', type: 'countdown' },
                ],
              },
              {
                kind: 'category',
                name: c.timeCondition,
                colour: '#ac37c0',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'check_time' },
                  { kind: 'block', type: 'execute_at_time' },
                ],
              },
            ],
          },
          {
            kind: 'category',
            name: c.game,
            colour: '#e91e63',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.gameRule,
                colour: '#f06292',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'set_gamemode' },
                  { kind: 'block', type: 'set_difficulty' },
                  { kind: 'block', type: 'set_gamerule' },
                ],
              },
              {
                kind: 'category',
                name: c.gameWorld,
                colour: '#f06292',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'set_worldspawn' },
                  { kind: 'block', type: 'set_time' },
                ],
              },
            ],
          },
          {
            kind: 'category',
            name: c.inventory,
            colour: '#009688',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.inventoryItems,
                colour: '#26a69a',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'inventory_add_item' },
                  { kind: 'block', type: 'inventory_remove_item' },
                  { kind: 'block', type: 'inventory_clear' },
                ],
              },
              {
                kind: 'category',
                name: c.inventoryEquip,
                colour: '#26a69a',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [{ kind: 'block', type: 'equip_item' }],
              },
              {
                kind: 'category',
                name: c.inventoryCheck,
                colour: '#26a69a',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [{ kind: 'block', type: 'check_inventory' }],
              },
            ],
          },
          {
            kind: 'category',
            name: c.scoreboard,
            colour: '#ff9800',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.scoreboardAction,
                colour: '#ffa726',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'create_scoreboard' },
                  { kind: 'block', type: 'set_score' },
                ],
              },
              {
                kind: 'category',
                name: c.scoreboardCondition,
                colour: '#ffa726',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [{ kind: 'block', type: 'check_score' }],
              },
              {
                kind: 'category',
                name: c.scoreboardDisplay,
                colour: '#ffa726',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [{ kind: 'block', type: 'display_scoreboard' }],
              },
            ],
          },
          {
            kind: 'category',
            name: c.position,
            colour: '#009688',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.positionBlocks,
                colour: '#009688',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [
                  { kind: 'block', type: 'position_block' },
                  { kind: 'block', type: 'player_position_block' },
                  { kind: 'block', type: 'add_positions_block' },
                ],
              },
            ],
          },
          {
            kind: 'category',
            name: c.data,
            colour: '#009688',
            cssConfig: { container: 'category-main' },
            contents: [
              {
                kind: 'category',
                name: c.dataValue,
                colour: '#009688',
                cssConfig: { container: 'category-sub', row: 'category-row-sub', icon: 'category-icon-sub' },
                contents: [{ kind: 'block', type: 'player_name_block' }],
              },
            ],
          },
        ],
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true,
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      trashcan: true,
      maxInstances: {},
      horizontalLayout: false,
      toolboxPosition: 'start',
      renderer: 'geras',
      theme: {
        blockStyles: {
          'event-blocks': { colourPrimary: '#5ba55b' },
          'logic-blocks': { colourPrimary: '#5b80a5' },
          'action-blocks': { colourPrimary: '#5b67a5' },
          'time-blocks': { colourPrimary: '#9c27b0' },
          'scoreboard-blocks': { colourPrimary: '#ff9800' },
          'game-settings-blocks': { colourPrimary: '#e91e63' },
          'inventory-blocks': { colourPrimary: '#009688' },
        },
        componentStyles: {
          toolboxCategory: { padding: '8px' },
        },
      },
      css: true,
    });

    const style = document.createElement('style');
    style.textContent = `
      .category-main {
        margin-bottom: 8px;
        font-weight: bold;
      }
      .category-sub {
        margin-left: 12px;
        margin-bottom: 4px;
        border-left: 2px solid rgba(255, 255, 255, 0.2);
      }
      .category-row-sub {
        padding: 4px 8px;
        display: flex;
        align-items: center;
        transition: background-color 0.2s;
      }
      .category-row-sub:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .category-icon-sub {
        margin-right: 8px;
        opacity: 0.8;
      }
      .blockly-item-container {
        padding: 8px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 320px;
      }
      .blockly-item-dropdown {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 8px;
        padding: 8px;
        max-height: 320px;
        overflow-y: auto;
      }
      .blockly-item-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
        text-align: center;
      }
      .blockly-item-option:hover {
        background-color: #f0f0f0;
      }
      .blockly-item-option img {
        width: 32px;
        height: 32px;
        image-rendering: pixelated;
        margin-bottom: 4px;
      }
      .blockly-item-option span {
        font-size: 12px;
        color: #333;
        word-break: break-word;
        line-height: 1.2;
      }
      .blockly-item-search {
        width: calc(100% - 16px);
        padding: 8px;
        margin: 0 8px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
      }
      .blockly-item-search:focus {
        outline: none;
        border-color: #4285f4;
      }
      .blockly-item-dropdown::-webkit-scrollbar {
        width: 8px;
      }
      .blockly-item-dropdown::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      .blockly-item-dropdown::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      .blockly-item-dropdown::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `;
    document.head.appendChild(style);

    if (savedState) {
      (Blockly as any).serialization.workspaces.load(savedState, ws);
    }

    setWorkspace(ws as BlocklyCore.WorkspaceSvg);

    const updateCode = () => {
      try {
        const code = javascriptGenerator.workspaceToCode(ws);
        setGeneratedCode(code || '');
      } catch (error) {
        setGeneratedCode(`Error:\n${error instanceof Error ? error.message : String(error)}`);
      }
    };

    ws.addChangeListener(updateCode);
    updateCode();

    return () => {
      ws.dispose();
    };
  }, [workspaceRef, language]);

  useEffect(() => {
    translateBlocklyDom(document.body, language);

    const observer = new MutationObserver(() => {
      translateBlocklyDom(document.body, language);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  return {
    workspace,
    generatedCode,
  };
}
