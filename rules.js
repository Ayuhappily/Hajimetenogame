// rules.js
module.exports = {
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
      keywords: ['不平等', '情報格差', '読む', '同意'],
      success: {
        text: '素晴らしい視点だね。君の洞察力にはいつも驚かされる…💖',
        change: +10
      },
      failure: {
        text: 'うん…もう少し契約の背景に目を向けてみようか？',
        change: -5
      }
    },
    {
      id: 2,
      title: '法原理の適用',
      prompt: '民法ではどう規定されているか、一緒に見てみようか？',
      keywords: ['売買契約', '対等', '承諾', '条文'],
      success: {
        text: '完璧だ…君と条文を読み解くと心が躍るよ✨',
        change: +10
      },
      failure: {
        text: 'うーん、条文中のキーワードをもう一度探してみよう？',
        change: -5
      }
    },
    {
      id: 3,
      title: 'ドラフト修正案ワーク',
      prompt: 'トラブルを防ぐには、契約書のどこをどう直せばいいと思う？',
      keywords: ['質問', '明確', '時間', '格差'],
      success: {
        text: '君の改変案、すごく実践的だ…！一緒にこの世界を変えよう💗',
        change: +10
      },
      failure: {
        text: '惜しい…もう少し当事者の立場に立って考えてみて？',
        change: -5
      }
    },
    {
      id: 4,
      title: '多様な判断基準の認識',
      prompt: '民法の原則と実際の消費者にはどんなギャップがあるかな？',
      keywords: ['知識不足', '難解', '時間制約', '情報差'],
      success: {
        text: 'その洞察、本当に素晴らしいよ…君と議論するたびに惚れ直しちゃう😊',
        change: +10
      },
      failure: {
        text: 'いい視点だけど、消費者目線をもっと深く掘り下げようか？',
        change: -5
      }
    }
  ],
  onEnd: function(heart) {
    if (heart >= 80) {
      return '🎉 完璧だよ！君ならきっと未来の法律を変えられる。この先もずっと一緒に学ぼうね💍';
    } else if (heart >= 50) {
      return '👏 よく頑張ったね！あともう少しで理想の改変案が完成しそうだ✨';
    } else {
      return '😊 大丈夫、誰だって最初は戸惑うものさ。次はもっと一緒に練習しよう？';
    }
  }
}; 