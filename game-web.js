// game-web.js
const gameRules = {
  character: {
    name: '春野 瑛士',
    role: '弁護士',
    style: 'ikemen',
    greeting: 'やあ、君と一緒に契約を読み解く時間が本当に楽しみだったよ💖 リラックスして、最初の問題を見てみようか？',
    initialHeart: 50
  },
  gauge: { max: 100, min: 0 },
  phases: [
    {
      id: 1,
      title: '価値観に基づく判断',
      prompt: 'この契約、本当に公正だと思う？',
      contractExample: '【契約例】オンラインショップの利用規約\n「本サービスを利用する際は、当社が定める全ての条件に同意したものとみなします。利用者は規約の変更について事前通知なく適用されることに同意します。」',
      hasChoiceButtons: true,
      choiceButtons: [
        { text: 'はい', value: 'はい', color: 'success' },
        { text: 'いいえ', value: 'いいえ', color: 'danger' }
      ],
      keywords: ['不平等', '情報格差', '読む', '同意', '一方的', '変更', '通知', '公正', '問題', '不当'],
      feedbackPatterns: [
        {
          patterns: ['公正', '公平', '正しい', '良い', '問題ない', 'はい'],
          // 価値観を尊重しつつ、多角的な視点を提供
          response: 'なるほど、その視点も大切だね。でも、利用者の立場からも考えてみない？どんな気持ちになるかな？💭',
          change: +3
        },
        {
          patterns: ['不平等', '不当', '一方的', '問題', 'おかしい', 'いいえ'],
          // 批判的思考を評価
          response: '素晴らしい視点だね！君の洞察力にはいつも驚かされる…💖',
          change: +8
        },
        {
          patterns: ['変更', '通知', '事前', '同意'],
          // 中立的な視点を評価
          response: 'いい視点だよ！もう少し深く考えてみようか？君の考えはとても興味深い✨',
          change: +5
        },
        {
          patterns: ['分からない', 'わからない', '難しい', '複雑'],
          // 困惑も自然な反応として受け入れる
          response: '大丈夫、誰だって最初は戸惑うものさ。どんなことでも気づいたことを教えてね😊',
          change: +2
        }
      ],
      defaultResponse: {
        // どんな回答も尊重する
        text: '君の考え、とても興味深いよ。どんな視点から見たの？もっと教えてね😊',
        change: +1
      }
    },
    {
      id: 2,
      title: '法原理の適用',
      prompt: 'この契約は民法の原則に合っていると思う？',
      contractExample: '【契約例】中古車販売契約\n「売主は車両の状態について一切の責任を負わない。買主は車両を現状有姿で引き取るものとする。」\n\n【参考条文】民法第415条（債務不履行）\n「債務者がその債務の本旨に従った履行をしないときは、債権者は、その債務の不履行を理由として、損害賠償の請求をすることができる。」',
      hasChoiceButtons: true,
      choiceButtons: [
        { text: 'はい', value: 'はい', color: 'success' },
        { text: 'いいえ', value: 'いいえ', color: 'danger' }
      ],
      keywords: ['売買契約', '対等', '承諾', '条文', '責任', '民法', '規定', '契約', '義務', '権利'],
      feedbackPatterns: [
        {
          patterns: ['合っていない', '違反', '問題', '不当', '責任', 'いいえ'],
          // 法的視点からの批判を評価
          response: '完璧だ…君と条文を読み解くと心が躍るよ✨',
          change: +8
        },
        {
          patterns: ['民法', '条文', '規定', '法律', '415条'],
          // 法的思考を評価
          response: 'いい感じだね！民法の視点からも考えてみようか？君の理解は素晴らしいよ💫',
          change: +5
        },
        {
          patterns: ['合っている', '問題ない', '正しい', 'はい'],
          // 異なる視点も尊重しつつ、法的観点を提供
          response: 'なるほど、その見方もあるね。でも条文をもう一度見てみない？売主の責任免除は本当に妥当かな？💭',
          change: +3
        },
        {
          patterns: ['分からない', 'わからない', '難しい', '複雑'],
          // 困惑も自然な反応として受け入れる
          response: '大丈夫、民法は確かに複雑だよね。どんなことでも気づいたことを教えてね😊',
          change: +2
        }
      ],
      defaultResponse: {
        // どんな回答も尊重する
        text: '君の考え、とても興味深いよ。条文と照らし合わせてみると、どんな気づきがあるかな？😊',
        change: +1
      }
    },
    {
      id: 3,
      title: 'ドラフト修正案ワーク',
      prompt: 'トラブルを防ぐには、契約書のどこをどう直せばいいと思う？',
      contractExample: '【契約例】アパート賃貸契約\n「賃料は毎月1日に支払う。遅延した場合は1日につき賃料の10%の遅延損害金を支払う。」',
      hasChoiceButtons: false,
      keywords: ['質問', '明確', '時間', '格差', '修正', '改善', '条項', '変更', '追加', '削除'],
      feedbackPatterns: [
        {
          patterns: ['修正', '改善', '変更', '追加', '削除'],
          // 改善提案を評価
          response: '君の改変案、すごく実践的だ…！一緒にこの世界を変えよう💗',
          change: +8
        },
        {
          patterns: ['明確', '具体的', '詳細', '分かりやすく'],
          // 具体的思考を評価
          response: 'いいアイデアだね！もう少し具体的に考えてみようか？君の発想はとても創造的だよ🌟',
          change: +5
        },
        {
          patterns: ['10%', '損害金', '遅延', '過重'],
          // 問題意識を評価
          response: 'いい視点だね！確かにその部分は問題がありそうだね💭',
          change: +3
        },
        {
          patterns: ['分からない', 'わからない', '難しい', 'どこを'],
          // 困惑も自然な反応として受け入れる
          response: '大丈夫、どんな小さな改善案でもいいんだよ。どんなことでも気づいたことを教えてね😊',
          change: +2
        }
      ],
      defaultResponse: {
        // どんな回答も尊重する
        text: '君の考え、とても興味深いよ。当事者の立場に立ってみると、どんな改善点が見えてくるかな？😊',
        change: +1
      }
    },
    {
      id: 4,
      title: '多様な判断基準の認識',
      prompt: '民法の原則と実際の消費者にはどんなギャップがあるかな？',
      contractExample: '【契約例】スマホアプリ利用規約\n「本アプリの利用により生じた一切の損害について、当社は責任を負いません。利用者は自己責任でアプリを使用するものとします。」\n\n【参考条文】民法第709条（不法行為）\n「故意又は過失によって他人の権利又は法律上保護される利益を侵害した者は、これによって生じた損害を賠償する責任を負う。」',
      hasChoiceButtons: false,
      keywords: ['知識不足', '難解', '時間制約', '情報差', '消費者', '理解', '複雑', '専門', '一般', '分かりやすさ'],
      feedbackPatterns: [
        {
          patterns: ['消費者', '一般', '分かりやすさ', '理解'],
          // 消費者視点を評価
          response: 'その洞察、本当に素晴らしいよ…君と議論するたびに惚れ直しちゃう😊',
          change: +8
        },
        {
          patterns: ['知識不足', '難解', '複雑', '専門'],
          // 問題意識を評価
          response: 'いい視点だね！消費者目線をもっと深く掘り下げようか？君の考えはとても大切だよ💫',
          change: +5
        },
        {
          patterns: ['時間', '制約', '情報', '差'],
          // 現実的視点を評価
          response: 'いい視点だね！確かにその部分は重要なギャップだね💭',
          change: +3
        },
        {
          patterns: ['分からない', 'わからない', '難しい', 'ギャップ'],
          // 困惑も自然な反応として受け入れる
          response: '大丈夫、どんな小さな気づきでもいいんだよ。どんなことでも教えてね😊',
          change: +2
        }
      ],
      defaultResponse: {
        // どんな回答も尊重する
        text: '君の考え、とても興味深いよ。消費者目線をもっと深く掘り下げようか？どんなことでも気づいたことを教えてね😊',
        change: +1
      }
    }
  ],
  onEnd: function(heart) {
    if (heart >= 80) {
      // 高評価でも多様性を尊重
      return '🎉 完璧だよ！君ならきっと未来の法律を変えられる。この先もずっと一緒に学ぼうね💍';
    } else if (heart >= 50) {
      // 中程度でも努力を評価
      return '👏 よく頑張ったね！あともう少しで理想の改変案が完成しそうだ✨';
    } else {
      // 低評価でも励まし
      return '😊 大丈夫、誰だって最初は戸惑うものさ。次はもっと一緒に練習しよう？';
    }
  }
};

