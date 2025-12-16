// ---------------- Navbar Elements ----------------
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navButtons = document.querySelector('.nav-buttons');
const backToTop = document.createElement('button');

// Navbar shadow + Back to top
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.style.display = 'block';
  } 
  else {
    navbar.classList.remove('scrolled');
    backToTop.style.display = 'none';
  }
});

// Create Back to Top button
backToTop.id = 'backToTop';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

// Smooth scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------------- Active Link Logic ----------------
const navItems = document.querySelectorAll('.nav-links li a');
const quizBtn = document.querySelector('.quiz-btn');
const loginBtn = document.querySelector('.login-btn');

// Automatically set the active state when the page loads
function setActiveNavItem() {
  const currentPage = window.location.pathname.split("/").pop();
  console.log('Current page:', currentPage);
  
  // Remove all active classes
  navItems.forEach(link => {
    link.classList.remove("active");
  });
  
  // Set active based on the current page
  navItems.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
}

// Execute when page loads
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavItem();
});

// ---------------- Toggle Mobile Menu ----------------
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navButtons.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// ---------------- Login Overlay ----------------
const overlay = document.getElementById('overlay');
const openLogin = document.querySelector('.login-btn');
const btn = document.getElementById('login-btn');
const form = document.getElementById('loginForm');
const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const msg = document.getElementById('msg');

btn.disabled = true;

uname.addEventListener('input', showMsg);
pass.addEventListener('input', showMsg);

openLogin.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

function showMsg() {
  const isEmpty = uname.value === '' || pass.value === '';
  btn.classList.toggle('no-shift', !isEmpty);

  if (isEmpty) {
    btn.disabled = true;
    msg.style.color = 'rgb(218,49,49)';
    msg.style.fontSize = '14px';
    msg.innerText = 'Please fill the input fields before proceeding~';
  } else {
    msg.innerText = 'Great! Now you can proceed~';
    msg.style.color = '#ffb457';
    btn.disabled = false;
    btn.classList.add('no-shift');
  }
}

// Actions performed when “Log In” is clicked
btn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = uname.value.trim();
  const password = pass.value.trim();

  if (email && password) {
    // Simulated login successful
    msg.innerText = 'Login successful!';
    msg.style.color = '#008404ff';

    // Simulated storage users
    const fakeUser = {
      name: email.split('@')[0],
      email: email,
      picture: 'images/login/fakeuser.png'
    };

    localStorage.setItem('starkit_user', JSON.stringify(fakeUser));

    // Update navigation bar avatar
    const navAvatar = document.getElementById('nav-avatar');
    navAvatar.src = fakeUser.picture;
    navAvatar.style.display = 'inline-block';

    // Close login pop-up
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 800);
  } 
  
  else {
    msg.innerText = 'Please fill in all fields!';
    msg.style.color = 'rgb(218,49,49)';
  }
});

// =============== GOOGLE DECODE TOKEN ===============
function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// =============== GOOGLE CALLBACK (MAIN) ===============
window.handleCredentialResponse = (response) => {
  const userObject = decodeJwtResponse(response.credential);
  console.log("Google Login Success:", userObject);

  // Save user
  sessionStorage.setItem('loggedInUser', JSON.stringify(userObject));

  // 2. 更新页面 UI
  updateLoginUI(userObject);

  // Show avatar
  const navAvatar = document.getElementById("nav-avatar");
  navAvatar.src = payload.picture;
  navAvatar.style.display = "inline-block";

  // Close login popup
  overlay.classList.remove("active");
};

// 登出函数：清除 sessionStorage 中的数据
window.signOut = () => {
  // 1. 从 sessionStorage 中移除用户数据
  sessionStorage.removeItem('loggedInUser');
  
  // 2. 更新页面 UI 为登出状态
  updateLoginUI(null); 
  
  // 3. (可选) 阻止 Google 自动再次选择账户
  if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
    google.accounts.id.disableAutoSelect();
  }
};

// ---------------- Google Sign-In ----------------
const googleLoginBtn = document.getElementById('googleLogin');
googleLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  google.accounts.id.prompt(); // Trigger Google login window
})

