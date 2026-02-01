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

// 生成默认词汇
function generateDefaultVocabulary() {
    return [
        { word: "早晨", pronunciation: "zou2 san4", explanation: "早上好", example: "早晨，你好" }
    ];
}

// 获取所有词汇
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
        return generateDefaultVocabulary();
    }
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
            <button class="play-btn" onclick="playPronunciation('${item.word}')">🔊</button>
            <div class="explanation">${item.explanation}</div>
            <div class="example">
                <div class="example-title">例句：</div>
                <div class="example-sentence">${item.example}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 语音引擎加载完成标记
let voicesLoaded = false;

// 强制加载语音引擎
function loadVoices() {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
            voicesLoaded = true;
            console.log('语音引擎已加载，可用语音数量:', voices.length);
            console.log('可用语音:', voices.map(v => `${v.name} (${v.lang})`));
            resolve(voices);
            return;
        }
        
        // 如果还没有语音，等待语音引擎加载
        console.log('等待语音引擎加载...');
        
        window.speechSynthesis.onvoiceschanged = function() {
            const loadedVoices = window.speechSynthesis.getVoices();
            voicesLoaded = true;
            console.log('语音引擎加载完成，可用语音数量:', loadedVoices.length);
            console.log('可用语音:', loadedVoices.map(v => `${v.name} (${v.lang})`));
            resolve(loadedVoices);
        };
        
        // 设置超时，避免无限等待
        setTimeout(() => {
            const timeoutVoices = window.speechSynthesis.getVoices();
            console.log('语音引擎加载超时，当前语音数量:', timeoutVoices.length);
            resolve(timeoutVoices);
        }, 3000);
    });
}

// 确保语音引擎已加载
function ensureVoicesLoaded() {
    if (!voicesLoaded) {
        // 强制触发语音引擎加载
        window.speechSynthesis.getVoices();
        console.log('尝试加载语音引擎...');
    }
}

// 播放发音 - 改进版本
function playPronunciation(word) {
    console.log('播放发音请求:', word);
    
    // 检查浏览器支持
    if (!('speechSynthesis' in window)) {
        console.error('浏览器不支持语音合成');
        return;
    }
    
    // 使用Promise确保语音引擎已加载
    loadVoices().then((voices) => {
        try {
            // 创建新的语音合成对象
            const utterance = new SpeechSynthesisUtterance(word);
            
            // 设置基本参数
            utterance.volume = 1;
            utterance.rate = 0.9;
            utterance.pitch = 1;
            
            console.log('当前可用语音数量:', voices.length);
            
            // 尝试找到粤语语音
            const cantoneseVoice = voices.find(voice => 
                voice.lang === 'zh-HK' || 
                voice.lang === 'zh-yue' || 
                voice.name.includes('Cantonese') || 
                voice.name.includes('Hong Kong') ||
                voice.name.includes('粤語') ||
                voice.name.includes('粤语')
            );
            
            if (cantoneseVoice) {
                utterance.voice = cantoneseVoice;
                utterance.lang = cantoneseVoice.lang;
                console.log('使用粤语语音:', cantoneseVoice.name, '(', cantoneseVoice.lang, ')');
                
                // 为粤语语音调整参数
                utterance.rate = 0.85; // 稍慢一点
                utterance.pitch = 0.95; // 稍低音调
            } else {
                // 如果没有粤语语音，使用普通话语音
                const chineseVoice = voices.find(voice => 
                    voice.lang === 'zh-CN' || 
                    voice.lang === 'zh' || 
                    voice.name.includes('Chinese') || 
                    voice.name.includes('普通话')
                );
                
                if (chineseVoice) {
                    utterance.voice = chineseVoice;
                    utterance.lang = chineseVoice.lang;
                    console.log('使用普通话语音:', chineseVoice.name, '(', chineseVoice.lang, ')');
                } else {
                    // 使用默认语音
                    utterance.lang = 'zh-CN';
                    console.log('使用默认语音设置');
                }
            }
            
            // 在speak之前设置事件监听器
            utterance.onstart = function(event) {
                console.log('发音开始:', word);
            };
            
            utterance.onend = function(event) {
                console.log('发音结束:', word);
            };
            
            utterance.onerror = function(event) {
                console.error('发音错误:', word, event.error);
                
                // 如果粤语语音失败，尝试使用普通话语音
                if (utterance.lang === 'zh-HK' || utterance.lang === 'zh-yue') {
                    console.log('粤语语音失败，尝试使用普通话语音');
                    const fallbackUtterance = new SpeechSynthesisUtterance(word);
                    fallbackUtterance.lang = 'zh-CN';
                    fallbackUtterance.volume = 1;
                    fallbackUtterance.rate = 0.9;
                    window.speechSynthesis.speak(fallbackUtterance);
                }
            };
            
            // 播放语音
            window.speechSynthesis.speak(utterance);
            console.log('开始播放:', word);
            
        } catch (error) {
            console.error('播放发音时出错:', error);
        }
    }).catch((error) => {
        console.error('加载语音引擎失败:', error);
    });
}

