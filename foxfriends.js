// foxfriends.js — Data-driven fox switch + static background/name + moving character layer + intro transition
(function () {
  'use strict';

  /* -----------------------------
     Helpers
  ----------------------------- */
  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function clampIndex(i, n) {
    return (i % n + n) % n;
  }

  /* --- Global Intro Variables --- */
  let skipIntroButton = null;
  let introTimeoutId = null;
  let introSkippedManually = false;
  
  // 最后一个卡片翻转结束时间 (5s)
  const flipEnd = 5000; 
  // 浮动动画额外展示时间 (2s)
  const extraDuration = 2000;
  // 自动切换的总时长 (7s)
  const totalDuration = flipEnd + extraDuration;

  /* -----------------------------
     Intro cards fade-in (optional)
  ----------------------------- */
  function introCardsFadeIn() {
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
      }, index * 350);
    });
  }

  /* -----------------------------
     Page height fix (footer bottom)
  ----------------------------- */
  function checkPageHeight() {
    const body = document.body;
    const html = document.documentElement;
    const nav = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');

    const contentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const windowHeight = window.innerHeight;

    if (contentHeight < windowHeight) {
      const introSection = document.querySelector('.intro-section');
      if (introSection) {
        const navHeight = nav ? nav.offsetHeight : 0;
        const footerHeight = footer ? footer.offsetHeight : 0;
        const neededHeight = windowHeight - navHeight - footerHeight;
        introSection.style.minHeight = neededHeight + 'px';
      }
    }
  }

  /* -----------------------------
     Carousel Data (from HTML data attributes)
  ----------------------------- */
  let realSlides = [];
  let realCount = 0;
  let currentRealIndex = 0;
  let isAnimating = false;

  function getSlideData(idx) {
    const slide = realSlides[idx];
    if (!slide) return null;

    const d = slide.dataset;

    return {
      name: (d.name || '').trim(),                 // ruby
      display: (d.display || '').trim(),           // RUBY
      image: (d.image || '').trim(),               // images/foxfriends/ruby.png
      bg: (d.bg || '').trim(),                     // images/foxfriends/e1.png
      // shadow: (d.shadow || '').trim(),             // ruby-base
      leftClass: (d.leftClass || '').trim(),       // ruby-desc-1
      rightClass: (d.rightClass || '').trim(),     // ruby-desc-2
      buttonColor: (d.buttonColor || '').trim(),   // #D13F00
      descLeft: (d.descLeft || '').trim(),         // html string
      descRight: (d.descRight || '').trim()
    };
  }

  function applyState() {
    if (realCount < 1) return;

    const realIndex = clampIndex(currentRealIndex, realCount);
    const c = getSlideData(realIndex);
    if (!c) return;

    /* ----- STATIC LAYER: background + name (fixed) ----- */
    const bgImage = document.getElementById('staticBgImage');
    const nameText = document.getElementById('staticCharacterName');

    if (bgImage && c.bg) bgImage.src = c.bg;

    if (nameText) {
      nameText.textContent = c.display || (c.name || '').toUpperCase();
      // keep gradient class like ruby-name / snowy-name
      nameText.className = `character-name ${c.name}-name`;
    }

    /* ----- MOVING LAYER: character + shadow + descriptions ----- */
    const mainImg = document.getElementById('mainCharacterImg');
    if (mainImg && c.image) {
      mainImg.src = c.image;
      mainImg.alt = `${c.display || c.name} Character`;
    }

    // const shadow = document.getElementById('mainCharacterShadow');
    // if (shadow) {
    //   // keep base class + specific color class (ruby-base etc.)
    //   shadow.className = `character-base ${c.shadow || ''}`.trim();
    // }

    const shadowImg = document.getElementById('mainCharacterShadow');
    if (shadowImg) {
        let shadowNumber = 0;
        if (c.name === 'ruby') shadowNumber = 1;
        else if (c.name === 'sunny') shadowNumber = 2;
        else if (c.name === 'willy') shadowNumber = 3;
        else if (c.name === 'snowy') shadowNumber = 4;

        if (shadowNumber > 0) {
            // 注意：图片路径必须与您的 HTML 中设置的一致
            shadowImg.src = `images/foxfriends/base${shadowNumber}.png`;
        }
    }

    const leftBox = document.getElementById('descLeft');
    const rightBox = document.getElementById('descRight');
    const leftText = document.getElementById('descLeftText');
    const rightText = document.getElementById('descRightText');

    if (leftBox) leftBox.className = `description-box left ${c.leftClass || ''}`.trim();
    if (rightBox) rightBox.className = `description-box right ${c.rightClass || ''}`.trim();

    if (leftText) leftText.innerHTML = c.descLeft || '';
    if (rightText) rightText.innerHTML = c.descRight || '';

    /* ----- Preview foxes (side) ----- */
    const prevFoxImage = document.getElementById('prevFoxImage');
    const nextFoxImage = document.getElementById('nextFoxImage');

    const prevIndex = clampIndex(realIndex - 1, realCount);
    const nextIndex = clampIndex(realIndex + 1, realCount);

    const prevData = getSlideData(prevIndex);
    const nextData = getSlideData(nextIndex);

    if (prevFoxImage && prevData && prevData.image) prevFoxImage.src = prevData.image;
    if (nextFoxImage && nextData && nextData.image) nextFoxImage.src = nextData.image;

    /* ----- SEE MORE ----- */
    const seeMoreButton = document.getElementById('seeMoreButton');
    if (seeMoreButton) {
      const foxNameCapitalized = c.name.charAt(0).toUpperCase() + c.name.slice(1);
      
      // 目标链接: FoxDetailsRuby.html, FoxDetailsSunny.html, ...
      seeMoreButton.href = `FoxDetails${foxNameCapitalized}.html`;
      
      // 保持原有的按钮颜色设置
      if (c.buttonColor) seeMoreButton.style.setProperty('--accent', c.buttonColor);
    }
  }

  function switchCharacter(characterId) {
    // 角色图片
    var mainCharacterImg = document.getElementById('mainCharacterImg');
    
    // ⭐️ 新增：获取阴影图片元素
    var mainCharacterShadow = document.getElementById('mainCharacterShadow'); 

    // Define the base class for the current character
    var newBaseClass = characterId + '-base';

    // 1. Update main character image and class
    mainCharacterImg.src = characterId + '.png';
    mainCharacterImg.classList.remove('ruby-base', 'sunny-base', 'willy-base', 'snowy-base');
    mainCharacterImg.classList.add(newBaseClass);

    // ⭐️ 2. 更新阴影图片 (根据您的需求：ruby -> base1.png, sunny -> base2.png, ...)
    // var shadowSrc = '';
    
    // if (characterId === 'ruby') {
    //     shadowSrc = 'images/foxfriends/base1.png';
    // } else if (characterId === 'sunny') {
    //     shadowSrc = 'images/foxfriends/base2.png';
    // } else if (characterId === 'willy') {
    //     shadowSrc = 'images/foxfriends/base3.png';
    // } else if (characterId === 'snowy') {
    //     shadowSrc = 'images/foxfriends/base4.png';
    // }
    
    // 应用新的阴影图片源
    // if (mainCharacterShadow && shadowSrc) {
    //     mainCharacterShadow.src = shadowSrc;
    //     // 确保阴影的类也更新（如果需要形状改变）
    //     mainCharacterShadow.classList.remove('ruby-base', 'sunny-base', 'willy-base', 'snowy-base');
    //     mainCharacterShadow.classList.add(newBaseClass);
    // }
    
    // 3. Update character theme (保持不变)
    document.body.className = characterId + '-theme';

    // Update buttons state
    updateCharacterButton(characterId);
}
  
  /* -----------------------------
     Move animation: only moving layer moves
  ----------------------------- */
