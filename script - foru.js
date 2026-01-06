// --- script.js 文件内容开始 ---

// --- 游戏数据结构 (包含所有修正、媒体位置和结局提示) ---
const gameNodes = {
    // 网页首页
    '网页首页': {
        text: '开启安安的一天吧🐾',
        media: null,
        options: [
            { text: '我准备好了！', nextNode: 'Q1' },
            { text: '报告网页问题', nextNode: '结局5（隐藏结局）' },
            { text: '无', nextNode: null }
        ]
    },
    
    // Q1 - 修正：将图片作为选项的引导图片显示
    'Q1': {
        text: '明明是周末，你却一反常态，今天早上醒得很早。此时你：',
        media: { // 节点自带媒体，用于在选项区显示
            a: { type: 'image', src: '图片：跳上床的安安' },
            b: { type: 'image', src: '图片：在床上睡觉的安安' }
        },
        options: [
            { text: '发现安安跳上了床，决定带已经醒来的安安出门玩耍！', nextNode: 'Q2-A' },
            { text: '不忍心叫醒睡觉的安安', nextNode: 'Q2-B' },
            { text: '无', nextNode: null }
        ]
    },

    // Q2-A
    'Q2-A': {
        text: '于是你带着安安下了楼。在小区里，一人一狗……',
        media: {
            node: { type: 'image', src: '图片：安安下楼' },
        },
        options: [
            { text: '遇见了一只狸花猫！所以你选择和小猫玩了一会🐱', nextNode: 'Q3-A', media: { type: 'image', src: '图片：遇到狸花猫' } },
            { text: '安安突然飞快钻到车旁边？!', nextNode: 'Q3-B', media: { type: 'image', src: '图片：钻到车旁边' } },
            { text: '遇见了疑似好朋狗🐕安安开疾跑后主动出击。', nextNode: 'Q3-C', media: { type: 'image', src: '图片：安安出击' } }
        ]
    },
    
    // Q2-B
    'Q2-B': {
        text: '过了很久，安安终于醒了，那就：',
        media: null,
        options: [
            { text: '给安安吃点东西吧！', nextNode: 'Q5', media: { type: 'image', src: '图片：给安安吃' } },
            { text: '无', nextNode: null },
            { text: '无', nextNode: null }
        ]
    },
    
    // Q3-A
    'Q3-A': {
        text: '安安失宠，遛狗难度+100↑到底谁是你的小宠？',
        media: {
            node: { type: 'image', src: '图片：暴走安安' }
        },
        options: [
            { text: '咋整，遛得心好累，回家吧先！', nextNode: 'Q4' },
            { text: '无', nextNode: null },
            { text: '无', nextNode: null }
        ]
    },

    // Q3-B
    'Q3-B': {
        text: '你步履蹒跚，遛狗难度+100↑折磨主人是对的吗？',
        media: {
            node: { type: 'image', src: '图片：暴走安安' }
        },
        options: [
            { text: '咋整，遛得腰酸背痛，回家吧先！', nextNode: 'Q4' },
            { text: '无', nextNode: null },
            { text: '无', nextNode: null }
        ]
    },
    
    // Q3-C
    'Q3-C': {
        text: '可是随橙想呢。。好朋狗心情不好，安安落荒而逃。。',
        media: {
            node: { type: 'image', src: '图片：安安落荒而逃' }
        },
        options: [
            { text: '闻人家屁股好没面子，回家吧先！', nextNode: 'Q4' },
            { text: '无', nextNode: null },
            { text: '无', nextNode: null }
        ]
    },

    // Q4
    'Q4': {
        text: '一人一狗终于回到家，你决定：',
        media: null, 
        options: [
            { text: '先给安安吃点东西', nextNode: 'Q5', media: { type: 'image', src: '图片：给安安吃' } },
            { text: '先休息一下，不给安安吃东西', nextNode: '结局1', media: { type: 'image', src: '图片：晾在一边' } },
            { text: '自己吃点东西，等会再给安安吃', nextNode: 'Q5', media: { type: 'image', src: '图片：馋老胚' } }
        ]
    },

    // Q5
    'Q5': {
        text: '安安再吃点什么好呢？你灵机一动：',
        media: null,
        options: [
            { text: '节省下嘴里的蓝莓分享给了安安', nextNode: 'Q6', media: { type: 'video', src: '视频：安安吃蓝莓' } },
            { text: '翻出小狗零食给安安', nextNode: 'Q6', media: { type: 'image', src: '图片：小狗零食' } },
            { text: '无', nextNode: null }
        ]
    },

    // Q6
    'Q6': {
        text: '吃饱喝足后，安安又困了💤',
        media: {
            node: { type: 'image', src: '图片：安安困了' }
        },
        options: [
            { text: '今天下午还要回学校办事，于是忍痛离开安安出门😭', nextNode: 'Q7' },
            { text: '不去学校了！和安安一起睡午觉🤭', nextNode: '结局2' },
            { text: '无', nextNode: null }
        ]
    },

    // Q7
    'Q7': {
        text: '而在你不知道的地方，孝狗安安决定：',
        media: null,
        options: [
            { text: '棕狗王子乘车而来中', nextNode: 'Q8', media: { type: 'image', src: '图片：乘车而来' } },
            { text: '棕狗王子搭乘了疑问的车筐', nextNode: '结局3', media: { type: 'image', src: '图片：搭乘车筐' } },
            { text: '热情地在家等你', nextNode: 'Q8', media: { type: 'image', src: '图片：在家等你' } }
        ]
    },

    // Q8
    'Q8': {
        text: '经历了一阵跋涉，终于到家了🏠考虑到安安的孝行，你又决定：',
        media: null,
        options: [
            { text: '带安安继续去小区里玩一会儿吧！', nextNode: 'Q9', media: { type: 'video', src: '视频：继续遛狗' } },
            { text: '陪安安在客厅里玩一会儿吧！', nextNode: 'Q9', media: { type: 'image', src: '图片：客厅里玩' } },
            { text: '无', nextNode: null }
        ]
    },

    // Q9
    'Q9': {
        text: '一阵玩耍后，你和安安都玩累了。无所事事的晚上，现在就休息吧！',
        media: null,
        options: [
            { text: '这样睡吧^o^', nextNode: '结局4（大结局）', media: { type: 'image', src: '图片：111' } },
            { text: '那样睡吧^3^', nextNode: '结局4（大结局）', media: { type: 'image', src: '图片：222' } },
            { text: '无', nextNode: null }
        ]
    },

    // 结局节点 (包含结局提示和您的最新修改)
    '结局1': {
        text: '安安这么可爱怎么可以不给安安吃东西？！',
        endingTitle: '结局1',
        media: { node: { type: 'image', src: '图片：可爱安安' } },
        options: [{ text: '从头开始，保证会对安安好一点', nextNode: '网页首页', isEnding: true }, { text: '无', nextNode: null }, { text: '无', nextNode: null }]
    },
    '结局2': {
        text: '新闻：上海一大学生因与宠物狗玩耍，竟然错过毕业论文答辩。',
        endingTitle: '结局2',
        media: { node: { type: 'image', src: '图片：睡午觉' } },
        options: [{ text: '从头开始，保证不会因狗废学', nextNode: '网页首页', isEnding: true }, { text: '无', nextNode: null }, { text: '无', nextNode: null }]
    },
    '结局3': {
        text: '宁愿在哈啰单车上笑，也不要在宝马里哭。',
        endingTitle: '结局3',
        media: null,
        options: [{ text: '从头开始，保证安安会在母父奶爷的护送下安全出行', nextNode: '网页首页', isEnding: true }, { text: '无', nextNode: null }, { text: '无', nextNode: null }]
    },
    '结局4（大结局）': {
        text: '如果是和安安的话，只是这样过简单的一天也很好。',
        endingTitle: '结局4 (大结局)',
        media: null,
        options: [{ text: '从头开始，看看这一天还会有什么事发生？', nextNode: '网页首页', isEnding: true }, { text: '无', nextNode: null }, { text: '无', nextNode: null }]
    },
    // 您的最新修改
    '结局5（隐藏结局）': {
        text: '在汪星也是最善良勇敢可爱阳光的小狗安安',
        endingTitle: '结局5 (隐藏结局)',
        media: { node: { type: 'image', src: '图片：汪星' } },
        options: [{ text: '回到主页', nextNode: '网页首页', isEnding: true }, { text: '无', nextNode: null }, { text: '无', nextNode: null }]
    }
};