// 基础语音合成示例
function speakCantonese(text) {
  text = text || '你好，世界！';
  
  // 确保语音加载完成
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.addEventListener('voiceschanged', () => {
      speakWithVoice(text);
    });
  } else {
    speakWithVoice(text);
  }
}

function speakWithVoice(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  
  console.log('可用语音列表:');
  voices.forEach(voice => {
    console.log(`${voice.name} - ${voice.lang}`);
  });
  
  // 尝试多种可能的粤语语音标识
  const cantoneseVoice = voices.find(voice => 
    voice.lang.includes('zh-HK') || 
    voice.lang.includes('yue') || 
    voice.lang.includes('zh-TW') || // 有时台湾语音也能读粤语
    voice.name.toLowerCase().includes('cantonese') ||
    voice.name.toLowerCase().includes('hk') ||
    voice.name.toLowerCase().includes('hong kong')
  );
  
  if (cantoneseVoice) {
    console.log('使用粤语语音:', cantoneseVoice.name);
    utterance.voice = cantoneseVoice;
    utterance.lang = cantoneseVoice.lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  } else {
    console.warn('未找到粤语语音，使用默认语音');
    
    // 尝试使用系统默认中文语音
    const chineseVoice = voices.find(voice => 
      voice.lang.includes('zh-') || 
      voice.lang.startsWith('zh')
    );
    
    if (chineseVoice) {
      utterance.voice = chineseVoice;
      utterance.lang = chineseVoice.lang;
    }
    
    // 添加粤语提示
    const fallbackText = `粤语语音不可用，使用${chineseVoice ? '其他中文语音' : '默认语音'}朗读：${text}`;
    console.log(fallbackText);
    
    utterance.text = text;
    speechSynthesis.speak(utterance);
  }
}

// 测试粤语发音
function testCantoneseSpeech() {
    console.log('开始测试粤语发音功能');
    
    // 测试词汇
    const testWords = ["点解", "你好", "多謝", "唔該", "边度"];
    
    // 使用Promise确保语音引擎已加载
    loadVoices().then((voices) => {
        console.log('语音引擎已就绪，开始播放测试词汇');
        
        // 查找可用的语音
        const cantoneseVoice = voices.find(voice => 
            voice.lang === 'zh-HK' || 
            voice.lang === 'zh-yue' || 
            voice.name.includes('Cantonese') || 
            voice.name.includes('Hong Kong') ||
            voice.name.includes('粤語') ||
            voice.name.includes('粤语')
        );
        
        const chineseVoice = voices.find(voice => 
            voice.lang === 'zh-CN' || 
            voice.lang === 'zh' || 
            voice.name.includes('Chinese') || 
            voice.name.includes('普通话')
        );
        
        console.log('找到粤语语音:', cantoneseVoice ? cantoneseVoice.name : '无');
        console.log('找到普通话语音:', chineseVoice ? chineseVoice.name : '无');
        
        // 播放测试词汇
        playTestWords(testWords, cantoneseVoice || chineseVoice, 0);
        
    }).catch((error) => {
        console.error('加载语音引擎失败:', error);
    });
}

