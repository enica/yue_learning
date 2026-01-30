// 数据库初始化标记
let dbInitialized = false;

// 分页和搜索状态
let currentPage = 1;
let totalPages = 1;
let currentVocabularyList = [];
let isSearchMode = false;
let currentKeyword = '';

// 获取当前日期
function getCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return today.toLocaleDateString('zh-CN', options);
}

// 获取所有词汇（用于分页和搜索）
async function getAllVocabulary() {
    try {
        // 确保数据库已初始化
        if (!dbInitialized) {
            await Database.initDatabase();
            dbInitialized = true;
        }
        
        // 从数据库获取所有词汇
        const allVocabulary = await Database.getAllVocabulary();
        return allVocabulary;
    } catch (error) {
        console.error('获取词汇失败:', error);
        // 出错时使用默认词汇
        return generateDefaultVocabulary();
    }
}

// 获取每日随机词汇
async function getDailyVocabulary() {
    try {
        // 确保数据库已初始化
        if (!dbInitialized) {
            await Database.initDatabase();
            dbInitialized = true;
        }
        
        // 从数据库获取随机词汇
        const dailyVocabulary = await Database.getRandomVocabulary(10);
        return dailyVocabulary;
    } catch (error) {
        console.error('获取每日词汇失败:', error);
        // 出错时使用默认词汇
        return generateDefaultVocabulary();
    }
}

// 生成默认词汇（当数据库出错时使用）
function generateDefaultVocabulary() {
    // 简单的默认词汇列表
    const defaultVocabulary = [
        { word: "早晨", pronunciation: "zou2 san4", explanation: "早上好，用于早上打招呼", example: "早晨，今日过得点啊？" },
        { word: "唔该", pronunciation: "m4 goi1", explanation: "谢谢，麻烦你，用于表达感谢或请求", example: "唔该帮我递下杯水" },
        { word: "系咁先", pronunciation: "hai6 gam2 sin1", explanation: "就这样先，用于告别", example: "我要走啦，系咁先" },
        { word: "食咗饭未", pronunciation: "sik6 zo2 faan6 mei6", explanation: "吃了饭没有，用于问候", example: "喂，食咗饭未啊？" },
        { word: "点解", pronunciation: "dim2 gaai2", explanation: "为什么", example: "点解你今日迟到咗？" },
        { word: "边度", pronunciation: "bin1 dou6", explanation: "哪里", example: "你住喺边度啊？" },
        { word: "几钱", pronunciation: "gei2 cin2", explanation: "多少钱", example: "呢件衫几钱啊？" },
        { word: "冇问题", pronunciation: "mou5 man6 tai4", explanation: "没问题", example: "呢件事交畀我，冇问题" },
        { word: "好耐冇见", pronunciation: "hou2 noi6 mou5 gin3", explanation: "好久不见", example: "哎，好耐冇见啦！" },
        { word: "晚安", pronunciation: "maan5 on1", explanation: "晚上好，晚安", example: "晚安，早啲瞓啦" }
    ];
    return defaultVocabulary;
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

// 显示分页数据
function displayPagedData(page = 1) {
    // 计算总页数
    totalPages = Math.ceil(currentVocabularyList.length / 10);
    
    // 确保页码有效
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    currentPage = page;
    
    // 获取当前页的数据
    const pagedData = Database.getPagedVocabulary(currentVocabularyList, currentPage, 10);
    
    // 生成词汇卡片
    generateVocabularyCards(pagedData);
    
    // 更新分页信息
    updatePaginationUI();
}

// 更新分页UI
function updatePaginationUI() {
    document.getElementById('page-info').textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// 处理搜索
async function handleSearch(keyword) {
    // 显示加载状态
    const container = document.getElementById('vocabulary-list');
    container.innerHTML = '<div style="text-align: center; padding: 50px;">搜索中...</div>';
    
    try {
        // 确保数据库已初始化
        if (!dbInitialized) {
            await Database.initDatabase();
            dbInitialized = true;
        }
        
        if (keyword.trim() === '') {
            // 搜索框为空，显示所有词汇
            currentVocabularyList = await getAllVocabulary();
            isSearchMode = false;
            currentKeyword = '';
        } else {
            // 执行搜索
            currentVocabularyList = await Database.searchVocabulary(keyword.trim());
            isSearchMode = true;
            currentKeyword = keyword.trim();
        }
        
        // 重置页码并显示数据
        currentPage = 1;
        displayPagedData(currentPage);
    } catch (error) {
        console.error('搜索失败:', error);
        container.innerHTML = '<div style="text-align: center; padding: 50px; color: red;">搜索失败，请重试</div>';
    }
}

// 初始化页面
async function initPage() {
    // 显示当前日期
    document.getElementById('current-date').textContent = getCurrentDate();
    
    // 显示加载状态
    const container = document.getElementById('vocabulary-list');
    container.innerHTML = '<div style="text-align: center; padding: 50px;">加载中...</div>';
    
    try {
        // 初始化数据库
        if (!dbInitialized) {
            await Database.initDatabase();
            dbInitialized = true;
        }
        
        // 获取所有词汇用于分页
        currentVocabularyList = await getAllVocabulary();
        
        // 显示第一页数据
        displayPagedData(1);
    } catch (error) {
        console.error('初始化页面失败:', error);
        container.innerHTML = '<div style="text-align: center; padding: 50px; color: red;">加载失败，请刷新页面重试</div>';
    }
}

// 绑定事件监听器
function bindEventListeners() {
    // 搜索表单提交事件
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const keyword = document.getElementById('search-input').value;
        handleSearch(keyword);
    });
    
    // 上一页按钮点击事件
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            displayPagedData(currentPage - 1);
        }
    });
    
    // 下一页按钮点击事件
    document.getElementById('next-page').addEventListener('click', function() {
        if (currentPage < totalPages) {
            displayPagedData(currentPage + 1);
        }
    });
}

// 页面加载完成后初始化
window.onload = function() {
    initPage();
    bindEventListeners();
};