// --- 游戏逻辑 ---
let currentNodeKey = '网页首页'; 
const history = []; 

const nodeTextEl = document.getElementById('node-text');
const mediaContainerEl = document.getElementById('media-container');
const optionsContainerEl = document.getElementById('options-container');
const restartContainerEl = document.getElementById('restart-container');
const restartButtonEl = document.getElementById('restart-button');
const endingTitleEl = document.getElementById('ending-title');
const bugReportContainerEl = document.getElementById('bug-report-container'); // 确保引用了彩蛋容器
const mediaFolderPath = '媒体/'; 

/**
 * 创建媒体元素 (图片/视频)
 */
function createMediaElement(mediaData) {
    if (!mediaData) return null;
    let mediaEl;
    const baseName = mediaData.src.replace('图片：', '').replace('视频：', '');

    if (mediaData.type === 'image') {
        mediaEl = document.createElement('img');
        mediaEl.src = mediaFolderPath + baseName + '.jpg'; 
        mediaEl.alt = baseName + ' image';
    } else if (mediaData.type === 'video') {
        mediaEl = document.createElement('video');
        mediaEl.controls = true; 
        mediaEl.autoplay = true; 
        mediaEl.loop = true; 
        mediaEl.src = mediaFolderPath + baseName + '.mp4';
    }
    return mediaEl;
}