// 播放测试词汇序列
function playTestWords(words, voice, index) {
    if (index >= words.length) {
        console.log('粤语发音测试完成');
        return;
    }
    
    const word = words[index];
    console.log(`播放测试词汇 ${index + 1}/${words.length}: ${word}`, '使用语音:', voice ? voice.name : '默认');
    
    // 先停止任何正在播放的语音
    window.speechSynthesis.cancel();
    
    // 等待一小段时间确保语音引擎已准备好
    setTimeout(() => {
        try {
            const utterance = new SpeechSynthesisUtterance(word);
            
            if (voice) {
                utterance.voice = voice;
                utterance.lang = voice.lang;
                
                // 根据语音类型调整参数
                if (voice.lang === 'zh-HK' || voice.lang === 'zh-yue') {
                    utterance.rate = 0.85;
                    utterance.pitch = 0.95;
                } else {
                    utterance.rate = 0.9;
                    utterance.pitch = 1;
                }
            } else {
                // 如果没有找到语音，使用默认设置
                utterance.lang = 'zh-CN';
                utterance.rate = 0.9;
                utterance.pitch = 1;
            }
            
            utterance.volume = 1;
            
            let hasStarted = false;
            let hasEnded = false;
            
            utterance.onstart = function() {
                hasStarted = true;
                console.log(`发音开始: ${word}`);
            };
            
            utterance.onend = function() {
                hasEnded = true;
                console.log(`发音结束: ${word}`);
                // 播放下一个词汇
                setTimeout(() => {
                    playTestWords(words, voice, index + 1);
                }, 1500);
            };
            
            utterance.onerror = function(event) {
                console.error(`发音错误: ${word}`, event.error);
                
                // 如果语音没有开始或结束，尝试备用方案
                if (!hasStarted && !hasEnded) {
                    console.log('语音播放失败，尝试备用语音');
                    
                    // 如果当前语音失败，尝试使用普通话语音
                    if (voice && (voice.lang === 'zh-HK' || voice.lang === 'zh-yue')) {
                        console.log('粤语语音失败，尝试使用普通话语音');
                        const fallbackUtterance = new SpeechSynthesisUtterance(word);
                        fallbackUtterance.lang = 'zh-CN';
                        fallbackUtterance.volume = 1;
                        fallbackUtterance.rate = 0.9;
                        fallbackUtterance.pitch = 1;
                        
                        fallbackUtterance.onend = function() {
                            setTimeout(() => {
                                playTestWords(words, null, index + 1);
                            }, 1500);
                        };
                        
                        window.speechSynthesis.speak(fallbackUtterance);
                    } else {
                        // 继续播放下一个词汇
                        setTimeout(() => {
                            playTestWords(words, voice, index + 1);
                        }, 1500);
                    }
                }
            };
            
            // 设置超时检测，如果语音没有开始播放
            const timeoutId = setTimeout(() => {
                if (!hasStarted && !hasEnded) {
                    console.log(`语音播放超时: ${word}`);
                    window.speechSynthesis.cancel();
                    
                    // 尝试备用语音
                    if (voice && (voice.lang === 'zh-HK' || voice.lang === 'zh-yue')) {
                        console.log('粤语语音超时，尝试使用普通话语音');
                        const fallbackUtterance = new SpeechSynthesisUtterance(word);
                        fallbackUtterance.lang = 'zh-CN';
                        fallbackUtterance.volume = 1;
                        fallbackUtterance.rate = 0.9;
                        
                        fallbackUtterance.onend = function() {
                            clearTimeout(timeoutId);
                            setTimeout(() => {
                                playTestWords(words, null, index + 1);
                            }, 1500);
                        };
                        
                        window.speechSynthesis.speak(fallbackUtterance);
                    } else {
                        clearTimeout(timeoutId);
                        // 继续播放下一个词汇
                        setTimeout(() => {
                            playTestWords(words, voice, index + 1);
                        }, 1500);
                    }
                }
            }, 3000);
            
            // 播放语音
            console.log('开始播放语音...');
            window.speechSynthesis.speak(utterance);
            
        } catch (error) {
            console.error('播放测试词汇时出错:', error);
            // 继续播放下一个词汇
            setTimeout(() => {
                playTestWords(words, voice, index + 1);
            }, 2000);
        }
    }, 100);
}