function runMove(direction /* 'next' | 'prev' */) {
  if (realCount < 2) return;

  const wrap = document.getElementById('characterWrap'); // MUST exist
  if (!wrap) return;

  // 1) Update to the next/prev character FIRST
  currentRealIndex = clampIndex(
    currentRealIndex + (direction === 'next' ? 1 : -1),
    realCount
  );
  applyState();

  // 2) Set start position instantly (no animation)
  wrap.style.transition = 'none';
  wrap.style.transform =
    direction === 'next'
      ? 'translateX(140px)'   // start from RIGHT
      : 'translateX(-140px)'; // start from LEFT

  // 3) Force reflow so browser applies the start position
  void wrap.offsetWidth;

  // 4) Animate back to center
  wrap.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
  wrap.style.transform = 'translateX(0)';
}

  /* -----------------------------
     Init from data-track slides
  ----------------------------- */
  function initFoxFriendsCarousel() {
    const track = document.getElementById('characterCarousel');
    if (!track) return;

    // These are your REAL data slides (no clones needed)
    realSlides = Array.from(track.querySelectorAll('.character-slide'));
    realCount = realSlides.length;

    if (realCount < 1) return;

    currentRealIndex = 0;
    applyState();

    // Buttons
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (prevButton) prevButton.addEventListener('click', () => runMove('prev'));
    if (nextButton) nextButton.addEventListener('click', () => runMove('next'));
  }

  /* -----------------------------
     Skip Intro Button Logic
  ----------------------------- */
  
  function createSkipIntroButton() {
    skipIntroButton = document.createElement('button');
    skipIntroButton.id = 'skipIntroBtn';
    skipIntroButton.textContent = 'Skip Intro →';
    
    // 应用内联样式
    skipIntroButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      padding: 10px 20px;
      background: #2A3792;
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-family: 'Playpen Sans', cursive;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    `;

    // 鼠标悬停效果
    skipIntroButton.addEventListener('mouseenter', () => {
      skipIntroButton.style.background = 'rgba(42, 55, 146, 1)';
      skipIntroButton.style.transform = 'translateY(-2px)';
      skipIntroButton.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });

    skipIntroButton.addEventListener('mouseleave', () => {
      skipIntroButton.style.background = 'rgba(42, 55, 146, 0.9)';
      skipIntroButton.style.transform = 'translateY(0)';
      skipIntroButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });

    // 点击事件
    skipIntroButton.addEventListener('click', skipIntroManually);

    document.body.appendChild(skipIntroButton);
  }

  // 隐藏并移除 Skip Intro 按钮
  function hideSkipIntroButton() {
    if (skipIntroButton) {
      skipIntroButton.style.opacity = '0';
      skipIntroButton.style.visibility = 'hidden';
      // 动画结束后移除元素
      setTimeout(() => {
        if (skipIntroButton && skipIntroButton.parentNode) {
          skipIntroButton.parentNode.removeChild(skipIntroButton);
          skipIntroButton = null;
        }
      }, 300); // 匹配 CSS transition duration
    }
  }

  // 手动跳过 Intro 的核心逻辑
  function skipIntroManually() {
    // 防止重复调用
    if (introSkippedManually) return;
    
    introSkippedManually = true;
    
    const introSection = document.querySelector('.intro-section');
    const foxFriendsSection = document.getElementById('foxFriendsSection');
    
    // 隐藏跳过按钮
    hideSkipIntroButton();

    // 清除自动切换的定时器
    if (introTimeoutId) {
      clearTimeout(introTimeoutId);
      introTimeoutId = null;
    }

    if (introSection && foxFriendsSection) {
      // 1. 立即执行渐隐动画 (使用更快的动画，如 0.8s)
      introSection.style.animation = 'fadeOutIntro 0.8s ease forwards';

      // 2. 隐藏 intro section 并显示 fox friends section
      setTimeout(() => {
        introSection.classList.add('hidden');
        foxFriendsSection.classList.remove('hidden');

        // 3. 初始化 Fox Friends 轮播
        initFoxFriendsCarousel();
      }, 800); // 等待淡出动画结束
    }
  }

  /* -----------------------------
     Intro -> FoxFriends transition
  ----------------------------- */
  function initIntroToFoxFriends() {
    const introSection = document.querySelector('.intro-section');
    const foxFriendsSection = document.getElementById('foxFriendsSection');

    if (introSection && foxFriendsSection) {
      // 1. 创建 Skip Intro 按钮
      createSkipIntroButton();
      
      // 2. 设置自动切换的定时器
      introTimeoutId = window.setTimeout(() => {
        // 只有在用户没有手动跳过时才执行自动切换
        if (!introSkippedManually) {
          // 渐隐 intro section
          introSection.style.animation = 'fadeOutIntro 1s ease forwards';
          
          // 自动切换时，隐藏 Skip Intro 按钮
          hideSkipIntroButton();
          
          window.setTimeout(() => {
            introSection.classList.add('hidden');
            foxFriendsSection.classList.remove('hidden');
            initFoxFriendsCarousel();
          }, 1000); // 等待淡出动画 (1s) 结束
        }
      }, totalDuration);

    } else if (foxFriendsSection) {
      // direct open FoxFriends section
      foxFriendsSection.classList.remove('hidden');
      initFoxFriendsCarousel();
    }
  }

  /* -----------------------------
     Boot
  ----------------------------- */
  window.addEventListener('load', () => {
    introCardsFadeIn();
    checkPageHeight();
    initIntroToFoxFriends();
  });

  window.addEventListener('resize', checkPageHeight);
  
  // 确保页面清理时也清理定时器
  window.addEventListener('beforeunload', () => {
    if (introTimeoutId) {
      clearTimeout(introTimeoutId);
    }
  });

})();
