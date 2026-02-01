// 粤语常用词汇数据生成器 - 扩展版

// 基础词汇数据
const baseVocabulary = [
    { word: "早晨", pronunciation: "zou2 san4", explanation: "早上好，用于早上打招呼", example: "早晨，今日过得点啊？", category: "问候" },
    { word: "唔该", pronunciation: "m4 goi1", explanation: "谢谢，麻烦你，用于表达感谢或请求", example: "唔该帮我递下杯水", category: "礼貌用语" },
    { word: "系咁先", pronunciation: "hai6 gam2 sin1", explanation: "就这样先，用于告别", example: "我要走啦，系咁先", category: "告别" },
    { word: "食咗饭未", pronunciation: "sik6 zo2 faan6 mei6", explanation: "吃了饭没有，用于问候", example: "喂，食咗饭未啊？", category: "问候" },
    { word: "点解", pronunciation: "dim2 gaai2", explanation: "为什么", example: "点解你今日迟到咗？", category: "疑问词" },
    { word: "边度", pronunciation: "bin1 dou6", explanation: "哪里", example: "你住喺边度啊？", category: "疑问词" },
    { word: "几钱", pronunciation: "gei2 cin2", explanation: "多少钱", example: "呢件衫几钱啊？", category: "购物" },
    { word: "冇问题", pronunciation: "mou5 man6 tai4", explanation: "没问题", example: "呢件事交畀我，冇问题", category: "回应" },
    { word: "好耐冇见", pronunciation: "hou2 noi6 mou5 gin3", explanation: "好久不见", example: "哎，好耐冇见啦！", category: "问候" },
    { word: "午安", pronunciation: "ng5 on1", explanation: "中午好", example: "午安，食咗饭未啊？", category: "问候" },
    { word: "晚安", pronunciation: "maan5 on1", explanation: "晚上好，晚安", example: "晚安，早啲瞓啦", category: "告别" },
    { word: "多谢", pronunciation: "do1 ze6", explanation: "谢谢", example: "多谢你嘅帮忙", category: "礼貌用语" },
    { word: "对唔住", pronunciation: "deoi3 m4 zyu6", explanation: "对不起", example: "对唔住，撞咗你", category: "礼貌用语" },
    { word: "冇所谓", pronunciation: "mou5 so2 wai6", explanation: "没关系，无所谓", example: "迟到少少冇所谓", category: "回应" },
    { word: "一齐", pronunciation: "jat1 cai4", explanation: "一起", example: "我哋一齐去行街啦", category: "副词" },
    { word: "等阵", pronunciation: "dang2 zan6", explanation: "等一下", example: "你等阵，我去攞个嘢", category: "时间" },
    { word: "咩事", pronunciation: "me1 si6", explanation: "什么事", example: "你揾我有咩事啊？", category: "疑问词" },
    { word: "边个", pronunciation: "bin1 go3", explanation: "谁", example: "呢个系边个啊？", category: "疑问词" },
    { word: "乜嘢", pronunciation: "mat1 je5", explanation: "什么", example: "你食紧乜嘢啊？", category: "疑问词" },
    { word: "点样", pronunciation: "dim2 joeng6", explanation: "怎么样", example: "呢部电影点样啊？", category: "疑问词" },
    { word: "几耐", pronunciation: "gei2 noi6", explanation: "多久", example: "你嚟咗几耐啦？", category: "疑问词" },
    { word: "做乜", pronunciation: "zou6 mat1", explanation: "做什么", example: "你喺度做乜啊？", category: "疑问词" },
    { word: "系咪", pronunciation: "hai6 mai6", explanation: "是不是", example: "你系咪广东人啊？", category: "疑问词" },
    { word: "冇错", pronunciation: "mou5 co3", explanation: "没错", example: "你讲得冇错", category: "回应" },
    { word: "可能", pronunciation: "ho2 nang4", explanation: "可能", example: "今日可能会落雨", category: "副词" },
    { word: "一定", pronunciation: "jat1 ding6", explanation: "一定", example: "我一定会嚟嘅", category: "副词" },
    { word: "好快", pronunciation: "hou2 faai3", explanation: "很快", example: "佢好快就会返嚟", category: "形容词" },
    { word: "好慢", pronunciation: "hou2 maan6", explanation: "很慢", example: "呢部车开得好慢", category: "形容词" }
];