// 显示分页数据
function displayPagedData(page = 1) {
    totalPages = Math.ceil(currentVocabularyList.length / 10);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    currentPage = page;
    
    const pagedData = Database.getPagedVocabulary(currentVocabularyList, currentPage, 10);
    generateVocabularyCards(pagedData);
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
    const container = document.getElementById('vocabulary-list');
    container.innerHTML = '<div style="text-align: center; padding: 50px;">搜索中...</div>';
    
    try {
        if (!dbInitialized) {
            await Database.initDatabase();
            dbInitialized = true;
        }
        
        if (keyword.trim() === '') {
            currentVocabularyList = await getAllVocabulary();
            isSearchMode = false;
            currentKeyword = '';
        } else {
            currentVocabularyList = await Database.searchVocabulary(keyword.trim());
            isSearchMode = true;
            currentKeyword = keyword.trim();
        }
        
        currentPage = 1;
        displayPagedData(currentPage);
    } catch (error) {
        console.error('搜索失败:', error);
        container.innerHTML = '<div style="text-align: center; padding: 50px; color: red;">搜索失败，请重试</div>';
    }
}

// 初始化页面
async function initPage() {
    document.getElementById('current-date').textContent = getCurrentDate();
    
    const container = document.getElementById('vocabulary-list');
    container.innerHTML = '<div style="text-align: center; padding: 50px;">加载中...</div>';
    
    try {
        if (!dbInitialized) {
            await Database.initDatabase();
            dbInitialized = true;
        }
        
        currentVocabularyList = await getAllVocabulary();
        displayPagedData(1);
    } catch (error) {
        console.error('初始化页面失败:', error);
        container.innerHTML = '<div style="text-align: center; padding: 50px; color: red;">加载失败，请刷新页面重试</div>';
    }
}

// 测试中文语音功能
function testChineseSpeech() {
    console.log('开始测试中文发音功能');
    
    // 确保语音引擎已加载
    ensureVoicesLoaded();
    
    const testWords = ["你好", "谢谢", "再见", "早上好", "晚上好"];
    let index = 0;
    
    // 等待语音引擎加载完成
    const waitForVoices = setInterval(() => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            clearInterval(waitForVoices);
            console.log('语音引擎已就绪，开始播放中文测试词汇');
            
            const speakNext = () => {
                if (index < testWords.length) {
                    const word = testWords[index];
                    console.log(`播放中文测试词汇 ${index + 1}/${testWords.length}: ${word}`);
                    playChinesePronunciation(word);
                    index++;
                    setTimeout(speakNext, 2000);
                } else {
                    console.log('中文测试完成');
                }
            };
            
            speakNext();
        }
    }, 500);
}

// 播放中文发音
function playChinesePronunciation(word) {
    console.log('播放中文发音请求:', word);
    
    // 检查浏览器支持
    if (!('speechSynthesis' in window)) {
        console.error('浏览器不支持语音合成');
        return;
    }
    
    try {
        // 确保语音引擎已加载
        ensureVoicesLoaded();
        
        // 创建新的语音合成对象
        const utterance = new SpeechSynthesisUtterance(word);
        
        // 设置基本参数
        utterance.volume = 1;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        // 设置语言 - 使用普通话
        utterance.lang = 'zh-CN';
        
        // 获取可用语音
        const voices = window.speechSynthesis.getVoices();
        console.log('当前可用语音数量:', voices.length);
        
        // 尝试找到中文语音
        const chineseVoice = voices.find(voice => 
            voice.lang === 'zh-CN' || 
            voice.lang === 'zh' || 
            voice.name.includes('Chinese') || 
            voice.name.includes('普通话') ||
            voice.name.includes('中文')
        );
        
        if (chineseVoice) {
            utterance.voice = chineseVoice;
            utterance.lang = chineseVoice.lang;
            console.log('使用中文语音:', chineseVoice.name, '(', chineseVoice.lang, ')');
        } else {
            // 如果没有中文语音，使用默认语音
            console.log('使用默认语音设置');
        }
        
        // 在speak之前设置事件监听器
        utterance.onstart = function(event) {
            console.log('中文发音开始:', word);
        };
        
        utterance.onend = function(event) {
            console.log('中文发音结束:', word);
        };
        
        utterance.onerror = function(event) {
            console.error('中文发音错误:', word, event.error);
        };
        
        // 播放语音
        window.speechSynthesis.speak(utterance);
        console.log('开始播放中文发音:', word);
        
    } catch (error) {
        console.error('播放中文发音时出错:', error);
    }
}

// 音频播放控制
let audioPlayer = null;
let isMusicPlaying = false;