// UI 更新函数：根据登录状态显示或隐藏元素
function updateLoginUI(user) {
  // 假设这些元素在您的所有页面中都存在
  const g_id_onload = document.getElementById('g_id_onload'); // Google One-Tap 容器
  const userInfoContainer = document.getElementById('user-info'); // 隐藏的用户信息 div
  const navLoginButton = document.querySelector('.nav-buttons .login-btn'); // 导航栏中的 Login 链接
  
  if (user) {
    // 登录状态
    
    // 隐藏 Google 登录按钮/One-Tap 容器
    if (g_id_onload) {
      g_id_onload.style.display = 'none'; 
      // 还需要取消 Google 的 One-Tap 提示
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.cancel();
      }
    }
    
    // 显示并更新用户信息
    if (userInfoContainer) {
      document.getElementById('avatar').src = user.picture;
      document.getElementById('name').textContent = `Hello, ${user.name}!`;
      // document.getElementById('email').textContent = user.email; // 邮箱可以省略
      userInfoContainer.style.display = 'block'; 
    }

    // 将导航栏的 Login 按钮改为 Logout 按钮
    if (navLoginButton) {
        navLoginButton.textContent = 'Logout';
        navLoginButton.onclick = window.signOut; // 设置点击事件为登出
        navLoginButton.href = 'javascript:void(0)'; // 阻止默认跳转
    }

  } else {
    // 登出状态
    
    // 显示 Google 登录按钮/One-Tap 容器
    if (g_id_onload) {
      g_id_onload.style.display = 'block'; 
    }
    
    // 隐藏用户信息
    if (userInfoContainer) {
      userInfoContainer.style.display = 'none'; 
    }

    // 将导航栏的 Logout 按钮改回 Login 按钮
    if (navLoginButton) {
        navLoginButton.textContent = 'Login';
        navLoginButton.onclick = null; // 移除登出事件
        navLoginButton.href = '#'; 
    }
  }
}

// 检查登录状态：在每个页面加载时运行
function checkLoginStatus() {
  const userJson = sessionStorage.getItem('loggedInUser');
  if (userJson) {
    const user = JSON.parse(userJson);
    updateLoginUI(user);
  } else {
    updateLoginUI(null);
  }
}

// 确保在 DOM 内容加载后立即运行检查登录状态的函数
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// --- End of Login Persistence Logic (Suggested Fix) ---

// Fox Friends Cards Animation
document.addEventListener('DOMContentLoaded', function() {
  // Add click effect to individual cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      // Add a temporary animation class
      this.style.transform = this.style.transform + ' scale(0.95)';
      setTimeout(() => {
        this.style.transform = this.style.transform.replace(' scale(0.95)', '');
      }, 300);
    });
  });
});

// Sticky Notes Carousel 
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('stickyCarousel');
  const items = document.querySelectorAll('.sticky-carousel img');
  
  if (items.length === 0) return;
  
  function duplicateItems() {
    const originalItems = Array.from(items);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
    });
  }
  
  // Initialization
  duplicateItems();
  
  const itemWidth = items[0].offsetWidth + 30; // Image width + gap
  let animation;
  
  function startAnimation() {
    // Reset position
    carousel.style.transform = 'translateX(0)';
    carousel.style.transition = 'none';
    
    // Start animation
    setTimeout(() => {
      carousel.style.transition = 'transform 20s linear infinite';
      carousel.style.transform = `translateX(-${itemWidth * 10}px)`; 
    }, 50);
  }
  
  function stopAnimation() {
    carousel.style.transition = 'none';
  }
  
  function resumeAnimation() {
    carousel.style.transition = 'transform 20s linear infinite';
    carousel.style.transform = `translateX(-${itemWidth * 10}px)`;
  }
  
  // Mouse hover control
  carousel.addEventListener('mouseenter', stopAnimation);
  carousel.addEventListener('mouseleave', resumeAnimation);
  
  // Responsive processing
  function handleResize() {
    const newItemWidth = items[0].offsetWidth + 30;
    if (newItemWidth !== itemWidth) {
      stopAnimation();
      setTimeout(startAnimation, 100);
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Start animation
  startAnimation();
});

//FAQs
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");
  
  questions.forEach(question => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
      const icon = question.querySelector(".icon");
      icon.textContent = question.classList.contains("active") ? "-" : "▾";
    });
  });
});