/**
 * “返回上一题”功能实现
 */
function goBack() {
    if (history.length > 0) {
        history.pop(); 
        const previousNodeKey = history.pop() || '网页首页'; 
        
        currentNodeKey = previousNodeKey;
        displayNode(currentNodeKey, null, true);
    }
}

/**
 * 根据当前节点ID更新游戏界面。
 */
function displayNode(nodeKey, selectedOptionMedia = null, isBack = false) {
    const node = gameNodes[nodeKey];
    if (!node) {
        console.error('Node not found:', nodeKey);
        return;
    }

    // 1. 历史记录处理
    if (!isBack && nodeKey !== '网页首页' && !nodeKey.startsWith('结局')) {
        history.push(nodeKey);
    }
    
    // 2. 清空/初始化区域
    mediaContainerEl.innerHTML = '';
    optionsContainerEl.innerHTML = '';
    restartContainerEl.style.display = 'none';
    endingTitleEl.style.display = 'none';
    endingTitleEl.textContent = '';
    bugReportContainerEl.innerHTML = ''; // 清空彩蛋按钮容器
    
    // 3. 媒体内容处理
    let mediaToDisplay = selectedOptionMedia; 
    if (!mediaToDisplay && nodeKey !== 'Q1' && node.media && node.media.node) {
        mediaToDisplay = node.media.node;
    }
    
    const mediaEl = createMediaElement(mediaToDisplay);
    if (mediaEl) {
        mediaContainerEl.appendChild(mediaEl);
    }
    
    // 4. 文字内容和顺序调整
    if (nodeKey.startsWith('Q') && nodeKey !== 'Q1') {
        nodeTextEl.style.order = 2; 
        mediaContainerEl.style.order = 1; 
    } else {
        nodeTextEl.style.order = 1; 
        mediaContainerEl.style.order = 2; 
    }
    nodeTextEl.textContent = node.text;


    // 5. 选项按钮处理和容器显示控制
    const isEndingNode = nodeKey.startsWith('结局');
    optionsContainerEl.style.display = 'block';

    // Q1 节点特殊处理 (调整布局)
    if (nodeKey === 'Q1') {
        optionsContainerEl.style.display = 'grid'; 
        optionsContainerEl.style.gridTemplateColumns = '1fr 1fr';
        optionsContainerEl.style.gap = '30px'; // 使用CSS建议的30px
    } else {
        // 确保非Q1节点是常规的 flex/block 布局
        optionsContainerEl.style.display = 'flex';
        optionsContainerEl.style.flexDirection = 'column';
    } 

    // 如果不是结局，则创建常规选项
    if (!isEndingNode) {
        
        // 5a. 【首页彩蛋处理】 <-- 此处是修复重点，保证逻辑完整
        if (nodeKey === '网页首页') {
            // 从选项中找到隐藏结局的选项
            const hiddenOption = node.options.find(opt => opt.nextNode === '结局5（隐藏结局）');
            const startOption = node.options.find(opt => opt.nextNode === 'Q1');

            if (hiddenOption) {
                // 仅为隐藏结局创建右上角按钮 (彩蛋)
                const bugButton = document.createElement('button');
                bugButton.textContent = hiddenOption.text; // "报告网页问题"
                bugButton.addEventListener('click', () => {
                    currentNodeKey = hiddenOption.nextNode;
                    displayNode(currentNodeKey, hiddenOption.media);
                });
                bugReportContainerEl.appendChild(bugButton);
            }

            // 仅为正常开始创建选项 (我准备好了!)
            if (startOption) {
                const startButton = document.createElement('button');
                startButton.textContent = startOption.text;
                startButton.addEventListener('click', () => {
                    currentNodeKey = startOption.nextNode;
                    displayNode(currentNodeKey, startOption.media);
                });
                optionsContainerEl.appendChild(startButton);
            }
            
            // 首页逻辑处理完毕，直接返回，跳过后面的通用选项逻辑
            return; 
        } 
        
        // 5b. 【非首页/非结局问答节点通用选项创建和返回按钮】
        node.options.forEach((option, index) => {
            if (option.text !== '无' && option.nextNode) {
                
                if (nodeKey === 'Q1') {
                    // Q1 选项创建 (带预览图)
                    const optionBox = document.createElement('div');
                    optionBox.className = 'q1-option-box';
                    
                    let optionMedia = null;
                    if (index === 0 && node.media.a) { 
                        optionMedia = node.media.a;
                    } else if (index === 1 && node.media.b) { 
                        optionMedia = node.media.b;
                    }
                    const previewEl = createMediaElement(optionMedia);
                    if (previewEl) {
                        previewEl.style.maxHeight = '150px';
                        previewEl.style.marginBottom = '15px';
                        optionBox.appendChild(previewEl);
                    }

                    const button = document.createElement('button');
                    button.textContent = option.text;
                    button.addEventListener('click', () => {
                        currentNodeKey = option.nextNode;
                        displayNode(currentNodeKey, option.media); 
                    });
                    optionBox.appendChild(button);
                    optionsContainerEl.appendChild(optionBox);

                } else {
                    // Q2+ 节点按钮
                    const button = document.createElement('button');
                    button.textContent = option.text;
                    button.addEventListener('click', () => {
                        currentNodeKey = option.nextNode;
                        displayNode(currentNodeKey, option.media);
                    });
                    optionsContainerEl.appendChild(button);
                }
            }
        });

        // 6. 新增“返回上一题”按钮 (非结局节点，非首页)
        if (nodeKey !== '网页首页' && history.length > 0) {
            const backButton = document.createElement('button');
            backButton.textContent = '返回上一题';
            backButton.style.backgroundColor = '#909090'; 
            backButton.style.marginTop = '20px';
            backButton.addEventListener('click', goBack);
            optionsContainerEl.appendChild(backButton);
        }

    }


    // 7. 结局处理 (控制显示/隐藏和结局提示)
    if (isEndingNode) {
        optionsContainerEl.style.display = 'none'; 
        restartContainerEl.style.display = 'block'; 

        // 显示结局提示
        if (node.endingTitle) {
            endingTitleEl.textContent = node.endingTitle;
            endingTitleEl.style.display = 'block';
        }
        
        const endingOption = node.options.find(opt => opt.nextNode === '网页首页');
        if (endingOption) {
            restartButtonEl.textContent = endingOption.text;
            restartButtonEl.onclick = () => {
                history.length = 0; 
                currentNodeKey = '网页首页';
                displayNode(currentNodeKey); 
            };
        }
    } 
}

// 游戏的启动入口
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('content-area').style.display = 'flex';
    document.getElementById('content-area').style.flexDirection = 'column';
    
    displayNode(currentNodeKey);
});
// --- script.js 文件内容结束 ---