class Game {
  constructor() {
    this.character = gameRules.character;
    this.phases = gameRules.phases;
    this.gauge = gameRules.gauge;
    this.onEnd = gameRules.onEnd;
    this.heart = this.character.initialHeart;
    this.currentPhaseIndex = 0;
    this.gameEnded = false;

    this.initializeElements();
    this.bindEvents();
    this.updateUI();
  }

  initializeElements() {
    this.characterNameEl = document.getElementById('character-name');
    this.characterRoleEl = document.getElementById('character-role');
    this.characterMessageEl = document.getElementById('character-message');
    this.phaseTitleEl = document.getElementById('phase-title');
    this.userInputEl = document.getElementById('user-input');
    this.submitBtnEl = document.getElementById('submit-btn');
    this.resultMessageEl = document.getElementById('result-message');
    this.gaugeFillEl = document.getElementById('gauge-fill');
    this.gaugeTextEl = document.getElementById('gauge-text');
    this.restartBtnEl = document.getElementById('restart-btn');
    this.contractExampleEl = document.getElementById('contract-example');
    this.choiceButtonsContainer = document.getElementById('choice-buttons');
  }

  bindEvents() {
    this.submitBtnEl.addEventListener('click', () => this.handleSubmit());
    this.userInputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSubmit();
      }
    });
    this.restartBtnEl.addEventListener('click', () => this.restartGame());
  }

  createChoiceButtons(buttons) {
    this.choiceButtonsContainer.innerHTML = '';
    
    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.className = `choice-btn ${button.color}`;
      btn.textContent = button.text;
      btn.addEventListener('click', () => this.handleChoice(button.value));
      this.choiceButtonsContainer.appendChild(btn);
    });
  }

  handleChoice(value) {
    const currentPhase = this.phases[this.currentPhaseIndex];
    const feedback = this.getFeedback(value, currentPhase);

    // ハートゲージを更新
    this.heart = Math.min(this.gauge.max, Math.max(this.gauge.min, this.heart + feedback.change));
    
    // 結果を表示
    this.showResult(feedback.text, feedback.type);
    
    // 選択ボタンを無効化
    this.disableChoiceButtons();
    
    // 次のフェーズに進む
    setTimeout(() => {
      this.nextPhase();
    }, 3000);
  }

  disableChoiceButtons() {
    const buttons = this.choiceButtonsContainer.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
    });
  }

  enableChoiceButtons() {
    const buttons = this.choiceButtonsContainer.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
    });
  }

  getFeedback(input, currentPhase) {
    const lowerInput = input.toLowerCase();
    
    // パターンマッチングでフィードバックを決定
    for (const pattern of currentPhase.feedbackPatterns) {
      for (const keyword of pattern.patterns) {
        if (lowerInput.includes(keyword.toLowerCase())) {
          return {
            text: pattern.response,
            change: pattern.change,
            type: pattern.change >= 5 ? 'success' : pattern.change >= 0 ? 'partial' : 'failure'
          };
        }
      }
    }
    
    // デフォルトフィードバック
    return {
      text: currentPhase.defaultResponse.text,
      change: currentPhase.defaultResponse.change,
      type: 'failure'
    };
  }

  handleSubmit() {
    if (this.gameEnded) return;

    const input = this.userInputEl.value.trim();
    if (!input) {
      this.showResult('回答を入力してください。', 'failure');
      return;
    }

    const currentPhase = this.phases[this.currentPhaseIndex];
    const feedback = this.getFeedback(input, currentPhase);

    // ハートゲージを更新
    this.heart = Math.min(this.gauge.max, Math.max(this.gauge.min, this.heart + feedback.change));
    
    // 結果を表示
    this.showResult(feedback.text, feedback.type);
    
    // 入力フィールドをクリア
    this.userInputEl.value = '';
    
    // 次のフェーズに進む
    setTimeout(() => {
      this.nextPhase();
    }, 3000);
  }

  nextPhase() {
    this.currentPhaseIndex++;
    
    if (this.currentPhaseIndex >= this.phases.length) {
      this.endGame();
    } else {
      this.updateUI();
      this.clearResult();
    }
  }

  updateUI() {
    if (this.gameEnded) return;

    const currentPhase = this.phases[this.currentPhaseIndex];
    
    // フェーズ情報を更新
    this.phaseTitleEl.textContent = `Phase ${currentPhase.id}: ${currentPhase.title}`;
    
    // キャラクターのメッセージを更新
    this.characterMessageEl.textContent = currentPhase.prompt;
    
    // 契約例を更新
    if (this.contractExampleEl) {
      this.contractExampleEl.textContent = currentPhase.contractExample;
    }
    
    // 選択ボタンの表示/非表示を切り替え
    if (currentPhase.hasChoiceButtons) {
      this.createChoiceButtons(currentPhase.choiceButtons);
      this.choiceButtonsContainer.style.display = 'flex';
      this.userInputEl.style.display = 'none';
      this.submitBtnEl.style.display = 'none';
    } else {
      this.choiceButtonsContainer.style.display = 'none';
      this.userInputEl.style.display = 'block';
      this.submitBtnEl.style.display = 'block';
      this.enableChoiceButtons();
    }
    
    // ハートゲージを更新
    this.updateGauge();
  }

  updateGauge() {
    const percentage = (this.heart / this.gauge.max) * 100;
    this.gaugeFillEl.style.width = `${percentage}%`;
    this.gaugeTextEl.textContent = `❤ ${this.heart}/${this.gauge.max}`;
  }

  showResult(message, type) {
    this.resultMessageEl.textContent = message;
    this.resultMessageEl.className = `result-message ${type}`;
    this.resultMessageEl.style.display = 'flex';
  }

  clearResult() {
    this.resultMessageEl.style.display = 'none';
    this.resultMessageEl.className = 'result-message';
  }

  endGame() {
    this.gameEnded = true;
    const endMessage = this.onEnd(this.heart);
    this.characterMessageEl.textContent = endMessage;
    this.phaseTitleEl.textContent = 'ゲーム終了';
    this.userInputEl.disabled = true;
    this.submitBtnEl.disabled = true;
    this.choiceButtonsContainer.style.display = 'none';
    this.restartBtnEl.classList.add('show');
  }

  restartGame() {
    this.heart = this.character.initialHeart;
    this.currentPhaseIndex = 0;
    this.gameEnded = false;
    
    this.userInputEl.disabled = false;
    this.submitBtnEl.disabled = false;
    this.restartBtnEl.classList.remove('show');
    
    this.clearResult();
    this.updateUI();
  }
}

// ゲームを開始
document.addEventListener('DOMContentLoaded', () => {
  new Game();
}); 