/*
Copyright (c) 2021 b1san
Released under the MIT license
URL：https://b1san-blog.com/post/vue/vue-tetris/
*/
const blocks = {

  0: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],  
  ],
  1: [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  2: [
    [0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0],
    [0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  3: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  4: [
    [0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0],
    [0, 0, 4, 0, 0],
    [0, 4, 4, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  5: [
    [0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0],
    [0, 0, 5, 0, 0],
    [0, 0, 5, 5, 0],
    [0, 0, 0, 0, 0],
  ],
  6: [
    [0, 0, 0, 0, 0],
    [0, 0, 6, 6, 0],
    [0, 6, 6, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  7: [
    [0, 0, 0, 0, 0],
    [0, 7, 7, 0, 0],
    [0, 0, 7, 7, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  // スキル: 8マスバー生成
  8: [
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  // パッシブ: トリオミノ
  9: [
    [0, 0, 0, 0, 0],
    [0, 0, 9, 0, 0],
    [0, 9, 9, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  10: [
    [0, 0, 0, 0, 0],
    [0, 0, 10, 0, 0],
    [0, 0, 10, 0, 0],
    [0, 0, 10, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};
//説明用
const testBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [4, 4, 4, 4, 0, 5, 5, 5, 5, 1],
  [4, 4, 4, 4, 0, 5, 5, 5, 5, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [4, 4, 4, 4, 0, 5, 5, 5, 5, 1],
  [4, 4, 4, 4, 0, 5, 5, 5, 5, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
];
/*********************************************
   データオブジェクト
  *********************************************/
let data = {
  board: {
    data: [],
    x: 10,
    y: 20,
  },
  block: {
    type: 0,
    data: [],
    x: 0,
    y: 0,
  },
  next: 0,
  fixorder: false,
  counter: 0,
  stock: {
    type: 0,
    stocked: false,
  },
  started: false,
  gameover: false,
  intervalId: undefined,
  score: 0,
  level: 1,
  description: false,
  option: false,
  DIO: false,
  isFeverTime: false,
  blockSelect: false,
  selectedBlock: 1,
  //キャラクター
  chara_now: {
    name: "",
    skill0: "",
    skill1: "",
    skill2: "",
    passive: "",
  },
  characters: {
    chara0: {
      name: "戦士",
      skill0: "8マスバー生成",
      skill1: "フィーバータイム",
      skill2: "爆破",
      passive: "なし",
    },
    chara1: {
      name: "魔法使い",
      skill0: "鏡反転",
      skill1: "IまたはTブロック生成",
      skill2: "時間停止",
      passive: "なし",
    },
    chara2: {
      name: "僧侶",
      skill0: "七種一巡",
      skill1: "",
      skill2: "蘇生",
      passive: "トリオミノ",
    },
    chara_demo: {
      name: "デモ用",
      skill0: "8マスバー生成",
      skill1: "なし",
      skill2: "なし",
      passive: "コスト無限",
    },
  },
  skills: {
    //使用可能なコストの数を示す
    cost: 0,//デモのときは直接ここをいじる
    //skills,passiveの数字はスキルの種類を示す（使用回数ではない）
    //小
    // skill0: {
    //   name: "8マスバー生成",
    //   cost: 1,
    // },
    // //中
    // skill1: {
    //   name: "スキル中",
    //   cost: 5,
    // },
    // //大
    // skill2: {
    //   name: "スキル大",
    //   cost: 8,
    // },
    //パッシブ
    // passive: "なし",
  },
  // キーコンフィグの変数を管理
  handlekey: {
    keyright: 39,
    keyleft: 37,
    keydownbottom: 38,
    keydown: 40,
    keysetStock: 16, //Shift
    keyrotate: 32, //Space
    keyuseSkill0: 65, //A
    keyuseSkill1: 83, //S
    keyuseSkill2: 68, //D
    keyCheat: 80, //P
    keyRestart: 82, //R
  },
};
/*********************************************
   メソッドオブジェクト
  *********************************************/
function inputValue() {
  let index = document.charaForm.charaSelect.selectedIndex;
  let value = document.charaForm.charaSelect.options[index]._value;
  data.chara_now = value;
}
let methods = {
  /*
   * ゲーム開始
   */
  start() {
    this.clear();
    this.setNext();
    this.setBlock();
    this.started = true;
    this.startTimer();
  },
  /*
   * 終了処理
   */
  end() {
    if (this.chara_now.name === "僧侶" && this.useSkill2(true)) {
      return false;
    } else {
      this.started = false;
      this.gameover = true;
      this.stopTimer();
      return true;
    }
  },
  /*
   * タイマーセット
   */
  startTimer() {
    this.intervalId = setInterval(this.down, 1000 - (this.level - 1) * 100);
  },
  /*
   * タイマーオフ
   */
  stopTimer() {
    clearInterval(this.intervalId);
  },
  /*
   * タイマーリセット
   */
  resetTimer() {
    this.stopTimer();
    this.startTimer();
  },
  /*
   * ゲームクリアする
   */
  clear() {
    this.board.data = [...Array(this.board.y)].map(() =>
      Array(this.board.x).fill(0)
    );
    this.gameover = false;
    this.score = 0;
    this.level = 1;
    this.stock = {
      type: 0,
      stocked: false,
    };
    //コストを0に初期化
    this.skills.cost = 10;
    // // すべてのスキルの使用可能回数を0に初期化
    // Object.keys(this.skills).forEach((skill) => {
    //   this.skills[skill] = 0;
    // });
  },
  /*
   * ブロックを配備
   */
  setBlock() {
    //次のブロック設定
    this.setNext();
    //ブロック再配置
    this.initBlock();
  },
  /*
   * ブロック初期化
   */
  initBlock() {
    switch (this.block.type) {
      case 1:
        this.block.x = 2;
        this.block.y = 0;
        break;
      case 8:
        this.block.x = 0;
        this.block.y = 0;
        break;
      default:
        this.block.x = 2;
        this.block.y = -1;
    }
    this.block.data = JSON.parse(JSON.stringify(blocks[this.block.type]));
    while (this.isOverlap()) {
      this.block.y -= 1;
    }
  },
  /*
   * ブロックが重なっているか判定
   */
  isOverlap() {
    for (let h = 0; h < this.block.data.length; h++) {
      const y = this.block.y + h;
      if (y < 0) {
        continue;
      }
      for (let v = 0; v < this.block.data[h].length; v++) {
        const x = this.block.x + v;
        if (this.block.data[h][v] > 0 && this.board.data[y][x] > 0) {
          return true;
        }
      }
    }
    return false;
  },
  /*
   * 次のブロックを設定
   */
  setNext() {
    this.block.type = this.next;
    if (this.fixorder === true) {
      this.counter += 1;
      if (this.counter <= 21) {
        this.next = this.next <= 6 ? this.next + 1 : 1;
        return;
      } else {
        this.fixorder = false;
        this.counter = 0;
      }
    }
    this.next = Math.floor(Math.random() * 7) + 1;
    this.setPassiveSkillBlocks();
  },
  /*
   * ストックを設定
   */
  setStock() {
    if (this.stock.stocked) {
      return;
    }
    if (this.stock.type === 0) {
      this.stock.type = this.block.type;
      this.setBlock();
    } else {
      const tmp = this.stock.type;
      this.stock.type = this.block.type;
      this.block.type = tmp;
      this.initBlock();
      this.stock.stocked = true;
    }
    this.resetTimer();
  },
  /*
   * キー操作
   */

  handleKeydown(event) {
    event.preventDefault();
    //右移動
    if (event.keyCode === this.handlekey.keyright) {
      this.right();
    }
    //左移動
    else if (event.keyCode === this.handlekey.keyleft) {
      this.left();
    }
    //最下移動
    else if (event.keyCode === this.handlekey.keydownbottom) {
      this.downBottom();
    }
    //下移動
    else if (event.keyCode === this.handlekey.keydown) {
      this.down();
    }
    //ストック
    else if (event.keyCode === this.handlekey.keysetStock) {
      this.setStock();
    }
    //回転
    else if (event.keyCode === this.handlekey.keyrotate) {
      this.rotate();
    }
    else if (event.keyCode === this.handlekey.keyuseSkill0) {
      this.useSkill0();
    } else if (event.keyCode === this.handlekey.keyuseSkill1) {
      this.useSkill1();
    } else if (event.keyCode === this.handlekey.keyuseSkill2) {
      this.useSkill2();
    }
    else if (event.keyCode === this.handlekey.keyuseSkill1) {
      this.useSkill1();
    }
    else if (event.keyCode === this.handlekey.keyuseSkill2) {
      this.useSkill2();
    }
    //チート
    else if (event.keyCode === this.handlekey.keyCheat) {
      this.useCheat();
    }
    //リスタート
    else if (event.keyCode === this.handlekey.keyRestart) {
      this.start();
    }
    //IまたはTブロック生成
    else if (this.blockSelect == true) {
      console.log(this.blockSelect);
      if (event.keyCode == 81) {
        this.selectedBlock = 1;
      } else if (event.keyCode == 87) {
        this.selectedBlock = 3;
      }
      this.block.type = this.selectedBlock;
      this.initBlock();
    }
  },
  /*
   * 右移動
   */
  right() {
    if (!this.canMove(this.block.data, this.block.x + 1, this.block.y)) {
      return;
    }
    this.block.x += 1;
  },
  /*
   * 左移動
   */
  left() {
    if (!this.canMove(this.block.data, this.block.x - 1, this.block.y)) {
      return;
    }
    this.block.x -= 1;
  },
  /*
   * 回転
   */
  rotate() {
    //O型は回転しない
    if (this.block.type === 2) {
      return;
    }
    //回転後のブロック生成
    let block = JSON.parse(JSON.stringify(this.block.data));
    for (let h = 0; h < block.length; h++) {
      for (let v = 0; v < block[h].length; v++) {
        block[block.length - v - 1][h] = this.block.data[h][v];
      }
    }
    //回転可否
    if (!this.canMove(block, this.block.x, this.block.y)) {
      return;
    }
    this.block.data = block;
  },
  /*
   * 下移動
   */
  down() {
    if (this.canMove(this.block.data, this.block.x, this.block.y + 1)) {
      this.block.y += 1;
      if(data.DIO === false) {
        this.resetTimer();
      }
      return true;
    }
    //下までたどり着いたら盤面更新
    this.board.data = JSON.parse(JSON.stringify(this.display));
    //ゲームオーバー判定
    const g = this.block.type === 1 ? 0 : -1;
    if (this.block.y < g) {
      if (this.end()) return;
    }
    //ブロック配置
    this.stock.stocked = false;
    this.setBlock();
    //ライン消し
    this.deleteLine();
    return false;
  },
  /*
   * 最下まで移動
   */
  downBottom() {
    while (this.down()) {}
  },
  /*
   * idxブロックを現在のブロックと置き換え
   */
  setNewBlock(idx) {
    this.block.type = idx;
    this.initBlock();
  },
  /*
   * ブロックの順番固定 (3サイクル)
   */
  fixOrder() {
    this.fixorder = true;
    this.counter = 0;
    this.setNext();
  },
  /*
   * 鏡反転
   */
  mirroring() {
    // Z or L
    switch (this.block.type) {
      case 4:
        this.setNewBlock(5);
        break;
      case 5:
        this.setNewBlock(4);
        break;
      case 6:
        this.setNewBlock(7);
        break;
      case 7:
        this.setNewBlock(6);
        break;
    }
  },
  /**
   * 最上段まで積み上がってしまった場合に僧侶なら上段4ライン消す
   */
  revive() {
    if (this.chara_now.name === "僧侶") {
      Array.from(Array(6), (e, i) => i).forEach((num) => {
        const board_data_row = this.board.data[num];
        board_data_row.forEach((data, index) => {
          board_data_row[index] = 0;
        });
      });
    }
  },
  dio() {
    if (this.chara_now.name == '魔法使い') {
      this.stopTimer();
    }
  },
  fever() {
    this.isFeverTime = true;
    window.setTimeout(() => {
      this.isFeverTime = false;
    }, 10000);
  },
  generateBlock() {
    this.blockSelect = true;
    if (this.blockSelect == true) {
      setTimeout(() => {
        this.blockSelect = false;
      }, 5000);
    }
  },
  bomb() {
    let lines = [];
    for (let h = 16; h < this.board.y; h++) {
      let c = 0;
      for (let v = 0; v < this.board.x; v++) {
        c += this.board.data[h][v];
      }
      if (c > 0) {
        lines.push(h);
      }
    }
    //ライン消し
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      for (let v = 0; v < this.board.x; v++) {
        this.board.data[l][v] = 0;
      }
      for (let h = l; h > 1; h--) {
        this.board.data[h] = this.board.data[h - 1];
      }
    }
    this.setScore(lines.length);
  },
  /*
   * スキルの使用
   */
  //スキル小
  useSkill0() {
    // if (this.skills.skill0 >= 1) {
    //   this.skills.skill0 -= 1;
    //   this.block.type = this.next;
    //   this.next = 8;
    // }
    const skill_cost = 1;
    if (skill_cost <= this.skills.cost) {
      switch (this.chara_now.skill0) {
        // case "実装したいスキル": {
        // ここに処理を書く
        // }
        case "8マスバー生成": {
          if (this.block.type != 8) {
            this.skills.cost -= skill_cost;
            this.setNewBlock(8);
          }
          break;
        }
        case "鏡反転": {
          this.skills.cost -= skill_cost;
          this.mirroring();
          break;
        }
        case "七種一巡": {
          this.skills.cost -= skill_cost;
          this.fixOrder();
          break;
        }
      }
    }
  },
  //スキル中
  useSkill1() {
    const skill_cost = 5;
    if (skill_cost <= this.skills.cost) {
      switch (this.chara_now.skill1) {
        // case "実装したいスキル": {
        // ここに処理を書く
        // }
        case "フィーバータイム": {
          this.skills.cost -= skill_cost;
          this.fever();
          break;
        }
        case "IまたはTブロック生成": {
          this.skills.cost -= skill_cost;
          this.generateBlock();
          break;
        }
      }
    }
  },
  //スキル大
  // 蘇生を呼び出す時のみ引数を渡してuseSkill2を呼び出す、それ以外は無引数で呼ぶ
  useSkill2(revive = false) {
    const skill_cost = 8;
    // コストが足りていたらtrue, それ以外はfalseを返す
    if (skill_cost <= this.skills.cost) {
      switch (this.chara_now.skill2) {
        // case "実装したいスキル": {
        // ここに処理を書く
        // }
        case "時間停止": {
          if (data.DIO === false) {
            data.DIO = true;
            this.skills.cost -= skill_cost;
            this.dio();
          }
        }
        case "蘇生": {
          if (revive) {
            this.skills.cost -= skill_cost;
            this.revive();
          }
          break;
        }
        case "爆破": {
          this.skills.cost -= skill_cost;
          this.bomb();
          break;
        }
        default: {
          console.log("スキル2が設定されていません");
        }
      }
      return true;
    } else {
      return false;
    }
  },
  setPassiveSkillBlocks() {
    switch (this.chara_now.passive) {
      case "トリオミノ": {
        this.next = Math.floor(Math.random() * 2) + 9;
      }
      case "コスト無限": {
        this.skills.cost = 10;
      }
    }
  },

  /*
   * チート
   */
  useCheat() {
    this.clear();
    this.setNext();
    this.setBlock();
    this.started = true;
    this.skills.skill0 = this.skills.skill1 = this.skills.skill2 = 10;
    this.board.data = testBoard;
    this.resetTimer();
  },
  /*
   * 移動可否判定
   */
  canMove(block, x, y) {
    for (let h = 0; h < block.length; h++) {
      for (let v = 0; v < block[h].length; v++) {
        //左端判定
        if (x + v < 0 && block[h][v] > 0) {
          return false;
        }
        //右端判定
        if (x + v > this.board.x - 1 && block[h][v] > 0) {
          return false;
        }
        //下端判定
        if (y + h > this.board.y - 1 && block[h][v] > 0) {
          return false;
        }
        //上端判定
        if (y + h < 0 && block[h][v] > 0) {
          return false;
        }
        //ボード外の座標は無視
        if (
          x + v < 0 ||
          x + v > this.board.x - 1 ||
          y + h > this.board.y - 1 ||
          y + h < 0
        ) {
          continue;
        }
        //ブロック判定
        if (this.board.data[y + h][x + v] > 0 && block[h][v] > 0) {
          return false;
        }
      }
    }
    return true;
  },
  /*
   * ラインの削除
   */
  deleteLine() {
    //ライン消し判定
    let lines = [];
    for (let h = 0; h < this.board.y; h++) {
      let c = 1;
      for (let v = 0; v < this.board.x; v++) {
        c *= this.board.data[h][v];
      }
      if (c > 0) {
        lines.push(h);
      }
    }
    //ライン消し
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      for (let v = 0; v < this.board.x; v++) {
        this.board.data[l][v] = 0;
      }
      for (let h = l; h > 1; h--) {
        this.board.data[h] = this.board.data[h - 1];
      }
    }
    this.setScore(lines.length);
  },
  /*
   * 点数設定
   */
  setScore(num) {
    const normalScore = 10 * num ** 3;
    const addScore = this.isFeverTime ? 3 * normal : normalScore;
    // console.log(this.isFeverTime, addScore);
    this.score += this.chara_now.name === "戦士" ? 2 * addScore : addScore;
    if (num >= 2) {
      this.skills.cost += num - 1;
    }
  },
};
/*********************************************
   算出プロパティ
  *********************************************/
let computed = {
  /*
   * 画面に表示するボード
   */
  display() {
    //ボードのコピー
    let board = JSON.parse(JSON.stringify(this.board.data));
    if (this.block.data.length === 0) {
      return board;
    }
    //ブロックの描画
    for (let h = 0; h < this.block.data.length; h++) {
      for (let v = 0; v < this.block.data[h].length; v++) {
        const y = this.block.y + h;
        const x = this.block.x + v;
        if (y < 0 || x < 0 || y > this.board.y - 1 || x > this.board.x - 1) {
          continue;
        }
        if (this.block.data[h][v] === 0) {
          continue;
        }
        board[h + this.block.y][v + this.block.x] = this.block.data[h][v];
      }
    }
    return board;
  },
  /*
   * 次のブロック表示
   */
  nextBlock() {
    return blocks[this.next];
  },
  /*
   * ストックブロック表示
   */
  stockBlock() {
    return blocks[this.stock.type];
  },
};

const app = new Vue({
  el: "#app",
  data: data,
  methods: methods,
  computed: computed,
  created() {
    this.clear();
    //選択されたキャラクターを最初のキャラクターに
    this.chara_now = this.characters.chara0;
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    //***** characterを設定する

    //*****
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  filters: {
    blockClass(val) {
      switch (val) {
        case 1:
          return "block-i";
        case 2:
          return "block-o";
        case 3:
          return "block-t";
        case 4:
          return "block-j";
        case 5:
          return "block-l";
        case 6:
          return "block-s";
        case 7:
          return "block-z";
        case 8:
          return "block-8";
        case 9:
          return "block-3-i";
        case 10:
          return "block-3-j";
        default:
          return "";
      }
    },
  },
  watch: {
    score(val) {
      if (this.level >= 10) {
        return;
      }
      if (val >= (this.level + 1) ** 3 * 100) {
        this.level += 1;
        this.resetTimer();
      }
    },
  },
});
