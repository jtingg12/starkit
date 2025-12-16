// 在DOM加载完成后添加
console.log("DOM已加载，检查元素:");
console.log("quiz-question元素:", document.querySelector('.quiz-question'));
console.log("quiz-result-section元素:", document.querySelector('.quiz-result-section'));
console.log("result-content元素:", document.querySelector('.result-content'));

// Quiz JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Quiz Header Section
  const stepCards = document.querySelectorAll('.step-1, .step-2, .step-3');
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.classList.contains('delay-2') ? '0.4s' : 
                     entry.target.classList.contains('delay-3') ? '0.6s' : 
                     entry.target.classList.contains('delay-4') ? '0.8s' : '0.2s';
        entry.target.style.animation = `fadeInUp 0.8s ease ${delay} forwards`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  stepCards.forEach(card => {
    observer.observe(card);
  });

  // 所有问题和选项数据
  const quizQuestions = [
    {
      en: "Morning arrives, and you're ready to embark on an adventure! What do you most want to bring?",
      cn: "清晨来临，你准备好踏上冒险之旅了！你最想带什么？",
      options: [
        { en: "A small backpack with a map inside", cn: "一个装着地图的小包", fox: "red-fox" },
        { en: "A walkman playing cheerful songs", cn: "一个播放着欢快歌曲的随身听", fox: "fennec-fox" },
        { en: "A sturdy walking stick", cn: "一根结实的拐杖", fox: "gray-fox" },
        { en: "A soft, comfortable scarf", cn: "一条柔软舒适的围巾", fox: "arctic-fox" }
      ]
    },
    {
      en: "What's the first thing you notice when you enter a forest?",
      cn: "进入森林时，你第一眼会注意到什么？",
      options: [
        { en: "The tall trees and the path ahead", cn: "高大的树木和前方的道路", fox: "red-fox" },
        { en: "The birds and insects in the trees", cn: "树上的鸟儿和昆虫", fox: "fennec-fox" },
        { en: "The stones on the ground and the footprints underfoot", cn: "地上的石头和脚下的足迹", fox: "gray-fox" },
        { en: "The gentle sound of the wind", cn: "轻柔的风声", fox: "arctic-fox" }
      ]
    },
    {
      en: "When you walk into a meadow and a butterfly flies toward you, what do you do?",
      cn: "当你走进一片草地，一只蝴蝶向你飞来，你会怎么做？",
      options: [
        { en: "Follow it to see where it flies", cn: "追着看它飞到哪里", fox: "red-fox" },
        { en: "Clap your hands happily and try to play with it", cn: "开心地拍拍手，试着和它玩耍", fox: "fennec-fox" },
        { en: "Use branches to record directions and avoid getting lost", cn: "用树枝记录方向，避免迷路", fox: "gray-fox" },
        { en: "Sit down gently and watch it rest on a flower", cn: "轻轻地坐下来，看着它在一朵花上休息", fox: "arctic-fox" }
      ]
    },
    {
      en: "There is a small river on the way, how would you cross it?",
      cn: "路途中有一条小河，你会怎么过？",
      options: [
        { en: "Try to jump across it", cn: "尝试直接跳过去", fox: "red-fox" },
        { en: "Dip your feet in the water and splash", cn: "把脚浸入水中，然后溅起水花", fox: "fennec-fox" },
        { en: "Pave a path with stones and walk across it", cn: "用石头铺成一条小路，然后走过去", fox: "gray-fox" },
        { en: "Sitting by the river, watching the water flow slowly", cn: "坐在河边，看着河水缓缓流淌", fox: "arctic-fox" }
      ]
    },
    {
      en: "Deep in the forest, there is a magical clearing where you found a treasure. What do you hope it is?",
      cn: "在森林深处，有一片神奇的空地，你在那里发现了宝藏。你希望它是什么？",
      options: [
        { en: "A compass that guides direction", cn: "一个指引方向的指南针", fox: "red-fox" },
        { en: "A bell that tells funny jokes", cn: "一个会讲笑话的铃铛", fox: "fennec-fox" },
        { en: "A talisman to keep you safe", cn: "一个保佑你平安的护身符", fox: "gray-fox" },
        { en: "A small glowing lamp", cn: "一盏会发光的小灯", fox: "arctic-fox" }
      ]
    },
    {
      en: "It suddenly rains! What will you do?",
      cn: "突然下雨了！你会怎么做？",
      options: [
        { en: "Quickly ran to a big tree to take shelter from the rain", cn: "赶紧跑到一棵大树下避雨", fox: "red-fox" },
        { en: "Spin around and dance in the rain", cn: "在雨中旋转跳舞", fox: "fennec-fox" },
        { en: "Build a small shed with leaves and branches", cn: "用树叶和树枝搭建一个小棚子", fox: "gray-fox" },
        { en: "Standing quietly, listening to the sound of raindrops", cn: "静静地站着，聆听雨滴的声音", fox: "arctic-fox" }
      ]
    },
    {
      en: "As night falls, you hear an owl hooting. What will you do?",
      cn: "夜幕降临，你听到猫头鹰的叫声。你会怎么做？",
      options: [
        { en: "Curious about finding it and seeing what it looks like", cn: "好奇地想找到它并看看它是什么样子", fox: "red-fox" },
        { en: "Talk to it by making the hooting sound of an owl", cn: "学猫头鹰 '咕咕' 的叫声跟它说话", fox: "fennec-fox" },
        { en: "Memorize its direction to avoid getting lost", cn: "记下它的方向，以免迷路", fox: "gray-fox" },
        { en: "Listen quietly and enjoy this unique sound", cn: "静静地聆听，享受这独特的声音", fox: "arctic-fox" }
      ]
    },
    {
      en: "When you look up at the starry sky before going to bed, which type of star do you like best?",
      cn: "睡前抬头仰望星空，你最喜欢哪种星星？",
      options: [
        { en: "A shooting star across the sky", cn: "一颗划过天边的流星", fox: "red-fox" },
        { en: "A constellation of twinkling stars", cn: "一片闪闪眨眼的星群", fox: "fennec-fox" },
        { en: "A bright star shines alone", cn: "一颗明亮的星星独自闪耀", fox: "gray-fox" },
        { en: "The round moon hangs quietly in the sky", cn: "圆圆的月亮静静地挂在天空", fox: "arctic-fox" }
      ]
    }
  ];

  // 用户选择记录 - 存储每个问题选择的狐狸类型
  let userSelections = Array(8).fill(null);
  let currentQuestion = 0;
  let currentLang = 'en';

  // 初始化
  function initQuiz() {
    updateQuestionDisplay();
    setupEventListeners();
  }

  // 设置事件监听器
  function setupEventListeners() {
    // 语言切换
    const langSwitchBtn = document.querySelector('.language-switch-btn');
    if (langSwitchBtn) {
      langSwitchBtn.addEventListener('click', toggleLanguage);
    }

    // 上一题按钮
    const prevBtn = document.querySelector('.prev-question-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', goToPreviousQuestion);
    }

    // 下一题按钮
    const nextBtn = document.querySelector('.next-question-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', goToNextQuestion);
    }

    // 选项选择事件 - 使用事件委托
    document.querySelector('.options-list')?.addEventListener('click', function(e) {
      const optionItem = e.target.closest('.option-item');
      if (optionItem) {
        selectOption(optionItem);
      }
    });
  }

  // 切换语言
  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'cn' : 'en';
    updateLanguage();
  }

  // 更新语言
  function updateLanguage() {
    // 更新body的class
    document.body.classList.remove('lang-en', 'lang-cn');
    document.body.classList.add(`lang-${currentLang}`);
    
    // 更新问题文本
    const questionStatement = document.querySelector('.question-statement');
    if (questionStatement) {
      questionStatement.textContent = quizQuestions[currentQuestion][currentLang];
    }
    
    // 更新选项文本
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach((item, index) => {
      const optionText = item.querySelector('.option-text');
      if (optionText && quizQuestions[currentQuestion].options[index]) {
        optionText.textContent = quizQuestions[currentQuestion].options[index][currentLang];
      }
    });
    
    // 更新按钮文本
    updateButtonTexts();

    // 更新完成页面的文字（如果显示的话）
    const quizDoneWrapper = document.querySelector('.quiz-done-wrapper');
    if (quizDoneWrapper && quizDoneWrapper.style.display !== 'none') {
      const doneTitle = quizDoneWrapper.querySelector('.done-title');
      const doneSubtitle = quizDoneWrapper.querySelector('.done-subtitle');
      
      if (doneTitle) {
        doneTitle.textContent = currentLang === 'en' 
          ? "Yay! You did it!" 
          : "太棒了！你完成了！";
      }
      
      if (doneSubtitle) {
        doneSubtitle.textContent = currentLang === 'en'
          ? "Now it's time to meet your fox friend!"
          : "现在快去见见你的狐狸小伙伴吧！";
      }
    }

    // 更新加载页面的文字（如果显示的话）
    const quizLoadingWrapper = document.querySelector('.quiz-loading-wrapper');
    if (quizLoadingWrapper && quizLoadingWrapper.style.display !== 'none') {
      const loadingText = quizLoadingWrapper.querySelector('.loading-text');
      if (loadingText) {
        loadingText.textContent = currentLang === 'en'
          ? "Calculating your fox friend..." 
          : "正在计算你的狐狸朋友...";
      }
    }
  }

  // 更新按钮文本
  function updateButtonTexts() {
    const nextBtn = document.querySelector('.next-question-btn');
    const prevBtn = document.querySelector('.prev-question-btn');
    const nextText = nextBtn?.querySelector('.next-text');
    const prevText = prevBtn?.querySelector('.prev-text');
    const questionNum = document.querySelector('.question-number');
    const nextIcon = nextBtn?.querySelector('.next-icon');
    const checkIcon = nextBtn?.querySelector('.check-icon');
    
    // 更新下一题按钮文本和图标（最后一题时变成"Submit"和打勾图标）
    if (nextText) {
      if (currentQuestion === 7) {
        nextText.textContent = currentLang === 'en' ? 'Submit' : '提交';
        nextText.dataset.en = 'Submit';
        nextText.dataset.cn = '提交';
        
        // 切换到打勾图标
        if (nextIcon) nextIcon.style.display = 'none';
        if (checkIcon) checkIcon.style.display = 'block';
      } else {
        nextText.textContent = currentLang === 'en' ? 'Next' : '下一题';
        nextText.dataset.en = 'Next';
        nextText.dataset.cn = '下一题';
        
        // 切换回箭头图标
        if (nextIcon) nextIcon.style.display = 'block';
        if (checkIcon) checkIcon.style.display = 'none';
      }
    }
    
    // 更新上一题按钮文本
    if (prevText) {
      prevText.textContent = currentLang === 'en' ? 'Previous' : '上一题';
      prevText.dataset.en = 'Previous';
      prevText.dataset.cn = '上一题';
    }
    
    // 更新问题编号
    if (questionNum) {
      questionNum.textContent = currentLang === 'en'
        ? `Question ${currentQuestion + 1} of 8`
        : `第 ${currentQuestion + 1} 题，共 8 题`;
    }
  }

  // 更新问题显示
  function updateQuestionDisplay() {
    // 更新问题编号
    const questionNum = document.querySelector('.question-number');
    if (questionNum) {
      questionNum.textContent = currentLang === 'en'
        ? `Question ${currentQuestion + 1} of 8`
        : `第 ${currentQuestion + 1} 题，共 8 题`;
      questionNum.dataset.en = `Question ${currentQuestion + 1} of 8`;
      questionNum.dataset.cn = `第 ${currentQuestion + 1} 题，共 8 题`;
    }
    
    // 更新进度条
    const progress = ((currentQuestion + 1) / 8) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    
    // 更新问题文本
    const questionStatement = document.querySelector('.question-statement');
    if (questionStatement) {
      questionStatement.textContent = quizQuestions[currentQuestion][currentLang];
      questionStatement.dataset.en = quizQuestions[currentQuestion].en;
      questionStatement.dataset.cn = quizQuestions[currentQuestion].cn;
    }
    
    // 更新选项
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach((item, index) => {
      const optionText = item.querySelector('.option-text');
      const optionData = quizQuestions[currentQuestion].options[index];
      
      if (optionText && optionData) {
        optionText.textContent = optionData[currentLang];
        optionText.dataset.en = optionData.en;
        optionText.dataset.cn = optionData.cn;
        item.dataset.fox = optionData.fox;
        
        // 如果之前已选择此项，则标记为选中
        if (userSelections[currentQuestion] === optionData.fox) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      }
    });
    
    // 更新按钮文本
    updateButtonTexts();
    
    // 更新上一题按钮的显示/隐藏
    updatePrevButtonVisibility();
    
    // 更新下一题按钮状态
    updateNextButtonState();
  }

  // 更新上一题按钮的可见性
  function updatePrevButtonVisibility() {
    const prevBtn = document.querySelector('.prev-question-btn');
    if (prevBtn) {
      if (currentQuestion === 0) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'flex';
      }
    }
  }

  // 更新下一题按钮状态
  function updateNextButtonState() {
    const nextBtn = document.querySelector('.next-question-btn');
    if (nextBtn) {
      // 如果有选择，就启用按钮
      nextBtn.disabled = userSelections[currentQuestion] === null;
    }
  }

  // 选择选项
  function selectOption(optionItem) {
    // 移除所有选项的选中状态
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach(item => item.classList.remove('selected'));
    
    // 添加选中状态到当前选项
    optionItem.classList.add('selected');
    
    // 保存用户选择
    const selectedFox = optionItem.dataset.fox;
    userSelections[currentQuestion] = selectedFox;
    
    // 启用下一题按钮
    const nextBtn = document.querySelector('.next-question-btn');
    if (nextBtn) {
      nextBtn.disabled = false;
    }
    
    console.log(`Q${currentQuestion + 1}: Selected ${selectedFox}`);
  }

  // 前往下一题
  function goToNextQuestion() {
    const nextBtn = document.querySelector('.next-question-btn');
    
    // 检查是否已选择当前问题
    if (userSelections[currentQuestion] === null) {
      alert(currentLang === 'en' 
        ? "Please select an answer before proceeding!" 
        : "请选择一个答案再继续！");
      return;
    }
    
    // 如果是最后一题，提交测试
    if (currentQuestion === 7) {
      submitQuiz();
      return;
    }
    
    // 前往下一题
    currentQuestion++;
    updateQuestionDisplay();
  }

  // 前往上一题
  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      updateQuestionDisplay();
    }
  }

  // 提交测试
  function submitQuiz() {
    // 检查是否所有问题都已回答
    const unansweredQuestions = userSelections.filter(selection => selection === null);
    
    if (unansweredQuestions.length > 0) {
      alert(currentLang === 'en' 
        ? "Please answer all questions before submitting!" 
        : "请回答所有问题再提交！");
      return;
    }
    
    console.log("Quiz submitted!");
    console.log("User selections:", userSelections);
    
    // 计算每种狐狸的选择次数
    const foxCounts = {
      'red-fox': 0,
      'fennec-fox': 0,
      'gray-fox': 0,
      'arctic-fox': 0
    };
    
    userSelections.forEach(fox => {
      if (fox) {
        foxCounts[fox]++;
      }
    });
    
    console.log("Fox counts:", foxCounts);
    
    // 找到选择最多的狐狸（如果有平局，选择第一个）
    let maxCount = 0;
    let userFox = 'red-fox'; // 默认值
    
    Object.entries(foxCounts).forEach(([fox, count]) => {
      if (count > maxCount) {
        maxCount = count;
        userFox = fox;
      }
    });
    
    console.log(`User's fox: ${userFox} (selected ${maxCount} times)`);
    
    // 保存结果到localStorage，包括用户选择的狐狸类型
    localStorage.setItem('starkit-quiz-results', JSON.stringify({
      selections: userSelections,
      fox: userFox, // 这里保存用户选择的狐狸
      foxCounts: foxCounts, // 保存计数以便调试
      timestamp: new Date().toISOString()
    }));
    
    // 显示完成页面
    showQuizDonePage();
  }

  // 显示完成页面（只隐藏指定元素）
  function showQuizDonePage() {
    // 获取需要隐藏的DOM元素
    const questionTextbox = document.querySelector('.question-text-box');
    const optionsList = document.querySelector('.options-list');
    const optionsDivider = document.querySelector('.options-divider');
    const prevBtn = document.querySelector('.prev-question-btn');
    const nextBtn = document.querySelector('.next-question-btn');
    const langBtn = document.querySelector('.language-switch-btn');
    
    // 显示完成页面元素
    const quizDoneWrapper = document.querySelector('.quiz-done-wrapper');
    const quizLoadingWrapper = document.querySelector('.quiz-loading-wrapper');
    
    if (quizDoneWrapper) {
      // 更新完成页面的文字
      const doneTitle = quizDoneWrapper.querySelector('.done-title');
      const doneSubtitle = quizDoneWrapper.querySelector('.done-subtitle');
      
      if (doneTitle) {
        doneTitle.textContent = currentLang === 'en' 
          ? "Yay! You did it!" 
          : "太棒了！你完成了！";
      }
      
      if (doneSubtitle) {
        doneSubtitle.textContent = currentLang === 'en'
          ? "Now it's time to meet your fox friend!"
          : "现在快去见见你的狐狸小伙伴吧！";
      }
      
      // 隐藏指定元素
      if (questionTextbox) questionTextbox.style.display = 'none';
      if (optionsList) optionsList.style.display = 'none';
      if (optionsDivider) optionsDivider.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      
      // 显示完成页面（现在可以显示了）
      quizDoneWrapper.style.display = 'block';
      
      // 添加淡入动画
      setTimeout(() => {
        quizDoneWrapper.style.opacity = '0';
        quizDoneWrapper.style.transform = 'translateY(20px)';
        quizDoneWrapper.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
          quizDoneWrapper.style.opacity = '1';
          quizDoneWrapper.style.transform = 'translateY(0)';
        });
      }, 50);
      
      console.log("Showing quiz done page - only hiding specific elements");

      // 5秒后隐藏完成页面和语言按钮，显示加载动画
      setTimeout(() => {
        // 隐藏完成页面
        quizDoneWrapper.style.opacity = '0';
        quizDoneWrapper.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          quizDoneWrapper.style.display = 'none';
          
          // 隐藏语言按钮
          if (langBtn) {
            langBtn.style.opacity = '0';
            langBtn.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
              langBtn.style.display = 'none';
            }, 500);
          }
          
          // 显示加载动画
          if (quizLoadingWrapper) {
            // 更新加载文字
            const loadingText = quizLoadingWrapper.querySelector('.loading-text');
            if (!loadingText) {
              // 如果没有加载文字，添加一个
              const textDiv = document.createElement('div');
              textDiv.className = 'loading-text';
              textDiv.textContent = currentLang === 'en' 
                ? "Calculating your fox friend..." 
                : "正在计算你的狐狸朋友...";
              quizLoadingWrapper.appendChild(textDiv);
            }
            
            quizLoadingWrapper.style.display = 'block';
            
            // 添加淡入动画
            setTimeout(() => {
              quizLoadingWrapper.style.opacity = '0';
              quizLoadingWrapper.style.transform = 'translateY(20px)';
              quizLoadingWrapper.style.transition = 'all 0.8s ease';
              
              requestAnimationFrame(() => {
                quizLoadingWrapper.style.opacity = '1';
                quizLoadingWrapper.style.transform = 'translateY(0)';
              });
            }, 50);
            
            // 3-4秒后隐藏加载动画，显示结果页面
            setTimeout(() => {
              // 隐藏加载动画
              if (quizLoadingWrapper) {
                quizLoadingWrapper.style.opacity = '0';
                quizLoadingWrapper.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                  quizLoadingWrapper.style.display = 'none';
                  
                  // 获取用户选择的狐狸类型
                  const userResults = JSON.parse(localStorage.getItem('starkit-quiz-results') || '{}');
                  const userFox = userResults.fox || 'red-fox';
                  
                  console.log("显示结果页面，狐狸类型:", userFox); // 添加调试信息

                  // 显示结果页面
                  showResultPage(userFox);
                  
                }, 500); // 等待淡出动画完成
              }
            }, 3000 + Math.random() * 1000); // 3-4秒随机时间
          }
        }, 500); // 等待淡出动画完成
      }, 5000); // 5秒后执行
    }
  }

  // 在 showResultPage 函数中，使用正确的选择器
  function showResultPage(foxType) {
    // 隐藏其他所有页面元素
    const quizQuestionSection = document.querySelector('.quiz-question');
    const quizDoneWrapper = document.querySelector('.quiz-done-wrapper');
    const quizLoadingWrapper = document.querySelector('.quiz-loading-wrapper');
    
    if (quizQuestionSection) quizQuestionSection.style.display = 'none';
    if (quizDoneWrapper) quizDoneWrapper.style.display = 'none';
    if (quizLoadingWrapper) quizLoadingWrapper.style.display = 'none';
    
    // 显示结果页面
    const quizResultSection = document.querySelector('.quiz-result-section');
    if (quizResultSection) {
      // 根据狐狸类型更新内容
      setFoxResultContent(foxType);
      
      // 显示结果页面
      quizResultSection.style.display = 'block';
      
      // 动画效果
      setTimeout(() => {
        quizResultSection.style.opacity = '0';
        quizResultSection.style.transform = 'translateY(30px)';
        quizResultSection.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
          quizResultSection.style.opacity = '1';
          quizResultSection.style.transform = 'translateY(0)';
        });
        
        // 2秒后卡片翻转
        setTimeout(() => {
          const cardContainer = quizResultSection.querySelector('.fox-card-container');
          if (cardContainer) {
            cardContainer.classList.add('flipped');
          }
        }, 2000);
      }, 50);
    }
    
    // 添加结果页面按钮的事件监听器
    setupResultButtons();
  }

  // 更新 setFoxResultContent 函数，接受单个参数
  function setFoxResultContent(foxType) {
    // 获取结果页面元素
    const resultSection = document.querySelector('.quiz-result-section');
    if (!resultSection) return;
    
    const foxName = resultSection.querySelector('.fox-name');
    const foxText = resultSection.querySelector('.fox-text');
    const cardFrontImg = resultSection.querySelector('.fox-card-front-img');
    const cardBackImg = resultSection.querySelector('.fox-card-back-img');
    
    // 获取按钮并移除所有颜色类
    const doItAgainBtn = resultSection.querySelector('.do-it-again-btn');
    const viewFoxFriendsBtn = resultSection.querySelector('.view-fox-friends-btn');
    const openItBtn = resultSection.querySelector('.open-it-btn');
    
    // 移除所有现有的颜色类
    if (doItAgainBtn) {
      doItAgainBtn.classList.remove('ruby', 'sunny', 'willy', 'snowy');
    }
    if (viewFoxFriendsBtn) {
      viewFoxFriendsBtn.classList.remove('ruby', 'sunny', 'willy', 'snowy');
    }
    if (openItBtn) {
      openItBtn.classList.remove('ruby', 'sunny', 'willy', 'snowy');
    }

    // 移除现有的文字颜色类
  if (foxName) {
    foxName.classList.remove('ruby-name', 'sunny-name', 'willy-name', 'snowy-name');
  }
  if (foxText) {
    foxText.classList.remove('ruby-text', 'sunny-text', 'willy-text', 'snowy-text');
  }
    
    // 根据狐狸类型设置不同的内容和图片
    switch(foxType) {
      case 'red-fox':
        // Ruby (Red Fox)
        if (foxName) {
          foxName.textContent = "Ruby (Red Fox)";
          foxName.classList.add('ruby-name');
        }
        if (foxText) {
          foxText.innerHTML = `
            <p>Ruby is full of energy, confidence, and courage. You enjoy taking action, exploring new ideas, and solving challenges in your own creative way. You are the kind of fox who is always eager to move forward and dares to create.</p>
            
            <p>You enjoy being a leader in a team and often take the first step when others hesitate. When something feels difficult for you, you won't give up easily. Instead, you think quickly and find a way to succeed.</p>
            
            <p>People around you love your bright and positive energy. Sometimes you might feel a little impatient because things are moving slowly, but that's only because you're eager to achieve your goals. Remember, it's okay to slow down and enjoy the journey.</p>
            
            <p>Ruby teaches us that courage is more than just being strong; it means believing in yourself and using your heart to guide others.</p>
          
            <p class="signature">Keep shining, little Ruby. The world feels brighter with you in it.</p>
          `;
          foxText.classList.add('ruby-text');
        }
        
        // 设置Ruby的图片
        if (cardFrontImg) cardFrontImg.src = "images/result/ruby.png";
        if (cardBackImg) cardBackImg.src = "images/result/ruby.f.png";
        
        // 设置Ruby的按钮颜色和图标
        if (doItAgainBtn) {
          doItAgainBtn.classList.add('ruby');
          const gif = doItAgainBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/redo1.gif";
        }
        if (viewFoxFriendsBtn) {
          viewFoxFriendsBtn.classList.add('ruby');
          const gif = viewFoxFriendsBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/magic.gif";
        }
        if (openItBtn) {
          openItBtn.classList.add('ruby');
          const gif = openItBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/openit1.gif";
        }
        break;
        
      case 'fennec-fox':
        // Sunny (Fennec Fox)
        if (foxName) {
          foxName.textContent = "Sunny (Fennec Fox)";
          foxName.classList.add('sunny-name');
        }
        if (foxText) {
          foxText.innerHTML = `
            <p>Sunny is cheerful, curious, and full of imagination. You love to laugh, share stories, and make friends wherever you go. Your bright personality can light up any room, and people around you often feel happy because of your warm energy.</p>
            
            <p>You enjoy trying new things, exploring colorful ideas, and expressing yourself in creative ways. Sometimes you may get distracted or forget small details, but that's because your mind is filled with so many fun thoughts and dreams.</p>
            
            <p>When you work in a team, you bring excitement and connection to everyone. You're the one who reminds others that learning and creating can be joyful.</p>
          
            <p>Sunny taught us that happiness is contagious and when you let your light shine, others will shine too.</p>
          
            <p class="signature">Keep smiling, little Sunny. The world feels warmer because of you.</p>
          `;
          foxText.classList.add('sunny-text');
        }
        
        // 设置Sunny的图片
        if (cardFrontImg) cardFrontImg.src = "images/result/sunny.png";
        if (cardBackImg) cardBackImg.src = "images/result/sunny.f.png";
        
        // 设置Sunny的按钮颜色和图标
        if (doItAgainBtn) {
          doItAgainBtn.classList.add('sunny');
          const gif = doItAgainBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/redo2.gif";
        }
        if (viewFoxFriendsBtn) {
          viewFoxFriendsBtn.classList.add('sunny');
          const gif = viewFoxFriendsBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/magic.gif";
        }
        if (openItBtn) {
          openItBtn.classList.add('sunny');
          const gif = openItBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/openit2.gif";
        }
        break;
        
      case 'gray-fox':
        // Willy (Gray Fox)
        if (foxName) {
          foxName.textContent = "Willy (Gray Fox)";
          foxName.classList.add('willy-name');
        }
        if (foxText) {
          foxText.innerHTML = `
            <p>Willy is calm, thoughtful, and careful with every step you take. You like to observe before you act, and you always try to make sure things are done the right way. You notice the little details that others might miss, and that makes you a truly special kind of fox.</p>
            
            <p>You enjoy solving puzzles, organizing your ideas, and planning before you move forward. Sometimes people may think you're too quiet or slow, but that's because you care about getting things just right. You prefer to think first, then act wisely.</p>
            
            <p>When working in a group, you bring balance and structure. You help others see things clearly and remind them that patience and precision matter too.</p>

            <p>Willy teaches us that being cautious is not about being afraid, but about understanding, learning, and growing in our own stable way.</p>
          
            <p class="signature">Keep going, little Willy. The world feels calmer when you're around.</p>
          `;
          foxText.classList.add('willy-text');
        }
        
        // 设置Willy的图片
        if (cardFrontImg) cardFrontImg.src = "images/result/willy.png";
        if (cardBackImg) cardBackImg.src = "images/result/willy.f.png";
        
        // 设置Willy的按钮颜色和图标
        if (doItAgainBtn) {
          doItAgainBtn.classList.add('willy');
          const gif = doItAgainBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/redo3.gif";
        }
        if (viewFoxFriendsBtn) {
          viewFoxFriendsBtn.classList.add('willy');
          const gif = viewFoxFriendsBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/magic.gif";
        }
        if (openItBtn) {
          openItBtn.classList.add('willy');
          const gif = openItBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/openit3.gif";
        }
        break;
        
      case 'arctic-fox':
        // Snowy (Arctic Fox)
        if (foxName) {
          foxName.textContent = "Snowy (Arctic Fox)";
          foxName.classList.add('snowy-name');
        }
        if (foxText) {
          foxText.innerHTML = `
            <p>Snowy is gentle, patient, and kind-hearted. You like peaceful places, quiet moments, and soft voices. You are the kind of fox who listens carefully, understands others' feelings, and brings comfort wherever you go.</p>
            
            <p>You enjoy helping friends, taking care of others, and creating harmony around you. When someone feels sad or confused, you're the one who quietly stays by their side, making them feel safe. Sometimes you may feel shy or worried about speaking up, but your kindness already says a lot. </p>
            
            <p>When working in a group, you are the listener, the peacemaker, and the heart of the team. You remind everyone that gentle voices can be strong too.</p>
            
            <p>Snowy taught us that kindness is not weakness, but the light that warms everyone's heart.</p>
          
            <p class="signature">Keep glowing, little Snowy. The world feels gentler because of you.</p>
          `;
          foxText.classList.add('snowy-text');
        }
        
        // 设置Snowy的图片
        if (cardFrontImg) cardFrontImg.src = "images/result/snowy.png";
        if (cardBackImg) cardBackImg.src = "images/result/snowy.f.png";
        
        // 设置Snowy的按钮颜色和图标
        if (doItAgainBtn) {
          doItAgainBtn.classList.add('snowy');
          const gif = doItAgainBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/redo4.gif";
        }
        if (viewFoxFriendsBtn) {
          viewFoxFriendsBtn.classList.add('snowy');
          const gif = viewFoxFriendsBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/magic.gif";
        }
        if (openItBtn) {
          openItBtn.classList.add('snowy');
          const gif = openItBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/openit4.gif";
        }
        break;
        
      default:
        // 默认显示Ruby
        if (foxName) {
          foxName.textContent = "Ruby (Red Fox)";
          foxName.classList.add('ruby-name');
        }
        if (foxText) {
          foxText.innerHTML = `
            <p>Ruby is full of energy, confidence, and courage. You enjoy taking action, exploring new ideas, and solving challenges in your own creative way. You are the kind of fox who is always eager to move forward and dares to create.</p>
            
            <p>You enjoy being a leader in a team and often take the first step when others hesitate. When something feels difficult for you, you won't give up easily. Instead, you think quickly and find a way to succeed.</p>
            
            <p>People around you love your bright and positive energy. Sometimes you might feel a little impatient because things are moving slowly, but that's only because you're eager to achieve your goals. Remember, it's okay to slow down and enjoy the journey.</p>
            
            <p>Ruby teaches us that courage is more than just being strong; it means believing in yourself and using your heart to guide others.</p>
          
            <p class="signature">Keep shining, little Ruby. The world feels brighter with you in it.</p>
          `;
          foxText.classList.add('ruby-text');
        }
        
        // 设置默认图片
        if (cardFrontImg) cardFrontImg.src = "images/result/ruby.png";
        if (cardBackImg) cardBackImg.src = "images/result/ruby.f.png";
        
        // 设置默认按钮颜色和图标
        if (doItAgainBtn) {
          doItAgainBtn.classList.add('ruby');
          const gif = doItAgainBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/redo1.gif";
        }
        if (viewFoxFriendsBtn) {
          viewFoxFriendsBtn.classList.add('ruby');
          const gif = viewFoxFriendsBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/magic.gif";
        }
        if (openItBtn) {
          openItBtn.classList.add('ruby');
          const gif = openItBtn.querySelector('.btn-gif');
          if (gif) gif.src = "images/result/openit1.gif";
        }
    }
  }

  // 更新 setupResultButtons 函数
  function setupResultButtons() {
    // Do It Again 按钮 - 刷新页面回到第一题
    const doItAgainBtn = document.querySelector('.do-it-again-btn');
    if (doItAgainBtn) {
      // 移除旧的事件监听器，防止重复绑定
    const newDoItAgainBtn = doItAgainBtn.cloneNode(true);
    doItAgainBtn.parentNode.replaceChild(newDoItAgainBtn, doItAgainBtn);
    
    // 添加新的事件监听器
    newDoItAgainBtn.addEventListener('click', function() {
      console.log("Do It Again button clicked");
      
      // 重置所有状态并重新开始
      userSelections = Array(8).fill(null);
      currentQuestion = 0;
        
        // 隐藏结果页面
        const quizResultSection = document.querySelector('.quiz-result-section');
        if (quizResultSection) {
          quizResultSection.style.display = 'none';
        }
        
        // 重新显示问题内容
      const questionContentWrapper = document.querySelector('.question-content-wrapper');
      const quizDoneWrapper = document.querySelector('.quiz-done-wrapper');
      const quizLoadingWrapper = document.querySelector('.quiz-loading-wrapper');
      
      if (questionContentWrapper) questionContentWrapper.style.display = 'block';
      if (quizDoneWrapper) quizDoneWrapper.style.display = 'none';
      if (quizLoadingWrapper) quizLoadingWrapper.style.display = 'none';
        
        // 重新显示所有隐藏的元素
      const questionTextbox = document.querySelector('.question-text-box');
      const optionsList = document.querySelector('.options-list');
      const optionsDivider = document.querySelector('.options-divider');
      const prevBtn = document.querySelector('.prev-question-btn');
      const nextBtn = document.querySelector('.next-question-btn');
      const langBtn = document.querySelector('.language-switch-btn');
      
      if (questionTextbox) questionTextbox.style.display = 'block';
      if (optionsList) optionsList.style.display = 'flex';
      if (optionsDivider) optionsDivider.style.display = 'block';
      if (prevBtn) prevBtn.style.display = 'none'; // 第一题时隐藏上一题按钮
      if (nextBtn) nextBtn.style.display = 'flex';
      if (langBtn) {
        langBtn.style.display = 'flex';
        langBtn.style.opacity = '1';
      }
      
      // 重置进度条
      const progressFill = document.querySelector('.progress-fill');
      if (progressFill) {
        progressFill.style.width = '12.5%';
      }
      
      // 重置卡片翻转状态
      const cardContainer = document.querySelector('.fox-card-container');
      if (cardContainer) {
        cardContainer.classList.remove('flipped');
      }
      
      // 重置问题和选项
      updateQuestionDisplay();
      
      console.log("Quiz reset successfully");
    });
  }
    
    // View Fox Friends 按钮 - 跳转到FoxFriends页面
  const viewFoxFriendsBtn = document.querySelector('.view-fox-friends-btn');
  if (viewFoxFriendsBtn) {
    // 同样移除旧的事件监听器
    const newViewFoxFriendsBtn = viewFoxFriendsBtn.cloneNode(true);
    viewFoxFriendsBtn.parentNode.replaceChild(newViewFoxFriendsBtn, viewFoxFriendsBtn);
    
    newViewFoxFriendsBtn.addEventListener('click', function() {
      window.location.href = "FoxFriends.html";
    });
  }
    
    // Open It 按钮 - 显示填名字的section
document.querySelectorAll('.open-it-btn').forEach(button => {
  // 克隆按钮以移除旧的事件监听器
  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);
  
  newButton.addEventListener('click', function() {
    // 从按钮的class中获取狐狸类型
    let foxType = 'red-fox'; // 默认值
    
    // 检查按钮属于哪个狐狸类型
    if (this.classList.contains('ruby')) {
      foxType = 'red-fox';
    } else if (this.classList.contains('sunny')) {
      foxType = 'fennec-fox';
    } else if (this.classList.contains('willy')) {
      foxType = 'gray-fox';
    } else if (this.classList.contains('snowy')) {
      foxType = 'arctic-fox';
    } else {
      // 如果没有类名，尝试从localStorage获取
      const userResults = JSON.parse(localStorage.getItem('starkit-quiz-results') || '{}');
      foxType = userResults.fox || 'red-fox';
    }
    
    console.log("Open It clicked, fox type detected:", foxType, "Button classes:", this.classList.toString());
    
    // 隐藏结果页面
    const quizResultSection = document.querySelector('.quiz-result-section');
    if (quizResultSection) {
      quizResultSection.style.display = 'none';
    }
    
    // 显示填名字的section
    showNameInputSection(foxType);
  });
});

}

