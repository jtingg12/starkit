// ---------------- Navbar Elements ----------------
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navButtons = document.querySelector('.nav-buttons');
const backToTop = document.createElement('button');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.style.display = 'block';
  } else {
    navbar.classList.remove('scrolled');
    backToTop.style.display = 'none';
  }
});

backToTop.id = 'backToTop';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------------- Active Link Logic ----------------
const navItems = document.querySelectorAll('.nav-links li a');
const loginBtn = document.querySelector('.login-btn');

function setActiveNavItem() {
  const currentPage = window.location.pathname.split("/").pop();
  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// ---------------- Toggle Mobile Menu ----------------
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// ---------------- Login Overlay ----------------
const overlay = document.getElementById('overlay');
const openLogin = document.querySelector('.login-btn');
const btn = document.getElementById('login-btn');
const form = document.getElementById('loginForm');
const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const msg = document.getElementById('msg');

if (btn) btn.disabled = true;

// --- 严格保留你的 showMsg 逻辑 ---
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

if (uname) uname.addEventListener('input', showMsg);
if (pass) pass.addEventListener('input', showMsg);

// 修改点击逻辑：如果已登录，点击按钮就是登出；未登录才是弹窗
if (openLogin) {
  openLogin.addEventListener('click', (e) => {
    if (localStorage.getItem('starkit_user')) {
      signOut();
    } else {
      e.preventDefault();
      overlay.classList.add('active');
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

// --- 严格保留你的 Login Click 逻辑，仅增加持久化存储 ---
if (btn) {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = uname.value.trim();
    const password = pass.value.trim();

    if (email && password) {
      msg.innerText = 'Log In successful!';
      msg.style.color = '#008404ff';

      const fakeUser = {
        name: email.split('@')[0],
        email: email,
        picture: 'images/login/fakeuser.png'
      };

      // 统一存入 localStorage
      localStorage.setItem('starkit_user', JSON.stringify(fakeUser));

      setTimeout(() => {
        overlay.classList.remove('active');
        location.reload(); // 刷新以应用状态
      }, 800);
    } else {
      msg.innerText = 'Please fill in all fields!';
      msg.style.color = 'rgb(218,49,49)';
    }
  });
}

// ---------------- Google Login Persistence ----------------
function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(jsonPayload);
}

// Google 回调统一使用 starkit_user 键名存入 localStorage
window.handleCredentialResponse = (response) => {
  const userObject = decodeJwtResponse(response.credential);
  localStorage.setItem('starkit_user', JSON.stringify({
    name: userObject.name,
    picture: userObject.picture
  }));
  location.reload();
};

const googleLoginBtn = document.getElementById('googleLogin');
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    google.accounts.id.prompt(); 
  });
}

// ---------------- 核心修复：检查并更新 UI ----------------
function checkLoginStatus() {
  const userJson = localStorage.getItem('starkit_user');
  const navAvatar = document.getElementById('nav-avatar');
  const loginBtnText = document.querySelector('.login-btn');

  if (userJson) {
    const user = JSON.parse(userJson);
    // 1. Log In 文字变 Logout
    if (loginBtnText) {
      loginBtnText.textContent = 'Log Out';
      loginBtnText.href = "javascript:void(0)";
    }
    // 2. 显示头像 (保留你原本 nav-avatar 的引用)
    if (navAvatar) {
      navAvatar.src = user.picture;
      navAvatar.style.display = 'inline-block';
    }
  } else {
    if (loginBtnText) loginBtnText.textContent = 'Log In';
    if (navAvatar) navAvatar.style.display = 'none';
  }
}

function signOut() {
  if (confirm("Log Out from Starkit?")) {
    // 1. 清除本地存储
    localStorage.removeItem('starkit_user');
    
    // 2. (可选) 告诉 Google 暂时不要自动选择账号，这样下次登录可以选别的 Google 号
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }

    // 3. 刷新页面
    location.reload();
  }
}

// ---------------- 初始化 ----------------
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavItem();
  checkLoginStatus(); // 页面加载自动检查

  // --- 原有逻辑块包起来以防报错 ---
  initCarousel();
  initFAQ();
});

// ---------------- 以下完全是你原本的 Fox Friends, Carousel 和 FAQ 逻辑 ----------------
function initCarousel() {
  const carousel = document.getElementById('stickyCarousel');
  const items = document.querySelectorAll('.sticky-carousel img');
  if (!carousel || items.length === 0) return;
  if (carousel.children.length === items.length) {
    Array.from(items).forEach(item => carousel.appendChild(item.cloneNode(true)));
  }
  const itemWidth = items[0].offsetWidth + 30;
  const move = () => {
    carousel.style.transition = 'transform 20s linear infinite';
    carousel.style.transform = `translateX(-${itemWidth * 10}px)`;
  };
  carousel.addEventListener('mouseenter', () => carousel.style.transition = 'none');
  carousel.addEventListener('mouseleave', move);
  window.addEventListener('resize', move);
  setTimeout(move, 50);
}

function initFAQ() {
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach(question => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
      const icon = question.querySelector(".icon");
      if (icon) icon.textContent = question.classList.contains("active") ? "-" : "▾";
    });
  });
}