// 播放背景音乐
function playBackgroundMusic() {
    console.log('播放背景音乐');
    
    try {
        // 如果已经有音频在播放，先停止
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
        
        // 创建新的音频对象
        audioPlayer = new Audio('mixkit-hip-hop-02-738.mp3');
        
        // 设置音频参数
        audioPlayer.volume = 0.5; // 50%音量，避免太大声
        audioPlayer.loop = true; // 循环播放
        
        // 设置事件监听器
        audioPlayer.onplay = function() {
            console.log('背景音乐开始播放');
            isMusicPlaying = true;
            updateMusicButton();
        };
        
        audioPlayer.onpause = function() {
            console.log('背景音乐已暂停');
            isMusicPlaying = false;
            updateMusicButton();
        };
        
        audioPlayer.onended = function() {
            console.log('背景音乐播放结束');
            isMusicPlaying = false;
            updateMusicButton();
        };
        
        audioPlayer.onerror = function(event) {
            console.error('背景音乐播放错误:', event);
            alert('无法播放背景音乐，请检查音频文件');
        };
        
        // 开始播放
        audioPlayer.play().catch(function(error) {
            console.error('播放背景音乐失败:', error);
            alert('播放背景音乐失败: ' + error.message);
        });
        
    } catch (error) {
        console.error('播放背景音乐时出错:', error);
        alert('播放背景音乐时出错: ' + error.message);
    }
}

// 停止背景音乐
function stopBackgroundMusic() {
    console.log('停止背景音乐');
    
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isMusicPlaying = false;
        updateMusicButton();
    }
}

// 更新音乐按钮状态
function updateMusicButton() {
    const musicBtn = document.getElementById('play-music-btn');
    if (isMusicPlaying) {
        musicBtn.textContent = '停止背景音乐';
        musicBtn.classList.add('music-playing');
    } else {
        musicBtn.textContent = '播放背景音乐';
        musicBtn.classList.remove('music-playing');
    }
}

// 绑定事件监听器
function bindEventListeners() {
    // 测试粤语发音按钮点击事件
    document.getElementById('test-speech-btn').addEventListener('click', function() {
        console.log('点击测试粤语发音按钮');
        
        // 直接开始测试，让语音引擎加载逻辑处理初始化
        //testCantoneseSpeech();
        speakCantonese();
    });
    
    // 测试中文发音按钮点击事件
    document.getElementById('test-chinese-speech-btn').addEventListener('click', function() {
        console.log('点击测试中文发音按钮');
        
        // 直接开始测试
        testChineseSpeech();
    });
    
    // 播放背景音乐按钮点击事件
    document.getElementById('play-music-btn').addEventListener('click', function() {
        if (isMusicPlaying) {
            stopBackgroundMusic();
        } else {
            playBackgroundMusic();
        }
    });
    
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
    
    // 清空数据库按钮点击事件
    document.getElementById('clear-db-btn').addEventListener('click', function() {
        if (confirm('确定要清空数据库并重新导入数据吗？')) {
            const container = document.getElementById('vocabulary-list');
            container.innerHTML = '<div style="text-align: center; padding: 50px;">正在清空数据库并重新导入数据...</div>';
            
            const request = indexedDB.deleteDatabase('YueLearningDB');
            
            request.onsuccess = function() {
                dbInitialized = false;
                currentPage = 1;
                totalPages = 1;
                currentVocabularyList = [];
                isSearchMode = false;
                currentKeyword = '';
                
                initPage().then(function() {
                    alert('数据库已成功清空并重新导入数据！');
                }).catch(function(error) {
                    console.error('重新初始化失败:', error);
                    alert('重新初始化失败，请刷新页面重试');
                });
            };
            
            request.onerror = function() {
                console.error('清空数据库失败');
                alert('清空数据库失败，请刷新页面重试');
            };
        }
    });
}

// 页面加载完成后初始化
window.onload = function() {
    // 调用原有的onload逻辑
    initPage();
    bindEventListeners();
    
    // 预加载语音引擎
    ensureVoicesLoaded();
    
    // 再次尝试获取语音，确保语音列表加载
    setTimeout(() => {
        window.speechSynthesis.getVoices();
        console.log('页面加载完成，已尝试加载语音引擎');
    }, 1000);
};