// 在 showResultPage 函数中确保正确调用 setupResultButtons
function showResultPage(foxType) {
  // 隐藏其他所有页面元素
  const questionContentWrapper = document.querySelector('.question-content-wrapper');
  const quizDoneWrapper = document.querySelector('.quiz-done-wrapper');
  const quizLoadingWrapper = document.querySelector('.quiz-loading-wrapper');
  
  // 隐藏问题内容、完成页面和加载动画
  if (questionContentWrapper) questionContentWrapper.style.display = 'none';
  if (quizDoneWrapper) quizDoneWrapper.style.display = 'none';
  if (quizLoadingWrapper) quizLoadingWrapper.style.display = 'none';
  
  // 显示结果页面
  const quizResultSection = document.querySelector('.quiz-result-section');
  if (quizResultSection) {
    // 根据狐狸类型更新内容
    setFoxResultContent(foxType);
    
    // 显示结果页面
    quizResultSection.style.display = 'block';
    
    // 为结果页面的内容添加入场效果
    const resultContent = quizResultSection.querySelector('.result-content');
    const resultLeft = quizResultSection.querySelector('.result-left');
    const resultRight = quizResultSection.querySelector('.result-right');
    
    // 重置动画状态
    if (resultContent) {
      resultContent.style.opacity = '0';
      resultContent.style.transform = 'translateY(30px)';
    }
    if (resultLeft) {
      resultLeft.style.opacity = '0';
      resultLeft.style.transform = 'translateX(-30px)';
    }
    if (resultRight) {
      resultRight.style.opacity = '0';
      resultRight.style.transform = 'translateX(30px)';
    }
    
    // 应用入场动画
    setTimeout(() => {
      if (resultContent) {
        resultContent.style.transition = 'all 0.8s ease 0.1s';
        resultContent.style.opacity = '1';
        resultContent.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (resultLeft) {
          resultLeft.style.transition = 'all 0.8s ease 0.3s';
          resultLeft.style.opacity = '1';
          resultLeft.style.transform = 'translateX(0)';
        }
        
        if (resultRight) {
          resultRight.style.transition = 'all 0.8s ease 0.5s';
          resultRight.style.opacity = '1';
          resultRight.style.transform = 'translateX(0)';
        }
        
        // 2秒后卡片翻转（毛玻璃框和卡片已经有自己的动画，所以不在这里添加）
        setTimeout(() => {
          const cardContainer = quizResultSection.querySelector('.fox-card-container');
          if (cardContainer) {
            cardContainer.classList.add('flipped');
          }
        }, 2000);
      }, 300);
    }, 100);
    
    // 关键：在结果显示后立即设置按钮事件监听器
    setTimeout(() => {
      setupResultButtons();
    }, 100);
  }
}

