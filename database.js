// 数据库管理模块

const DB_NAME = 'YueLearningDB';
const DB_VERSION = 1;
const STORE_NAME = 'vocabulary';

// 打开数据库
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = (event) => {
            console.error('数据库打开失败:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // 创建词汇存储
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('word', 'word', { unique: false });
                store.createIndex('pronunciation', 'pronunciation', { unique: false });
            }
        };
    });
}

// 初始化数据库
async function initDatabase() {
    try {
        const db = await openDB();
        
        // 检查数据库是否已有数据
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const countRequest = store.count();
        
        return new Promise((resolve, reject) => {
            countRequest.onsuccess = () => {
                if (countRequest.result === 0) {
                    // 数据库为空，需要导入数据
                    console.log('数据库为空，开始导入数据...');
                    importVocabularyData(db).then(() => {
                        resolve(db);
                    }).catch(error => {
                        reject(error);
                    });
                } else {
                    // 数据库已有数据
                    console.log(`数据库已有 ${countRequest.result} 条数据`);
                    resolve(db);
                }
            };
            
            countRequest.onerror = (event) => {
                console.error('获取数据计数失败:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('初始化数据库失败:', error);
        throw error;
    }
}

// 导入词汇数据
function importVocabularyData(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // 检查vocabularyData是否可用
        if (typeof vocabularyData === 'undefined') {
            reject(new Error('词汇数据未加载'));
            return;
        }
        
        let count = 0;
        const total = vocabularyData.length;
        
        vocabularyData.forEach((item, index) => {
            const request = store.add({
                word: item.word,
                pronunciation: item.pronunciation,
                explanation: item.explanation,
                example: item.example
            });
            
            request.onsuccess = () => {
                count++;
                if (count % 100 === 0) {
                    console.log(`已导入 ${count}/${total} 条数据`);
                }
                if (count === total) {
                    resolve();
                }
            };
            
            request.onerror = (event) => {
                console.error(`导入数据失败 (${index}):`, event.target.error);
                reject(event.target.error);
            };
        });
        
        transaction.onerror = (event) => {
            console.error('事务失败:', event.target.error);
            reject(event.target.error);
        };
    });
}

// 获取所有词汇
function getAllVocabulary() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = (event) => {
                console.error('获取词汇失败:', event.target.error);
                reject(event.target.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

// 获取随机词汇
function getRandomVocabulary(limit = 10) {
    return new Promise(async (resolve, reject) => {
        try {
            const allVocabulary = await getAllVocabulary();
            
            // 随机排序
            const shuffled = [...allVocabulary].sort(() => 0.5 - Math.random());
            
            // 返回指定数量
            resolve(shuffled.slice(0, limit));
        } catch (error) {
            console.error('获取随机词汇失败:', error);
            reject(error);
        }
    });
}

// 根据关键词搜索词汇
function searchVocabulary(keyword) {
    return new Promise(async (resolve, reject) => {
        try {
            const allVocabulary = await getAllVocabulary();
            
            // 过滤包含关键词的词汇
            const filtered = allVocabulary.filter(item => {
                return item.word.includes(keyword) || 
                       item.explanation.includes(keyword) || 
                       item.example.includes(keyword);
            });
            
            resolve(filtered);
        } catch (error) {
            console.error('搜索词汇失败:', error);
            reject(error);
        }
    });
}

// 分页获取词汇
function getPagedVocabulary(vocabularyList, page = 1, pageSize = 10) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return vocabularyList.slice(startIndex, endIndex);
}

// 导出数据库操作函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDatabase,
        getAllVocabulary,
        getRandomVocabulary,
        searchVocabulary,
        getPagedVocabulary
    };
} else {
    window.Database = {
        initDatabase,
        getAllVocabulary,
        getRandomVocabulary,
        searchVocabulary,
        getPagedVocabulary
    };
}
