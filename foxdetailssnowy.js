document.addEventListener('DOMContentLoaded', function() {
    // 1. 激活 FoxFriends 导航项 (你原有的代码)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const foxFriendsLink = Array.from(navLinks).find(link => 
        link.getAttribute('href') === 'FoxFriends.html' || 
        link.textContent.toLowerCase().includes('fox friends')
    );
    if (foxFriendsLink) {
        foxFriendsLink.classList.add('active');
    }
    
    // --- 2. 英雄区动画控制 ---
    
    const heroElements = document.querySelectorAll('.ruby-name-wrapper, .ruby-halo, .ruby-character-img');
    const rubyName = document.querySelector('.ruby-name-bg');
    const infoCards = document.querySelectorAll('.info-card'); // 获取 Info Cards

    const heroAnimationDuration = 1200; // AOS.init 的持续时间
    
    // Step 1: 触发主角和名字的入场动画 (由 CSS 类名 .fade-in-up 触发)
    heroElements.forEach((el) => {
        el.classList.add('fade-in-up');
    });

    // Step 2: 主角和名字入场动画结束后，启用名字的持续呼吸动画
    setTimeout(() => {
        if (rubyName) {
            rubyName.classList.add('breathing-animation');
        }
    }, heroAnimationDuration); // 1.2s 后启动呼吸动画
    
    
    // Step 3: Info Card 入场后，启用持续悬浮动画
    
    // AOS 动画结束后，再延迟一点时间确保过渡平滑
    const floatStartDelay = heroAnimationDuration + 200; // 1.2s (AOS) + 0.2s 缓冲 = 1.4s

    infoCards.forEach((card) => {
        // 由于你的 HTML 中 Info Card 没有 data-aos-delay，它们会同时入场。
        
        // 我们在 AOS 动画完成之后，开始悬浮动画
        setTimeout(() => {
            // 确保卡片完全入场并停稳后，添加持续悬浮效果
            card.classList.add('float-animation'); 
            
        }, floatStartDelay); 
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // 注册 ScrollTrigger 插件
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. 元素和数据定义 ---
    const sections = gsap.utils.toArray('.detail-section'); // 使用 GSAP 工具获取所有 Section
    const pinContainer = document.getElementById('character-pin-container');
    const characterImg = document.getElementById('ruby-scroll-character');

    // 检查关键元素是否存在
    if (!pinContainer || !characterImg || sections.length === 0) {
        console.error("GSAP ScrollTrigger 初始化失败: 找不到 #character-pin-container, #ruby-scroll-character 或 .detail-section 元素。");
        return; // 阻止代码运行
    }

    // 定义角色数据和左右侧的 X 轴偏移量（相对于视口宽度 vw）
    const characterData = [
        { id: 'personality', imgSrc: 'images/foxfriends/snowy.png', position: 'right' },
        { id: 'strengths', imgSrc: 'images/foxfriends/d4.png', position: 'left' },
        { id: 'growth', imgSrc: 'images/foxfriends/snowy.png', position: 'right' },
        { id: 'notice', imgSrc: 'images/foxfriends/d4.png', position: 'left' },
        { id: 'learn', imgSrc: 'images/foxfriends/snowy.png', position: 'right' },
    ];
    
    // 角色左右侧的偏移量（vw）。正值向右，负值向左。
    const OFFSET_VW = 115; // 距离中心点 25vw

    // 获取 Section 的 X 偏移值 (vw)
    const getXOffset = (position) => position === 'right' ? OFFSET_VW : -OFFSET_VW;

    // --- 2. 初始状态设置 ---
    
    if (characterData.length > 0) {
        const initialOffset = getXOffset(characterData[0].position);
        characterImg.src = characterData[0].imgSrc;
        
        // 使用 GSAP 设置初始位置：opacity=0, x=偏移量vw (这里的 xPercent 是关键)
        gsap.set(characterImg, { 
            xPercent: initialOffset, // 相对于自身宽度进行 x 轴偏移
            opacity: 0,
            x: 0 // 重置 GSAP 对 x 属性的控制，只使用 xPercent
        });
    }

    gsap.to(characterImg, {
        y: -20, // 向上移动 15 像素
        duration: 1,
        ease: "sine.inOut",
        repeat: -1, // 无限重复
        yoyo: true, // 来回播放
        // 注意：这个动画独立于 ScrollTrigger，因此会持续进行
    });


    // --- 3. 创建主时间轴动画 ---
    const masterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".details-content",
            start: "top 50%", 
            end: "bottom bottom", 
            scrub: 1, // 动画与滚动条同步
            // 注意：这里将 pin: true 设为 false，以确保只有角色图片被“固定”在视口中心
            // 因为角色图片位于 position: fixed 的 #character-pin-container 中，所以不需要 pin: true 来固定整个内容。
        }
    });
    
    masterTimeline.set(pinContainer, { opacity: 1 }, 0);

    // 针对每个 Section 创建动画步骤
    sections.forEach((section, index) => {
        const currentData = characterData[index];
        const nextData = characterData[index + 1];
        
        // 角色移动的目标位置 (基于视口宽度)
        const currentOffset = getXOffset(currentData.position);
        
        // ----------------------------------------------------
        // A. Section 入场（角色渐显并停留在当前 Section 的位置）
        // ----------------------------------------------------
        masterTimeline.to(characterImg, {
            xPercent: currentOffset, // 移动到当前 Section 的位置
            opacity: 1,              // 渐显出来
            duration: 1.5,           // 入场动画时间
            ease: "power2.out",
        }, `section-${index}-start`); // 添加标签，方便定位

        // ----------------------------------------------------
        // B. Section 停留（角色保持不动，内容滚动）
        // ----------------------------------------------------
        // 停留一段时间，让用户阅读内容
        masterTimeline.to(characterImg, {
            xPercent: currentOffset,
            duration: 6, // 停留时间（值越大，Section 滚动距离越长）
            ease: "none",
        });
        
        // ----------------------------------------------------
        // C. 角色过渡到下一个 Section 或渐隐
        // ----------------------------------------------------
        if (nextData) {
            const nextOffset = getXOffset(nextData.position);
            const imagePathChange = currentData.imgSrc !== nextData.imgSrc;
            
            // 移动动画（从当前位置到下一个 Section 的位置）
            masterTimeline.to(characterImg, {
                xPercent: nextOffset, // 移动到下一个 Section 的位置
                duration: 1.5,
                ease: "power2.inOut",
                
                // 修正 2：使用 onComplete 和 onReverseComplete 安全地切换图片
                onUpdate: function() {
                    const progress = this.progress(); 
                    
                    // 仅控制渐隐/渐显 (不再在 onUpdate 中切换图片)
                    // 在动画中间点 (progress=0.5) 达到最低透明度
                    const opacityValue = progress < 0.3 ? 
                        1 - progress * 2 : // 0 -> 0.5 时，1 -> 0
                        (progress - 0.3) * 2; // 0.5 -> 1 时，0 -> 1

                    gsap.set(characterImg, { opacity: opacityValue });
                },

                // 修正 2：动画完成后，切换到下一张图片
                onComplete: function() {
                    if (imagePathChange) {
                        characterImg.src = nextData.imgSrc;
                    }
                    // 确保最后是完全可见的 (opacity=1)
                    gsap.set(characterImg, { opacity: 1 }); 
                },

                // 修正 2：动画回滚完成时，切换回上一张图片
                onReverseComplete: function() {
                    if (imagePathChange) {
                        characterImg.src = currentData.imgSrc;
                    }
                    // 确保回滚后是完全可见的 (opacity=1)
                    gsap.set(characterImg, { opacity: 1 }); 
                }

            });
            
        } else {
            // 最后一个 Section：角色渐隐
            masterTimeline.to(characterImg, {
                opacity: 0,
                duration: 1.5,
                ease: "power2.in",
            });
            
            // 最后一个 Section 结束时，隐藏 pinContainer
            masterTimeline.to(pinContainer, { 
                opacity: 0, 
                duration: 0.5,
                ease: "power2.in"
            }, ">-1"); // 在渐隐动画结束前 0.5s 开始隐藏容器
        }
    });

    // 修复 Info Card 动画的 JS 部分（保留原逻辑，但使用 32vw）
    const heroAnimationDuration = 1200; 
    const rubyName = document.querySelector('.ruby-name-bg');
    const infoCards = document.querySelectorAll('.info-card'); 
    const floatStartDelay = heroAnimationDuration + 200; 
    
    setTimeout(() => {
        if (rubyName) {
            rubyName.classList.add('breathing-animation');
        }
        infoCards.forEach((card) => {
            card.classList.add('float-animation'); 
        });
    }, floatStartDelay); 
});