// 初始化
function initQuiz() {
  updateQuestionDisplay();
  setupEventListeners();
  // 提前设置结果页面的按钮事件监听器
  setupResultButtons();
  console.log("页面加载完成，开始初始化测验");
console.log("html2canvas可用:", typeof html2canvas);
console.log("下载按钮元素:", document.querySelector('.download-id-btn'));

console.log("设置结果页面按钮事件监听器");
console.log("Open It 按钮:", document.querySelector('.open-it-btn'));

console.log("显示名字输入section，狐狸类型:", foxType);
}


// 显示填名字的section - 只显示输入框
function showNameInputSection(foxType) {
  const nameInputSection = document.querySelector('.name-input-section');
  if (!nameInputSection) return;
  
  // 重置状态：确保每次都是新的
  resetNameInputSection();
  
  // 隐藏结果页面
  const quizResultSection = document.querySelector('.quiz-result-section');
  if (quizResultSection) {
    quizResultSection.style.display = 'none';
  }
  
  // 设置当前狐狸类型
  nameInputSection.dataset.foxType = foxType;
  
  // 根据狐狸类型设置边框颜色和身份卡图片
  setupFoxTypeStyles(foxType);
  
  // 设置当前日期
  setupCurrentDate();
  
  // 显示输入框阶段
  const inputStage = document.getElementById('inputStage');
  const cardStage = document.getElementById('cardStage');
  if (inputStage) inputStage.style.display = 'flex';
  if (cardStage) cardStage.style.display = 'none';
  
  // 显示section
  nameInputSection.style.display = 'block';
  
  // 动画效果
  setTimeout(() => {
    nameInputSection.classList.add('show');
    
    // 清空输入框并聚焦
    const nameInput = document.getElementById('userNameInput');
    if (nameInput) {
      nameInput.value = '';
      setTimeout(() => {
        nameInput.focus();
      }, 300);
    }
  }, 50);
  
  // 设置事件监听器
  setupNameInputSectionEvents(foxType);
}

