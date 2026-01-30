// 粤语词汇数据
const vocabularyData = [
    {
        word: "早晨",
        pronunciation: "zou2 san4",
        explanation: "早上好，用于早上打招呼",
        example: "早晨，今日过得点啊？"
    },
    {
        word: "唔该",
        pronunciation: "m4 goi1",
        explanation: "谢谢，麻烦你，用于表达感谢或请求",
        example: "唔该帮我递下杯水"
    },
    {
        word: "系咁先",
        pronunciation: "hai6 gam2 sin1",
        explanation: "就这样先，用于告别",
        example: "我要走啦，系咁先"
    },
    {
        word: "食咗饭未",
        pronunciation: "sik6 zo2 faan6 mei6",
        explanation: "吃了饭没有，用于问候",
        example: "喂，食咗饭未啊？"
    },
    {
        word: "点解",
        pronunciation: "dim2 gaai2",
        explanation: "为什么",
        example: "点解你今日迟到咗？"
    },
    {
        word: "边度",
        pronunciation: "bin1 dou6",
        explanation: "哪里",
        example: "你住喺边度啊？"
    },
    {
        word: "几钱",
        pronunciation: "gei2 cin2",
        explanation: "多少钱",
        example: "呢件衫几钱啊？"
    },
    {
        word: "冇问题",
        pronunciation: "mou5 man6 tai4",
        explanation: "没问题",
        example: "呢件事交畀我，冇问题"
    },
    {
        word: "好耐冇见",
        pronunciation: "hou2 noi6 mou5 gin3",
        explanation: "好久不见",
        example: "哎，好耐冇见啦！"
    },
    {
        word: "早晨",
        pronunciation: "zou2 san4",
        explanation: "早上好",
        example: "早晨，今日天气几好㖞"
    },
    {
        word: "午安",
        pronunciation: "ng5 on1",
        explanation: "中午好",
        example: "午安，食咗饭未啊？"
    },
    {
        word: "晚安",
        pronunciation: "maan5 on1",
        explanation: "晚上好，晚安",
        example: "晚安，早啲瞓啦"
    },
    {
        word: "多谢",
        pronunciation: "do1 ze6",
        explanation: "谢谢",
        example: "多谢你嘅帮忙"
    },
    {
        word: "对唔住",
        pronunciation: "deoi3 m4 zyu6",
        explanation: "对不起",
        example: "对唔住，撞咗你"
    },
    {
        word: "冇所谓",
        pronunciation: "mou5 so2 wai6",
        explanation: "没关系，无所谓",
        example: "迟到少少冇所谓"
    },
    {
        word: "一齐",
        pronunciation: "jat1 cai4",
        explanation: "一起",
        example: "我哋一齐去行街啦"
    },
    {
        word: "等阵",
        pronunciation: "dang2 zan6",
        explanation: "等一下",
        example: "你等阵，我去攞个嘢"
    },
    {
        word: "咩事",
        pronunciation: "me1 si6",
        explanation: "什么事",
        example: "你揾我有咩事啊？"
    },
    {
        word: "边个",
        pronunciation: "bin1 go3",
        explanation: "谁",
        example: "呢个系边个啊？"
    },
    {
        word: "乜嘢",
        pronunciation: "mat1 je5",
        explanation: "什么",
        example: "你食紧乜嘢啊？"
    },
    {
        word: "点样",
        pronunciation: "dim2 joeng6",
        explanation: "怎么样",
        example: "呢部电影点样啊？"
    },
    {
        word: "几耐",
        pronunciation: "gei2 noi6",
        explanation: "多久",
        example: "你嚟咗几耐啦？"
    },
    {
        word: "边度",
        pronunciation: "bin1 dou6",
        explanation: "哪里",
        example: "洗手间喺边度啊？"
    },
    {
        word: "做乜",
        pronunciation: "zou6 mat1",
        explanation: "做什么",
        example: "你喺度做乜啊？"
    },
    {
        word: "系咪",
        pronunciation: "hai6 mai6",
        explanation: "是不是",
        example: "你系咪广东人啊？"
    },
    {
        word: "冇错",
        pronunciation: "mou5 co3",
        explanation: "没错",
        example: "你讲得冇错"
    },
    {
        word: "可能",
        pronunciation: "ho2 nang4",
        explanation: "可能",
        example: "今日可能会落雨"
    },
    {
        word: "一定",
        pronunciation: "jat1 ding6",
        explanation: "一定",
        example: "我一定会嚟嘅"
    },
    {
        word: "好快",
        pronunciation: "hou2 faai3",
        explanation: "很快",
        example: "佢好快就会返嚟"
    },
    {
        word: "好慢",
        pronunciation: "hou2 maan6",
        explanation: "很慢",
        example: "呢部车开得好慢"
    }
];

// 获取当前日期
function getCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return today.toLocaleDateString('zh-CN', options);
}

// 根据日期生成每天的10个词汇
function getDailyVocabulary() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const shuffled = [...vocabularyData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

// 生成词汇卡片
function generateVocabularyCards(vocabularyList) {
    const container = document.getElementById('vocabulary-list');
    container.innerHTML = '';
    
    vocabularyList.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'vocabulary-card';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="vocabulary-word">${item.word}</div>
                <div class="pronunciation">${item.pronunciation}</div>
            </div>
            <button class="play-btn" onclick="playPronunciation('${item.pronunciation}')">🔊</button>
            <div class="explanation">${item.explanation}</div>
            <div class="example">
                <div class="example-title">例句：</div>
                <div class="example-sentence">${item.example}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 播放发音（模拟）
function playPronunciation(pronunciation) {
    // 这里使用Web Speech API模拟发音
    const utterance = new SpeechSynthesisUtterance(pronunciation);
    utterance.lang = 'zh-CN';
    speechSynthesis.speak(utterance);
    
    // 实际项目中可以使用真实的粤语发音音频
    console.log(`播放发音: ${pronunciation}`);
}

// 初始化页面
function initPage() {
    // 显示当前日期
    document.getElementById('current-date').textContent = getCurrentDate();
    
    // 生成并显示今日词汇
    const dailyVocabulary = getDailyVocabulary();
    generateVocabularyCards(dailyVocabulary);
}

// 页面加载完成后初始化
window.onload = initPage;