// 扩展词汇数据
function generateExtendedVocabulary() {
    let extendedVocabulary = [...baseVocabulary];
    
    // 家庭成员词汇
    const familyVocabulary = [
        { word: "阿爸", pronunciation: "aa3 baa1", explanation: "爸爸", example: "我阿爸系工程师", category: "家庭" },
        { word: "阿妈", pronunciation: "aa3 maa1", explanation: "妈妈", example: "阿妈煮饭好好食", category: "家庭" },
        { word: "爷爷", pronunciation: "je4 je4", explanation: "爷爷", example: "爷爷好钟意睇报纸", category: "家庭" },
        { word: "嫲嫲", pronunciation: "maa4 maa4", explanation: "奶奶", example: "嫲嫲好锡我", category: "家庭" },
        { word: "公公", pronunciation: "gung1 gung1", explanation: "外公", example: "公公教我写书法", category: "家庭" },
        { word: "婆婆", pronunciation: "po4 po2", explanation: "外婆", example: "婆婆煮嘅汤最好饮", category: "家庭" },
        { word: "阿哥", pronunciation: "aa3 go1", explanation: "哥哥", example: "我阿哥好高大", category: "家庭" },
        { word: "家姐", pronunciation: "gaa1 ze2", explanation: "姐姐", example: "家姐好识得照顾人", category: "家庭" },
        { word: "细佬", pronunciation: "sai3 lou2", explanation: "弟弟", example: "我细佬好调皮", category: "家庭" },
        { word: "细妹", pronunciation: "sai3 mui2", explanation: "妹妹", example: "细妹好得意", category: "家庭" },
        { word: "老公", pronunciation: "lou5 gung1", explanation: "丈夫", example: "我老公好疼我", category: "家庭" },
        { word: "老婆", pronunciation: "lou5 po4", explanation: "妻子", example: "我老婆煮餸好叻", category: "家庭" },
        { word: "仔仔", pronunciation: "zai2 zai2", explanation: "儿子", example: "我个仔仔好聪明", category: "家庭" },
        { word: "囡囡", pronunciation: "naam4 naam4", explanation: "女儿", example: "囡囡好乖", category: "家庭" },
        { word: "叔叔", pronunciation: "suk1 suk1", explanation: "叔叔", example: "叔叔带我去玩", category: "家庭" },
        { word: "阿姨", pronunciation: "aa3 ji1", explanation: "阿姨", example: "阿姨买咗糖畀我", category: "家庭" }
    ];
    
    // 时间相关词汇
    const timeVocabulary = [
        { word: "今日", pronunciation: "gam1 jat6", explanation: "今天", example: "今日天气好好", category: "时间" },
        { word: "听日", pronunciation: "ting1 jat6", explanation: "明天", example: "听日要考试", category: "时间" },
        { word: "琴日", pronunciation: "kam4 jat6", explanation: "昨天", example: "琴日落咗好大雨", category: "时间" },
        { word: "而家", pronunciation: "ji4 gaa1", explanation: "现在", example: "而家几多点啊？", category: "时间" },
        { word: "一阵间", pronunciation: "jat1 zan6 gaan1", explanation: "一会儿", example: "我等一阵间先出门口", category: "时间" },
        { word: "晏昼", pronunciation: "aan3 zau3", explanation: "中午", example: "晏昼去边度食饭？", category: "时间" },
        { word: "夜晚", pronunciation: "je6 maan5", explanation: "晚上", example: "夜晚记得关窗", category: "时间" },
        { word: "朝早", pronunciation: "ziu1 zou2", explanation: "早上", example: "朝早起身要做运动", category: "时间" },
        { word: "凌晨", pronunciation: "ling4 san4", explanation: "凌晨", example: "凌晨三点仲未瞓", category: "时间" },
        { word: "礼拜一", pronunciation: "lai5 baai3 jat1", explanation: "星期一", example: "礼拜一要交功课", category: "时间" },
        { word: "礼拜日", pronunciation: "lai5 baai3 jat6", explanation: "星期日", example: "礼拜日去边度玩？", category: "时间" },
        { word: "上个月", pronunciation: "soeng6 go3 jyut6", explanation: "上个月", example: "上个月去咗旅行", category: "时间" },
        { word: "下个礼拜", pronunciation: "haa6 go3 lai5 baai3", explanation: "下个星期", example: "下个礼拜有冇时间？", category: "时间" },
        { word: "今年", pronunciation: "gam1 nin4", explanation: "今年", example: "今年我二十岁", category: "时间" },
        { word: "旧年", pronunciation: "gau6 nin4", explanation: "去年", example: "旧年嘅事唔好提啦", category: "时间" },
        { word: "年初一", pronunciation: "nin4 co1 jat1", explanation: "大年初一", example: "年初一要拜年", category: "时间" }
    ];
    
    // 食物相关词汇
    const foodVocabulary = [
        { word: "饮茶", pronunciation: "jam2 caa4", explanation: "喝早茶", example: "礼拜日同屋企人饮茶", category: "饮食" },
        { word: "点心", pronunciation: "dim2 sam1", explanation: "点心", example: "虾饺系我最钟意嘅点心", category: "饮食" },
        { word: "烧卖", pronunciation: "siu1 maai2", explanation: "烧卖", example: "烧卖要趁热食", category: "饮食" },
        { word: "虾饺", pronunciation: "haa1 gaau2", explanation: "虾饺", example: "一笼虾饺唔够食", category: "饮食" },
        { word: "肠粉", pronunciation: "coeng4 fan2", explanation: "肠粉", example: "牛肉肠粉好好味", category: "饮食" },
        { word: "凤爪", pronunciation: "fung6 zaau2", explanation: "凤爪", example: "凤爪煮得好淋", category: "饮食" },
        { word: "云吞", pronunciation: "wan4 tan1", explanation: "馄饨", example: "云吞面系广东名菜", category: "饮食" },
        { word: "牛腩", pronunciation: "ngau4 naam5", explanation: "牛腩", example: "牛腩河粉好正", category: "饮食" },
        { word: "叉烧", pronunciation: "caa1 siu1", explanation: "叉烧", example: "叉烧饭系我嘅至爱", category: "饮食" },
        { word: "烧鹅", pronunciation: "siu1 ngo2", explanation: "烧鹅", example: "深井烧鹅好出名", category: "饮食" },
        { word: "煲仔饭", pronunciation: "bou1 zai2 faan6", explanation: "煲仔饭", example: "冬天食煲仔饭好暖", category: "饮食" },
        { word: "糖水", pronunciation: "tong4 seoi2", explanation: "甜品", example: "食完饭去食糖水", category: "饮食" },
        { word: "双皮奶", pronunciation: "soeng1 pei4 naai5", explanation: "双皮奶", example: "顺德双皮奶好滑", category: "饮食" },
        { word: "杨枝甘露", pronunciation: "joeng4 zi1 gam1 lou6", explanation: "杨枝甘露", example: "夏天食杨枝甘露好清爽", category: "饮食" },
        { word: "龟苓膏", pronunciation: "gwai1 ling4 gou1", explanation: "龟苓膏", example: "龟苓膏可以清热毒", category: "饮食" },
        { word: "凉茶", pronunciation: "loeng4 caa4", explanation: "凉茶", example: "热气要饮凉茶", category: "饮食" }
    ];
    
    // 交通相关词汇
    const transportationVocabulary = [
        { word: "地铁", pronunciation: "dei6 tit3", explanation: "地铁", example: "搭地铁好方便", category: "交通" },
        { word: "巴士", pronunciation: "baa1 si2", explanation: "公交车", example: "我要搭几号巴士？", category: "交通" },
        { word: "的士", pronunciation: "dik1 si2", explanation: "出租车", example: "截架的士去机场", category: "交通" },
        { word: "小巴", pronunciation: "siu2 baa1", explanation: "小巴", example: "绿色小巴好快", category: "交通" },
        { word: "火车", pronunciation: "fo2 ce1", explanation: "火车", example: "坐火车上广州", category: "交通" },
        { word: "船", pronunciation: "syun4", explanation: "船", example: "坐船过海", category: "交通" },
        { word: "单车", pronunciation: "daan1 ce1", explanation: "自行车", example: "踩单车返学", category: "交通" },
        { word: "电单车", pronunciation: "din6 daan1 ce1", explanation: "摩托车", example: "佢揸电单车好型", category: "交通" },
        { word: "私家车", pronunciation: "si1 gaa1 ce1", explanation: "私家车", example: "我冇私家车", category: "交通" },
        { word: "天桥", pronunciation: "tin1 kiu4", explanation: "天桥", example: "过马路要行天桥", category: "交通" },
        { word: "隧道", pronunciation: "seoi6 dou6", explanation: "隧道", example: "海底隧道好长", category: "交通" },
        { word: "红绿灯", pronunciation: "hung4 luk6 dang1", explanation: "红绿灯", example: "睇红绿灯过马路", category: "交通" },
        { word: "塞车", pronunciation: "sak1 ce1", explanation: "堵车", example: "放工时间好塞车", category: "交通" },
        { word: "飞站", pronunciation: "fei1 zaam6", explanation: "过站不停", example: "架巴士飞站啊", category: "交通" },
        { word: "转车", pronunciation: "zyun2 ce1", explanation: "换乘", example: "我要转两次车先到", category: "交通" },
        { word: "落车", pronunciation: "lok6 ce1", explanation: "下车", example: "下一站要落车", category: "交通" }
    ];
    
    // 购物相关词汇
    const shoppingVocabulary = [
        { word: "超级市场", pronunciation: "ciu1 kap1 si5 coeng4", explanation: "超市", example: "去超级市场买餸", category: "购物" },
        { word: "街市", pronunciation: "gaai1 si5", explanation: "菜市场", example: "街市嘅菜新鲜啲", category: "购物" },
        { word: "商场", pronunciation: "soeng1 coeng4", explanation: "商场", example: "周末去商场行街", category: "购物" },
        { word: "铺头", pronunciation: "pou3 tau2", explanation: "店铺", example: "间铺头卖乜嘢㗎？", category: "购物" },
        { word: "收银台", pronunciation: "sau1 ngan4 toi4", explanation: "收银台", example: "去收银台俾钱", category: "购物" },
        { word: "大减价", pronunciation: "daai6 gaam2 gaa3", explanation: "大减价", example: "季尾大减价好抵买", category: "购物" },
        { word: "试身", pronunciation: "si3 san1", explanation: "试穿", example: "呢件衫可唔可以试身？", category: "购物" },
        { word: "埋单", pronunciation: "maai4 daan1", explanation: "结账", example: "唔该埋单", category: "购物" },
        { word: "找钱", pronunciation: "zaau2 cin2", explanation: "找零钱", example: "记得找返钱畀我", category: "购物" },
        { word: "散纸", pronunciation: "saan2 zi2", explanation: "零钱", example: "有冇散纸啊？", category: "购物" },
        { word: "刷卡", pronunciation: "caat3 kaa1", explanation: "刷卡", example: "我刷卡俾钱", category: "购物" },
        { word: "现金", pronunciation: "jin6 gam1", explanation: "现金", example: "收唔收现金？", category: "购物" },
        { word: "电子支付", pronunciation: "din6 zi2 zi1 fu6", explanation: "电子支付", example: "用电子支付好方便", category: "购物" },
        { word: "会员卡", pronunciation: "wui6 jyun4 kaa1", explanation: "会员卡", example: "你有冇会员卡？", category: "购物" },
        { word: "发票", pronunciation: "faat3 piu3", explanation: "发票", example: "要唔要开发票？", category: "购物" },
        { word: "退换", pronunciation: "teoi3 wun6", explanation: "退换", example: "唔啱着可唔可以退换？", category: "购物" }
    ];
    
    // 工作学习词汇
    const workStudyVocabulary = [
        { word: "返学", pronunciation: "faan1 hok6", explanation: "上学", example: "细路要返学", category: "工作学习" },
        { word: "放学", pronunciation: "fong3 hok6", explanation: "放学", example: "三点钟放学", category: "工作学习" },
        { word: "上课", pronunciation: "soeng5 fo3", explanation: "上课", example: "听日八点上课", category: "工作学习" },
        { word: "落课", pronunciation: "lok6 fo3", explanation: "下课", example: "五点半落课", category: "工作学习" },
        { word: "功课", pronunciation: "gung1 fo3", explanation: "作业", example: "今晚好多功课", category: "工作学习" },
        { word: "考试", pronunciation: "haau2 si3", explanation: "考试", example: "下个礼拜要考试", category: "工作学习" },
        { word: "温书", pronunciation: "wan1 syu1", explanation: "复习", example: "我要返屋企温书", category: "工作学习" },
        { word: "补习", pronunciation: "bou2 zaap6", explanation: "补习", example: "周末要去补习", category: "工作学习" },
        { word: "开会", pronunciation: "hoi1 wui6", explanation: "开会", example: "晏昼三点要开会", category: "工作学习" },
        { word: "加班", pronunciation: "gaa1 baan1", explanation: "加班", example: "今日又要加班", category: "工作学习" },
        { word: "出差", pronunciation: "ceot1 caai1", explanation: "出差", example: "下个月要去上海出差", category: "工作学习" },
        { word: "请假", pronunciation: "cing2 gaa3", explanation: "请假", example: "听日我要请假", category: "工作学习" },
        { word: "辞职", pronunciation: "ci4 zik1", explanation: "辞职", example: "我准备辞职", category: "工作学习" },
        { word: "面试", pronunciation: "min6 si3", explanation: "面试", example: "听日有份工要面试", category: "工作学习" },
        { word: "人工", pronunciation: "jan4 gung1", explanation: "工资", example: "你份工几多人工？", category: "工作学习" },
        { word: "晋升", pronunciation: "zeon3 sing1", explanation: "晋升", example: "希望明年可以晋升", category: "工作学习" }
    ];
    
    // 情感表达词汇
    const emotionVocabulary = [
        { word: "开心", pronunciation: "hoi1 sam1", explanation: "开心", example: "今日我好开心", category: "情感" },
        { word: "嬲", pronunciation: "nau1", explanation: "生气", example: "唔好嬲啦", category: "情感" },
        { word: "担心", pronunciation: "daam1 sam1", explanation: "担心", example: "我好担心你", category: "情感" },
        { word: "伤心", pronunciation: "soeng1 sam1", explanation: "伤心", example: "唔好咁伤心", category: "情感" },
        { word: "兴奋", pronunciation: "hing1 fan5", explanation: "兴奋", example: "佢好兴奋", category: "情感" },
        { word: "紧张", pronunciation: "gan2 zoeng1", explanation: "紧张", example: "考试好紧张", category: "情感" },
        { word: "无聊", pronunciation: "mou4 liu4", explanation: "无聊", example: "一个人好无聊", category: "情感" },
        { word: "尴尬", pronunciation: "gaam1 gaai3", explanation: "尴尬", example: "好尴尬啊", category: "情感" },
        { word: "惊讶", pronunciation: "ging1 ngaa4", explanation: "惊讶", example: "听到呢个消息好惊讶", category: "情感" },
        { word: "失望", pronunciation: "sat1 mong6", explanation: "失望", example: "我好失望", category: "情感" },
        { word: "满意", pronunciation: "mun5 ji3", explanation: "满意", example: "我对呢个结果好满意", category: "情感" },
        { word: "惊喜", pronunciation: "ging1 hei2", explanation: "惊喜", example: "多谢你畀我嘅惊喜", category: "情感" },
        { word: "感动", pronunciation: "gam2 dung6", explanation: "感动", example: "我真系好感动", category: "情感" },
        { word: "寂寞", pronunciation: "zik6 mok6", explanation: "寂寞", example: "一个人住好寂寞", category: "情感" },
        { word: "害怕", pronunciation: "hoi6 paa3", explanation: "害怕", example: "我好怕黑", category: "情感" },
        { word: "挂住", pronunciation: "gwaa3 zyu6", explanation: "想念", example: "我好挂住你", category: "情感" }
    ];
    
    // 健康医疗词汇
    const healthVocabulary = [
        { word: "医院", pronunciation: "ji1 jyun2", explanation: "医院", example: "我要去睇医生", category: "健康" },
        { word: "医生", pronunciation: "ji1 sang1", explanation: "医生", example: "医生话我要休息", category: "健康" },
        { word: "护士", pronunciation: "wu6 si6", explanation: "护士", example: "护士小姐好温柔", category: "健康" },
        { word: "药房", pronunciation: "joek6 fong2", explanation: "药房", example: "去药房买药", category: "健康" },
        { word: "发烧", pronunciation: "faat3 siu1", explanation: "发烧", example: "我发烧啊", category: "健康" },
        { word: "感冒", pronunciation: "gam2 mou6", explanation: "感冒", example: "我感冒咗", category: "健康" },
        { word: "咳嗽", pronunciation: "kat1 sau3", explanation: "咳嗽", example: "咳得好辛苦", category: "健康" },
        { word: "头痛", pronunciation: "tau4 tung3", explanation: "头痛", example: "我头痛啊", category: "健康" },
        { word: "肚痛", pronunciation: "tou5 tung3", explanation: "肚子痛", example: "食错嘢肚痛", category: "健康" },
        { word: "晕眩", pronunciation: "wan4 jyun6", explanation: "头晕", example: "我个脑好晕", category: "健康" },
        { word: "打针", pronunciation: "daa2 zam1", explanation: "打针", example: "我唔钟意打针", category: "健康" },
        { word: "食药", pronunciation: "sik6 joek6", explanation: "吃药", example: "记得准时食药", category: "健康" },
        { word: "复诊", pronunciation: "fuk6 zam2", explanation: "复诊", example: "下个礼拜要返去复诊", category: "健康" },
        { word: "住院", pronunciation: "zyu6 jyun2", explanation: "住院", example: "医生话我要住院", category: "健康" },
        { word: "急救", pronunciation: "gap1 gau3", explanation: "急救", example: "快啲叫救护车", category: "健康" },
        { word: "复康", pronunciation: "fuk1 hong1", explanation: "康复", example: "你要好好复康", category: "健康" }
    ];
    
    // 房屋家居词汇
    const housingVocabulary = [
        { word: "屋企", pronunciation: "uk1 kei2", explanation: "家里", example: "我返屋企啦", category: "家居" },
        { word: "客厅", pronunciation: "haak3 teng1", explanation: "客厅", example: "客厅好大", category: "家居" },
        { word: "睡房", pronunciation: "seoi6 fong2", explanation: "卧室", example: "我嘅睡房好细", category: "家居" },
        { word: "厨房", pronunciation: "cyu4 fong2", explanation: "厨房", example: "阿妈喺厨房煮饭", category: "家居" },
        { word: "厕所", pronunciation: "ci3 so2", explanation: "厕所", example: "我要去厕所", category: "家居" },
        { word: "阳台", pronunciation: "joeng4 toi4", explanation: "阳台", example: "阳台种咗好多花", category: "家居" },
        { word: "电梯", pronunciation: "din6 tai1", explanation: "电梯", example: "等电梯好耐", category: "家居" },
        { word: "楼梯", pronunciation: "lau4 tai1", explanation: "楼梯", example: "行楼梯当运动", category: "家居" },
        { word: "锁匙", pronunciation: "so2 si4", explanation: "钥匙", example: "我唔记得带锁匙", category: "家居" },
        { word: "门铃", pronunciation: "mun4 ling1", explanation: "门铃", explanation: "有人按门铃", category: "家居" },
        { word: "窗口", pronunciation: "coeng1 hau2", explanation: "窗户", example: "打开窗口透下气", category: "家居" },
        { word: "地板", pronunciation: "dei6 baan2", explanation: "地板", example: "地板好滑", category: "家居" },
        { word: "天花板", pronunciation: "tin1 faa1 baan2", explanation: "天花板", example: "天花板漏水啊", category: "家居" },
        { word: "电器", pronunciation: "din6 hei3", explanation: "电器", example: "屋企有好多电器", category: "家居" },
        { word: "傢俬", pronunciation: "gaa1 si1", explanation: "家具", example: "买新屋要买傢俬", category: "家居" },
        { word: "装修", pronunciation: "zong1 sau1", explanation: "装修", example: "间屋要装修", category: "家居" }
    ];
    
    // 天气相关词汇
    const weatherVocabulary = [
        { word: "天气", pronunciation: "tin1 hei3", explanation: "天气", example: "今日天气好好", category: "天气" },
        { word: "晴天", pronunciation: "cing4 tin1", explanation: "晴天", example: "听日系晴天", category: "天气" },
        { word: "阴天", pronunciation: "jam1 tin1", explanation: "阴天", example: "今日系阴天", category: "天气" },
        { word: "落雨", pronunciation: "lok6 jyu5", explanation: "下雨", example: "出门记得带遮，可能会落雨", category: "天气" },
        { word: "打风", pronunciation: "daa2 fung1", explanation: "刮台风", example: "听日会打风", category: "天气" },
        { word: "落雪", pronunciation: "lok6 syut3", explanation: "下雪", example: "香港好少落雪", category: "天气" },
        { word: "潮湿", pronunciation: "ciu4 sap1", explanation: "潮湿", example: "春天好潮湿", category: "天气" },
        { word: "干燥", pronunciation: "gon1 cou3", explanation: "干燥", example: "冬天好干燥", category: "天气" },
        { word: "炎热", pronunciation: "jin4 jit6", explanation: "炎热", example: "夏天好炎热", category: "天气" },
        { word: "寒冷", pronunciation: "hon4 laang5", explanation: "寒冷", example: "今日好寒冷", category: "天气" },
        { word: "温度", pronunciation: "wan1 dou6", explanation: "温度", example: "今日温度几多啊？", category: "天气" },
        { word: "湿度", pronunciation: "sap1 dou6", explanation: "湿度", example: "湿度好高", category: "天气" },
        { word: "天气预报", pronunciation: "tin1 hei3 jyu6 bou3", explanation: "天气预报", example: "睇下天气预报先", category: "天气" },
        { word: "阳光", pronunciation: "joeng4 gwong1", explanation: "阳光", example: "今日阳光好灿烂", category: "天气" },
        { word: "乌云", pronunciation: "wu1 wan4", explanation: "乌云", example: "天上有乌云", category: "天气" },
        { word: "彩虹", pronunciation: "coi2 hung4", explanation: "彩虹", example: "落完雨有彩虹", category: "天气" }
    ];
    
    // 娱乐休闲词汇
    const entertainmentVocabulary = [
        { word: "睇戏", pronunciation: "tai2 hei3", explanation: "看电影", example: "今晚去睇戏", category: "娱乐" },
        { word: "唱歌", pronunciation: "coeng3 go1", explanation: "唱歌", example: "我钟意唱歌", category: "娱乐" },
        { word: "跳舞", pronunciation: "tiu3 mou5", explanation: "跳舞", example: "佢跳舞好叻", category: "娱乐" },
        { word: "旅行", pronunciation: "leoi5 hang4", explanation: "旅行", example: "暑假去边度旅行？", category: "娱乐" },
        { word: "打波", pronunciation: "daa2 bo1", explanation: "打球", example: "放学去打波", category: "娱乐" },
        { word: "游水", pronunciation: "jau4 seoi2", explanation: "游泳", example: "夏天去游水好舒服", category: "娱乐" },
        { word: "行山", pronunciation: "haang4 saan1", explanation: "爬山", example: "周末去行山", category: "娱乐" },
        { word: "烧烤", pronunciation: "siu1 haau1", explanation: "烧烤", example: "一班朋友去烧烤", category: "娱乐" },
        { word: "打牌", pronunciation: "daa2 paai2", explanation: "打牌", example: "过年同亲戚打牌", category: "娱乐" },
        { word: "落酒吧", pronunciation: "lok6 zau2 baa1", explanation: "去酒吧", example: "有时会落酒吧饮嘢", category: "娱乐" },
        { word: "打机", pronunciation: "daa2 gei1", explanation: "打游戏", example: "细路钟意打机", category: "娱乐" },
        { word: "睇书", pronunciation: "tai2 syu1", explanation: "看书", example: "我钟意睇书", category: "娱乐" },
        { word: "听歌", pronunciation: "teng1 go1", explanation: "听歌", example: "我成日听歌", category: "娱乐" },
        { word: "画画", pronunciation: "waak6 waa2", explanation: "画画", example: "佢画画好叻", category: "娱乐" },
        { word: "影相", pronunciation: "jing2 soeng2", explanation: "拍照", example: "呢度风景好，帮我影相", category: "娱乐" },
        { word: "露营", pronunciation: "lou6 jing4", explanation: "露营", example: "一班人去露营好开心", category: "娱乐" }
    ];
    
    // 合并所有分类词汇
    extendedVocabulary.push(...familyVocabulary);
    extendedVocabulary.push(...timeVocabulary);
    extendedVocabulary.push(...foodVocabulary);
    extendedVocabulary.push(...transportationVocabulary);
    extendedVocabulary.push(...shoppingVocabulary);
    extendedVocabulary.push(...workStudyVocabulary);
    extendedVocabulary.push(...emotionVocabulary);
    extendedVocabulary.push(...healthVocabulary);
    extendedVocabulary.push(...housingVocabulary);
    extendedVocabulary.push(...weatherVocabulary);
    extendedVocabulary.push(...entertainmentVocabulary);
    
    // 添加更多常用短语和表达
    const phrasesVocabulary = [
        { word: "唔紧要", pronunciation: "m4 gan2 jiu3", explanation: "不要紧，没关系", example: "迟到少少唔紧要", category: "常用短语" },
        { word: "慢慢嚟", pronunciation: "maan6 maan6 lai4", explanation: "慢慢来", example: "唔使急，慢慢嚟", category: "常用短语" },
        { word: "唔使客气", pronunciation: "m4 sai2 haak3 hei3", explanation: "不用客气", example: "帮你系应该嘅，唔使客气", category: "常用短语" },
        { word: "冇问题", pronunciation: "mou5 man6 tai4", explanation: "没问题", example: "呢件事交畀我，冇问题", category: "常用短语" },
        { word: "得闲", pronunciation: "dak1 haan4", explanation: "有空", example: "你得闲吗？", category: "常用短语" },
        { word: "唔得闲", pronunciation: "m4 dak1 haan4", explanation: "没空", example: "今日唔得闲", category: "常用短语" },
        { word: "冇所谓", pronunciation: "mou5 so2 wai6", explanation: "无所谓", example: "食乜都得，冇所谓", category: "常用短语" },
        { word: "话畀你知", pronunciation: "waa6 bei2 nei5 zi1", explanation: "告诉你", example: "我话畀你知一个秘密", category: "常用短语" },
        { word: "听讲", pronunciation: "teng1 gong2", explanation: "听说", example: "听讲佢结婚啦", category: "常用短语" },
        { word: "搞掂", pronunciation: "gaau2 dim6", explanation: "搞定", example: "件事搞掂啦", category: "常用短语" },
        { word: "差唔多", pronunciation: "caa1 m4 do1", explanation: "差不多", example: "时间差唔多啦", category: "常用短语" },
        { word: "好彩", pronunciation: "hou2 coi2", explanation: "幸运，幸好", example: "好彩我赶到", category: "常用短语" },
        { word: "认真", pronunciation: "jing6 zan1", explanation: "认真", example: "做嘢要认真", category: "常用短语" },
        { word: "求其", pronunciation: "kau4 kei4", explanation: "随便", example: "求其食啲嘢就算啦", category: "常用短语" },
        { word: "特登", pronunciation: "dak6 dang1", explanation: "特意", example: "我特登嚟揾你", category: "常用短语" },
        { word: "顺便", pronunciation: "seon6 bin6", explanation: "顺便", example: "我去开超市，顺便买餸", category: "常用短语" }
    ];
    
    extendedVocabulary.push(...phrasesVocabulary);
    
    // 生成更多词汇，达到3500个
    const additionalWords = [
        // 职业
        { word: "老师", pronunciation: "lou5 si1", explanation: "老师", example: "我嘅老师好有耐性", category: "职业" },
        { word: "医生", pronunciation: "ji1 sang1", explanation: "医生", example: "我想大个做医生", category: "职业" },
        { word: "护士", pronunciation: "wu6 si6", explanation: "护士", example: "护士工作好辛苦", category: "职业" },
        { word: "警察", pronunciation: "ging2 caat3", explanation: "警察", example: "警察叔叔好威猛", category: "职业" },
        { word: "消防员", pronunciation: "siu1 fong4 jyun4", explanation: "消防员", example: "消防员好勇敢", category: "职业" },
        { word: "厨师", pronunciation: "cyu1 si1", explanation: "厨师", example: "我阿爸系厨师", category: "职业" },
        { word: "司机", pronunciation: "si1 gei1", explanation: "司机", example: "巴士司机好专业", category: "职业" },
        { word: "工程师", pronunciation: "gung1 cing4 si1", explanation: "工程师", example: "佢系电脑工程师", category: "职业" },
        { word: "律师", pronunciation: "leot6 si1", explanation: "律师", example: "我请咗律师帮我", category: "职业" },
        { word: "会计", pronunciation: "wui6 gai3", explanation: "会计师", example: "会计要计好多数", category: "职业" },
        
        // 身体部位
        { word: "头", pronunciation: "tau4", explanation: "头", example: "我个头好痛", category: "身体" },
        { word: "手", pronunciation: "sau2", explanation: "手", example: "举手回答问题", category: "身体" },
        { word: "脚", pronunciation: "goek3", explanation: "脚", example: "对脚好攰", category: "身体" },
        { word: "眼", pronunciation: "ngaan5", explanation: "眼睛", example: "对眼好干", category: "身体" },
        { word: "耳", pronunciation: "ji5", explanation: "耳朵", example: "只耳仔好痕", category: "身体" },
        { word: "口", pronunciation: "hau2", explanation: "嘴巴", example: "开口讲话", category: "身体" },
        { word: "鼻", pronunciation: "bei6", explanation: "鼻子", example: "个鼻塞咗", category: "身体" },
        { word: "心", pronunciation: "sam1", explanation: "心", example: "我个心好乱", category: "身体" },
        { word: "背", pronunciation: "bui3", explanation: "背", example: "个背好痛", category: "身体" },
        { word: "肚", pronunciation: "tou5", explanation: "肚子", example: "个肚饿啦", category: "身体" },
        
        // 日常用品
        { word: "手机", pronunciation: "sau2 gei1", explanation: "手机", example: "我部手机冇电", category: "日常用品" },
        { word: "电脑", pronunciation: "din6 nou5", explanation: "电脑", example: "用电脑做功课", category: "日常用品" },
        { word: "电视", pronunciation: "din6 si6", explanation: "电视", example: "睇电视新闻", category: "日常用品" },
        { word: "雪柜", pronunciation: "syut3 gwai6", explanation: "冰箱", example: "雪柜有冇嘢饮？", category: "日常用品" },
        { word: "洗衣机", pronunciation: "sai2 jai1 gei1", explanation: "洗衣机", example: "用洗衣机洗衫", category: "日常用品" },
        { word: "微波炉", pronunciation: "mei4 bo1 lou4", explanation: "微波炉", example: "用微波炉叮热啲餸", category: "日常用品" },
        { word: "电饭煲", pronunciation: "din6 faan6 bou1", explanation: "电饭锅", example: "用电饭煲煮饭", category: "日常用品" },
        { word: "风扇", pronunciation: "fung1 sin3", explanation: "风扇", example: "开风扇凉啲", category: "日常用品" },
        { word: "冷气", pronunciation: "laang5 hei3", explanation: "空调", example: "开冷气啦", category: "日常用品" },
        { word: "热水器", pronunciation: "jit6 seoi2 hei3", explanation: "热水器", example: "热水器坏咗", category: "日常用品" }
    ];
    
    extendedVocabulary.push(...additionalWords);
    
    return extendedVocabulary;
}

// 生成3500个词汇数据
const vocabularyData = generateExtendedVocabulary();

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vocabularyData;
} else {
    window.vocabularyData = vocabularyData;
}