// 重置名字输入section的状态
function resetNameInputSection() {
  // 清空输入框
  const nameInput = document.getElementById('userNameInput');
  if (nameInput) {
    nameInput.value = '';
  }
  
  // 隐藏卡片预览
  const idCardPreview = document.querySelector('.id-card-preview');
  const cardButtons = document.querySelector('.card-buttons');
  const nameDisplay = document.getElementById('previewNameDisplay');
  const inputStage = document.getElementById('inputStage');
  const cardStage = document.getElementById('cardStage');
  
  if (idCardPreview) idCardPreview.classList.remove('show');
  if (cardButtons) cardButtons.classList.remove('show');
  if (nameDisplay) nameDisplay.classList.remove('show');
  if (inputStage) inputStage.style.display = 'flex';
  if (cardStage) cardStage.style.display = 'none';
  
  // 重置文本显示动画
  const personalityDisplay = document.getElementById('previewPersonalityDisplay');
  const dateDisplay = document.getElementById('previewDateDisplay');
  
  if (personalityDisplay) personalityDisplay.classList.remove('show');
  if (dateDisplay) dateDisplay.classList.remove('show');
}

// 根据狐狸类型设置样式
function setupFoxTypeStyles(foxType) {
  const inputField = document.querySelector('.name-input-field');
  const confirmBtn = document.getElementById('nameConfirmBtn');
  const idCardImage = document.querySelector('.id-card-image');
  const personalityDisplay = document.getElementById('previewPersonalityDisplay');
  const nameDisplay = document.getElementById('previewNameDisplay');
  const dateDisplay = document.getElementById('previewDateDisplay');
  const backToResultBtn = document.querySelector('.back-to-result-btn');
  const downloadBtn = document.querySelector('.download-id-btn');
  const shareBtn = document.querySelector('.share-id-btn');

  // 移除所有元素的所有狐狸类型类
  const elements = [
    inputField, confirmBtn, nameDisplay, personalityDisplay, dateDisplay,
    backToResultBtn, downloadBtn, shareBtn
  ];

  elements.forEach(element => {
    if (element) {
      element.classList.remove('ruby', 'sunny', 'willy', 'snowy');
      element.classList.remove('ruby-border', 'sunny-border', 'willy-border', 'snowy-border');
      element.classList.remove('ruby-text-color', 'sunny-text-color', 'willy-text-color', 'snowy-text-color');
    }
  });
  
  // if (inputField) {
  //   // 移除所有颜色类
  //   inputField.classList.remove('ruby-border', 'sunny-border', 'willy-border', 'snowy-border');
  // }
  
  // if (confirmBtn) {
  //   // 移除所有颜色类
  //   confirmBtn.classList.remove('ruby', 'sunny', 'willy', 'snowy');
  // }

  // 根据狐狸类型设置所有样式
  switch(foxType) {
    case 'red-fox':
      // Ruby
      if (inputField) inputField.classList.add('ruby-border');
      if (confirmBtn) confirmBtn.classList.add('ruby');
      if (backToResultBtn) backToResultBtn.classList.add('ruby');
      if (downloadBtn) downloadBtn.classList.add('ruby');
      if (shareBtn) shareBtn.classList.add('ruby');
      if (nameDisplay) nameDisplay.classList.add('ruby-text-color');
      if (personalityDisplay) personalityDisplay.classList.add('ruby-text-color');
      if (dateDisplay) dateDisplay.classList.add('ruby-text-color');
      if (idCardImage) idCardImage.src = "images/idcard/id.ruby.png";
      if (personalityDisplay) personalityDisplay.textContent = "Brave • Creative • Curious";
      break;
      
    case 'fennec-fox':
      // Sunny
      if (inputField) inputField.classList.add('sunny-border');
      if (confirmBtn) confirmBtn.classList.add('sunny');
      if (backToResultBtn) backToResultBtn.classList.add('sunny');
      if (downloadBtn) downloadBtn.classList.add('sunny');
      if (shareBtn) shareBtn.classList.add('sunny');
      if (nameDisplay) nameDisplay.classList.add('sunny-text-color');
      if (personalityDisplay) personalityDisplay.classList.add('sunny-text-color');
      if (dateDisplay) dateDisplay.classList.add('sunny-text-color');
      if (idCardImage) idCardImage.src = "images/idcard/id.sunny.png";
      if (personalityDisplay) personalityDisplay.textContent = "Cheerful • Friendly • Curious";
      break;
      
    case 'gray-fox':
      // Willy
      if (inputField) inputField.classList.add('willy-border');
      if (confirmBtn) confirmBtn.classList.add('willy');
      if (backToResultBtn) backToResultBtn.classList.add('willy');
      if (downloadBtn) downloadBtn.classList.add('willy');
      if (shareBtn) shareBtn.classList.add('willy');
      if (nameDisplay) nameDisplay.classList.add('willy-text-color');
      if (personalityDisplay) personalityDisplay.classList.add('willy-text-color');
      if (dateDisplay) dateDisplay.classList.add('willy-text-color');
      if (idCardImage) idCardImage.src = "images/idcard/id.willy.png";
      if (personalityDisplay) personalityDisplay.textContent = "Smart • Calm • Independent";
      break;
      
    case 'arctic-fox':
      // Snowy
      if (inputField) inputField.classList.add('snowy-border');
      if (confirmBtn) confirmBtn.classList.add('snowy');
      if (backToResultBtn) backToResultBtn.classList.add('snowy');
      if (downloadBtn) downloadBtn.classList.add('snowy');
      if (shareBtn) shareBtn.classList.add('snowy');
      if (nameDisplay) nameDisplay.classList.add('snowy-text-color');
      if (personalityDisplay) personalityDisplay.classList.add('snowy-text-color');
      if (dateDisplay) dateDisplay.classList.add('snowy-text-color');
      if (idCardImage) idCardImage.src = "images/idcard/id.snowy.png";
      if (personalityDisplay) personalityDisplay.textContent = "Gentle • Patient • Observant";
      break;
      
    default:
      // 默认使用Ruby的样式
      if (inputField) inputField.classList.add('ruby-border');
      if (confirmBtn) confirmBtn.classList.add('ruby');
      if (backToResultBtn) backToResultBtn.classList.add('ruby');
      if (downloadBtn) downloadBtn.classList.add('ruby');
      if (shareBtn) shareBtn.classList.add('ruby');
      if (nameDisplay) nameDisplay.classList.add('ruby-text-color');
      if (personalityDisplay) personalityDisplay.classList.add('ruby-text-color');
      if (dateDisplay) dateDisplay.classList.add('ruby-text-color');
      if (idCardImage) idCardImage.src = "images/idcard/id.ruby.png";
      if (personalityDisplay) personalityDisplay.textContent = "Brave • Creative • Curious";
  }
}

