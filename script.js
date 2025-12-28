// ---------------- Navbar & UI Elements ----------------
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navButtons = document.querySelector('.nav-buttons');
const backToTop = document.createElement('button');

// Navbar Scroll Logic
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

// ---------------- Login Overlay & Fake User Logic ----------------
const overlay = document.getElementById('overlay');
const openLogin = document.querySelector('.login-btn');
const btn = document.getElementById('login-btn');
const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const msg = document.getElementById('msg');

if (btn) btn.disabled = true;

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

// 点击导航栏 Login/Logout 按钮
if (openLogin) {
  openLogin.addEventListener('click', (e) => {
    if (localStorage.getItem('starkit_user')) {
      // 如果已经登录，点击就是 Logout
      signOut();
    } else {
      // 没登录，显示弹窗
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

// Fake User 登录逻辑
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
        picture: 'images/login/fakeuser.png'
      };

      localStorage.setItem('starkit_user', JSON.stringify(fakeUser));

      setTimeout(() => {
        overlay.classList.remove('active');
        location.reload(); 
      }, 800);
    } else {
      msg.innerText = 'Please fill in all fields!';
      msg.style.color = 'rgb(218,49,49)';
    }
  });
}

// ---------------- Google Login Logic ----------------
function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(jsonPayload);
}

// Google 登录成功的回调
window.handleCredentialResponse = (response) => {
  const userObject = decodeJwtResponse(response.credential);
  
  // 同样存入 starkit_user，格式和 Fake User 保持一致
  localStorage.setItem('starkit_user', JSON.stringify({
    name: userObject.name,
    picture: userObject.picture // 这是 Google 提供的头像 URL
  }));
  
  location.reload(); 
};

// 弹窗里的 Google 按钮点击
const googleLoginBtn = document.getElementById('googleLogin');
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    google.accounts.id.prompt(); // 弹出 Google 选择框
  });
}

// ---------------- 核心：UI 状态管理 ----------------
function checkLoginStatus() {
  const userJson = localStorage.getItem('starkit_user');
  const navAvatar = document.getElementById('nav-avatar');
  const loginBtnText = document.querySelector('.login-btn');

  if (userJson) {
    const user = JSON.parse(userJson);
    // 登录后：文字变 Log Out，显示头像
    if (loginBtnText) {
      loginBtnText.textContent = 'Log Out';
      loginBtnText.href = "javascript:void(0)";
    }
    if (navAvatar) {
      navAvatar.src = user.picture;
      navAvatar.style.display = 'inline-block';
    }
  } else {
    // 登出后：文字变 Log In，隐藏头像
    if (loginBtnText) loginBtnText.textContent = 'Log In';
    if (navAvatar) navAvatar.style.display = 'none';
  }
}

function signOut() {
  if (confirm("Log Out from Starkit?")) {
    localStorage.removeItem('starkit_user');
    
    // 让 Google 账户下次可以重新被选择
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }
    
    location.reload();
  }
}

// ---------------- 初始化 ----------------
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavItem();
  checkLoginStatus(); 

  initCarousel();
  initFAQ();
});

// ---------------- 原有的 FAQ & Carousel ----------------
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
  questions.forEach(q => {
    q.addEventListener("click", () => {
      q.classList.toggle("active");
      const icon = q.querySelector(".icon");
      if (icon) icon.textContent = q.classList.contains("active") ? "-" : "▾";
    });
  });
}
