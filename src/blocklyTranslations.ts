import { Language } from './i18n';

const pairs = [
  ['イベント', 'Events'],
  ['基本アクション', 'Basic Actions'],
  ['状態変化', 'State Changes'],
  ['相互作用', 'Interaction'],
  ['条件分岐', 'Conditions'],
  ['プレイヤー状態', 'Player State'],
  ['環境確認', 'Environment'],
  ['位置関連', 'Position'],
  ['アクション', 'Actions'],
  ['メッセージ・表示', 'Messages & UI'],
  ['プレイヤー操作', 'Player Control'],
  ['エフェクト・パーティクル', 'Effects & Particles'],
  ['ワールド操作', 'World Control'],
  ['時間', 'Time'],
  ['一回実行', 'One-Time'],
  ['繰り返し実行', 'Repeat'],
  ['時間条件', 'Time Checks'],
  ['ゲーム設定', 'Game Settings'],
  ['ゲームルール', 'Game Rules'],
  ['ワールド設定', 'World Settings'],
  ['インベントリ', 'Inventory'],
  ['アイテム管理', 'Items'],
  ['装備管理', 'Equipment'],
  ['インベントリ確認', 'Inventory Check'],
  ['スコアボード', 'Scoreboard'],
  ['スコア操作', 'Score Actions'],
  ['スコア条件', 'Score Conditions'],
  ['表示設定', 'Display'],
  ['座標', 'Position'],
  ['座標操作', 'Position Blocks'],
  ['プレイヤーの座標', 'Player Position'],
  ['座標の和', 'Add Positions'],
  ['データ', 'Data'],
  ['データ操作', 'Data Values'],
  ['プレイヤーがブロックを破壊したとき', 'When player breaks a block'],
  ['プレイヤーがエンティティと対話したとき', 'When player interacts with an entity'],
  ['プレイヤーがスニークしたとき', 'When player sneaks'],
  ['プレイヤーがダメージを受けたとき', 'When player takes damage'],
  ['プレイヤーがジャンプしたとき', 'When player jumps'],
  ['プレイヤーが移動したとき', 'When player moves'],
  ['プレイヤーがスポーンしたとき', 'When player spawns'],
  ['プレイヤーが死亡したとき', 'When player dies'],
  ['プレイヤーがワールドに参加したとき', 'When player joins the world'],
  ['プレイヤーがワールドから退出したとき', 'When player leaves the world'],
  ['プレイヤーが矢を放ったとき', 'When player shoots an arrow'],
  ['プレイヤーがテレポートしたとき', 'When player teleports'],
  ['プレイヤーが', 'Player'],
  ['を使用したとき', 'uses item'],
  ['とチャットしたとき', 'is sent in chat'],
  ['タイトルを表示', 'Show title'],
  ['アイテムを与える:', 'Give item:'],
  ['個数:', 'Count:'],
  ['プレイヤーをテレポート', 'Teleport player'],
  ['座標:', 'Position:'],
  ['メッセージを送信', 'Send message'],
  ['爆発を起こす', 'Create explosion'],
  ['威力:', 'Power:'],
  ['ブロックを設置', 'Place block'],
  ['種類:', 'Type:'],
  ['エフェクトを付与', 'Add effect'],
  ['時間:', 'Duration:'],
  ['秒', 'sec'],
  ['レベル:', 'Level:'],
  ['経験値を', 'Experience'],
  ['追加', 'Add'],
  ['削除', 'Remove'],
  ['サウンドを再生', 'Play sound'],
  ['音量:', 'Volume:'],
  ['ピッチ:', 'Pitch:'],
  ['パーティクルを生成', 'Spawn particle'],
  ['数:', 'Count:'],
  ['プレイヤーの向きを変更', 'Set player rotation'],
  ['水平角度:', 'Yaw:'],
  ['垂直角度:', 'Pitch:'],
  ['もしプレイヤーが', 'If player is'],
  ['歩いている', 'walking'],
  ['泳いでいる', 'swimming'],
  ['落下している', 'falling'],
  ['溶岩の中にいる', 'in lava'],
  ['エンティティに乗っている', 'riding an entity'],
  ['スニークしている', 'sneaking'],
  ['走っている', 'sprinting'],
  ['ならば', 'then'],
  ['コマンドを実行', 'Run command'],
  ['プレイヤーの名前', 'Player name'],
  ['もし', 'If'],
  ['個以上持っていたら', 'has at least this many'],
  ['そうでなく、もし', 'Else if'],
  ['それ以外なら', 'Else'],
  ['条件を追加', 'Add condition'],
  ['座標1', 'Position 1'],
  ['座標2', 'Position 2'],
  ['範囲内にいたら', 'is within range'],
  ['の範囲内にいたら', 'is inside the area'],
  ['でなければ', 'Else'],
  ['もしプレイヤーの体力が', 'If player health is'],
  ['なら', 'then'],
  ['以上', 'at least'],
  ['以下', 'at most'],
  ['より大きい', 'greater than'],
  ['より小さい', 'less than'],
  ['と等しい', 'equal to'],
  ['もしプレイヤーの経験値レベルが', 'If player XP level is'],
  ['もし天気が', 'If weather is'],
  ['もしプレイヤーの向きが', 'If player is facing'],
  ['に', 'at'],
  ['があれば', 'exists'],
  ['なければ', 'otherwise'],
  ['インベントリにアイテムを追加', 'Add item to inventory'],
  ['アイテム:', 'Item:'],
  ['スロット:', 'Slot:'],
  ['インベントリからアイテムを削除', 'Remove item from inventory'],
  ['インベントリをクリア', 'Clear inventory'],
  ['装備を変更', 'Change equipment'],
  ['ゲームモードを', 'Set game mode to'],
  ['に変更', ''],
  ['難易度を', 'Set difficulty to'],
  ['に設定', ''],
  ['ゲームルール:', 'Game rule:'],
  ['にする', ''],
  ['ワールドのスポーン地点を設定', 'Set world spawn'],
  ['時間を', 'Set time to'],
  ['スコアボードを作成', 'Create scoreboard'],
  ['名前:', 'Name:'],
  ['表示名:', 'Display name:'],
  ['スコアを', 'Score'],
  ['スコアボード:', 'Objective:'],
  ['値:', 'Value:'],
  ['スコアボードを', 'Scoreboard'],
  ['表示', 'Show'],
  ['非表示', 'Hide'],
  ['表示位置:', 'Display slot:'],
  ['サイドバー', 'Sidebar'],
  ['リスト', 'List'],
  ['名前の下', 'Below Name'],
  ['待機する:', 'Wait:'],
  ['その後に実行', 'Then run'],
  ['もし現在の時間が', 'If current time starts at'],
  ['から', 'for'],
  ['tick の間なら', 'ticks'],
  ['毎', 'Every'],
  ['秒ごとに実行', 'seconds'],
  ['タイマーを', 'Timer'],
  ['ID:', 'ID:'],
  ['時間経過後に実行', 'Run after timer'],
  ['カウントダウン', 'Countdown'],
  ['開始値:', 'Start:'],
  ['間隔:', 'Interval:'],
  ['カウントダウン中に実行', 'Run during countdown'],
  ['終了時に実行', 'Run when finished'],
  ['特定の時間に実行', 'Run at specific time'],
  ['実行する処理', 'Run'],
  ['こんにちは', 'Hello'],
  ['コード', 'Code'],
] as const;

const jaToEn = new Map<string, string>(pairs);
const enToJa = new Map<string, string>(pairs.map(([ja, en]) => [en, ja]));

function translateValue(value: string, language: Language) {
  const map = language === 'en' ? jaToEn : enToJa;
  return map.get(value) ?? value;
}

export function translateBlocklyDom(root: ParentNode, language: Language) {
  const elements = root.querySelectorAll('text, span, div, button');

  elements.forEach((element) => {
    if (element.childElementCount > 0) {
      return;
    }

    const text = element.textContent?.trim();
    if (!text) {
      return;
    }

    const translated = translateValue(text, language);
    if (translated !== text) {
      element.textContent = translated;
    }
  });

  const inputs = root.querySelectorAll('input');
  inputs.forEach((input) => {
    const value = input.value?.trim();
    if (!value) {
      return;
    }

    const translated = translateValue(value, language);
    if (translated !== value) {
      input.value = translated;
    }
  });
}