// 设置当前日期
function setupCurrentDate() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const dateDisplay = document.getElementById('previewDateDisplay');
  if (dateDisplay) {
    dateDisplay.textContent = formattedDate;
  }
}

// 设置名字输入section的事件监听器
// 设置名字输入section的事件监听器
function setupNameInputSectionEvents(foxType) {
  // Confirm 按钮
  const confirmBtn = document.getElementById('nameConfirmBtn');
  const nameInput = document.getElementById('userNameInput');
  const inputStage = document.getElementById('inputStage');
  const cardStage = document.getElementById('cardStage');
  
  if (confirmBtn && nameInput && inputStage && cardStage) {
    // 移除旧的事件监听器，防止重复绑定
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    newConfirmBtn.addEventListener('click', function() {
      const userName = nameInput.value.trim();
      
      if (!userName) {
        alert("Please enter your name!");
        return;
      }
      
      // 显示名字
      const previewName = document.getElementById('previewNameDisplay');
      if (previewName) {
        previewName.textContent = userName;
      }
      
      // 切换到卡片显示阶段
      inputStage.style.display = 'none';
      cardStage.style.display = 'flex';
      
      // 显示身份卡预览和按钮（带延迟动画）
      setTimeout(() => {
        const idCardPreview = document.querySelector('.id-card-preview');
        const cardButtons = document.querySelector('.card-buttons');
        const nameDisplay = document.getElementById('previewNameDisplay');
        const personalityDisplay = document.getElementById('previewPersonalityDisplay');
        const dateDisplay = document.getElementById('previewDateDisplay');
        
        if (idCardPreview) idCardPreview.classList.add('show');
        if (cardButtons) cardButtons.classList.add('show');
        if (nameDisplay) nameDisplay.classList.add('show');
        if (personalityDisplay) personalityDisplay.classList.add('show');
        if (dateDisplay) dateDisplay.classList.add('show');
      }, 100);
      
      // 滚动到卡片区域
      setTimeout(() => {
        const idCardPreview = document.querySelector('.id-card-preview');
        if (idCardPreview) {
          idCardPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
      
      // 重要：在卡片显示后再设置下载按钮事件监听器
      setTimeout(() => {
        setupDownloadButton();
      }, 200);
    });
  }
  
  // Back to Result 按钮
  setupBackToResultButton();
}

// 单独设置下载按钮事件监听器
function setupDownloadButton() {
  const downloadBtn = document.querySelector('.download-id-btn');
  const shareBtn = document.querySelector('.share-id-btn');
  
  console.log("设置下载按钮事件监听器...");
  console.log("找到下载按钮:", downloadBtn);
  console.log("找到分享按钮:", shareBtn);
  
  if (downloadBtn) {
    // 移除旧的事件监听器
    const newDownloadBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);
    
    newDownloadBtn.addEventListener('click', function() {
      console.log("下载按钮被点击！");
      
      // 从section的dataset获取狐狸类型
      const nameInputSection = document.querySelector('.name-input-section');
      const foxType = nameInputSection?.dataset.foxType || 'red-fox';
      
      console.log("狐狸类型:", foxType);
      
      // 调用下载函数
      downloadIdentityCard(foxType);
    });
  }
  
  if (shareBtn) {
    // 移除旧的事件监听器
    const newShareBtn = shareBtn.cloneNode(true);
    shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);
    
    newShareBtn.addEventListener('click', function() {
      const nameInputSection = document.querySelector('.name-input-section');
      const foxType = nameInputSection?.dataset.foxType || 'red-fox';
      shareIdentityCard(foxType);
    });
  }
}

// 设置下载和分享功能
function setupDownloadAndShareFunctions(foxType) {
  // 这里不再设置事件监听器，因为会在卡片显示后通过 setupDownloadButton() 设置
  console.log("setupDownloadAndShareFunctions 被调用，狐狸类型:", foxType);
}

// // 下载身份卡功能
// function downloadIdentityCard(foxType) {
//   const userName = document.getElementById('userNameInput')?.value.trim() || "User";
//   const cardImage = document.querySelector('.id-card-image');
  
//   if (cardImage && cardImage.src) {
//     const link = document.createElement('a');
//     link.download = `${userName}_${foxType}_IDCard.png`;
//     link.href = cardImage.src;
//     link.click();
//   }
// }


// 下载身份卡功能 - 简化版本
// 下载身份卡功能 - 绝对能工作
function downloadIdentityCard(foxType) {
  const userName = document.getElementById('userNameInput')?.value.trim() || "User";
  
  // 方法1：先尝试直接下载图片
  const idCardImage = document.querySelector('.id-card-image');
  if (idCardImage && idCardImage.src) {
    try {
      const link = document.createElement('a');
      link.download = `${userName}_starkit_id_card.png`;
      link.href = idCardImage.src;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    } catch (e) {
      console.log("方法1失败，尝试方法2");
    }
  }
  
  // 方法2：使用html2canvas
  const idCardPreview = document.getElementById('idCardPreview');
  if (idCardPreview && typeof html2canvas === 'function') {
    html2canvas(idCardPreview).then(canvas => {
      const link = document.createElement('a');
      link.download = `${userName}_starkit_id_card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  } else {
    alert("无法下载，请截图保存您的身份卡");
  }
}

// 分享身份卡功能
function shareIdentityCard(foxType) {
  const userName = document.getElementById('userNameInput')?.value.trim() || "User";
  const cardImage = document.querySelector('.id-card-image');
  
  if (!cardImage || !cardImage.src) {
    alert("Identity card image not found!");
    return;
  }
  
  // 检查浏览器是否支持Web Share API
  if (navigator.share) {
    // 获取狐狸类型名称
    let foxName = "Fox";
    switch(foxType) {
      case 'red-fox': foxName = "Ruby Fox"; break;
      case 'fennec-fox': foxName = "Sunny Fox"; break;
      case 'gray-fox': foxName = "Willy Fox"; break;
      case 'arctic-fox': foxName = "Snowy Fox"; break;
    }
    
    // 尝试分享
    navigator.share({
      title: `${userName}'s ${foxName} Identity Card`,
      text: `Check out my ${foxName} personality! I'm ${userName}!`,
      url: window.location.href
    })
    .then(() => console.log('Share successful'))
    .catch(error => {
      console.log('Error sharing:', error);
      alert("Your browser doesn't support direct sharing. You can download the image instead!");
    });
  } else {
    alert("Your browser doesn't support direct sharing. You can download the image instead!");
  }
}

// 设置返回结果按钮
function setupBackToResultButton() {
  const backBtn = document.querySelector('.back-to-result-btn');
  
  if (backBtn) {
    // 移除旧的事件监听器
    const newBackBtn = backBtn.cloneNode(true);
    backBtn.parentNode.replaceChild(newBackBtn, backBtn);
    
    newBackBtn.addEventListener('click', function() {
      // 获取当前狐狸类型
      const nameInputSection = document.querySelector('.name-input-section');
      
      // 隐藏名字输入section
      if (nameInputSection) {
        nameInputSection.classList.remove('show');
        setTimeout(() => {
          nameInputSection.style.display = 'none';
        }, 300);
      }
      
      // 显示结果页面
      const quizResultSection = document.querySelector('.quiz-result-section');
      if (quizResultSection) {
        quizResultSection.style.display = 'block';
        
        // 动画效果
        setTimeout(() => {
          quizResultSection.style.opacity = '0';
          quizResultSection.style.transform = 'translateY(30px)';
          quizResultSection.style.transition = 'all 0.8s ease';
          
          requestAnimationFrame(() => {
            quizResultSection.style.opacity = '1';
            quizResultSection.style.transform = 'translateY(0)';
          });
        }, 50);
      }
    });
  }
}

  // 初始化测验
  initQuiz();})