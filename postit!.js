// Test代码中的JavaScript - 添加localStorage功能
document.addEventListener('DOMContentLoaded', function() {
  const addNoteButton = document.getElementById('addNoteButton');
  const addNoteModal = document.getElementById('addNoteModal');
  const cancelNoteButton = document.getElementById('cancelNoteButton');
  const noteForm = document.getElementById('noteForm');
  const designOptions = document.querySelectorAll('.design-option');
  const noteDesignInput = document.getElementById('noteDesign');
  const notesContainer = document.getElementById('notes-container');

  // 预先渲染模态框但隐藏（解决第一次点击延迟问题）
  addNoteModal.style.display = 'none';
  addNoteModal.classList.remove('show-modal');
  
  // 强制浏览器预先渲染模态框
  setTimeout(() => {
    addNoteModal.style.visibility = 'hidden';
    addNoteModal.style.display = 'flex';
    addNoteModal.offsetHeight; // 触发重排，确保渲染
    addNoteModal.style.display = 'none';
    addNoteModal.style.visibility = 'visible';
  }, 100);

  if (designOptions[0]) {
    designOptions[0].classList.add('design-selected');
    noteDesignInput.value = designOptions[0].dataset.design;
  }

  designOptions.forEach(opt => {
    opt.addEventListener('click', function() {
      designOptions.forEach(o => o.classList.remove('design-selected'));
      this.classList.add('design-selected');
      noteDesignInput.value = this.dataset.design;
    });
  });

  addNoteButton.addEventListener('click', () => {
    // 使用requestAnimationFrame确保动画在下一帧开始
    requestAnimationFrame(() => {
      addNoteModal.style.display = 'flex';
      // 强制重排，确保CSS动画触发
      addNoteModal.offsetHeight;
      addNoteModal.classList.add('show-modal');
      addNoteModal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('modal-open');
    });
  });

  function closeModal() {
    addNoteModal.classList.remove('show-modal');
    // 等待动画完成再隐藏
    setTimeout(() => {
      addNoteModal.style.display = 'none';
      addNoteModal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('modal-open');
      noteForm.reset();
      designOptions.forEach((o,i) => {
        o.classList.remove('design-selected');
        if (i===0) { 
          o.classList.add('design-selected'); 
          noteDesignInput.value = o.dataset.design; 
        }
      });
    }, 150); // 匹配动画持续时间
  }
  
  cancelNoteButton.addEventListener('click', closeModal);

  // 点击模态框外部关闭
  addNoteModal.addEventListener('click', function(e) {
    if (e.target === addNoteModal) {
      closeModal();
    }
  });

  noteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const design = noteDesignInput.value || (designOptions[0] && designOptions[0].dataset.design);

    if (!title) {
      alert('Please enter a title for your note!');
      return;
    }

    createStickyNote(title, content, design);
    saveNoteToStorage(title, content, design); // 保存到localStorage
    closeModal();
  });

  // 保存便签到localStorage
  function saveNoteToStorage(title, content, design) {
    const notes = getNotesFromStorage();
    const newNote = {
      id: Date.now(), // 使用时间戳作为唯一ID
      title: title,
      content: content,
      design: design,
      date: new Date().toISOString()
    };
    
    notes.push(newNote);
    localStorage.setItem('starkit_notes', JSON.stringify(notes));
  }

  // 从localStorage获取所有便签
  function getNotesFromStorage() {
    const notesJson = localStorage.getItem('starkit_notes');
    return notesJson ? JSON.parse(notesJson) : [];
  }

  // 从localStorage删除便签
  function deleteNoteFromStorage(noteId) {
    const notes = getNotesFromStorage();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('starkit_notes', JSON.stringify(updatedNotes));
  }

  // 创建便签并添加到页面
  function createStickyNote(title, content, design, noteId = null) {
    const rotations = ['rotate-1', 'rotate-2', 'rotate-3'];
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];

    const note = document.createElement('div');
    note.className = `sticky-note ${randomRotation}`;
    note.style.backgroundImage = `url("${design}")`;
    note.style.opacity = '0'; // 初始透明
    note.style.transform = 'scale(0.8)'; // 初始缩小
    
    // 添加data-id属性用于标识
    if (noteId) {
      note.dataset.id = noteId;
    } else {
      note.dataset.id = Date.now();
    }

    note.innerHTML = `
      <div class="note-controls">
        <button class="delete-note" title="Delete note" aria-label="Delete note"><i class="fas fa-trash"></i></button>
      </div>
      <div class="note-inner">
        <h3 class="note-title">${escapeHtml(title)}</h3>
        <div class="note-body">${escapeHtml(content)}</div>
      </div>
    `;

    // 添加便签入场动画
    requestAnimationFrame(() => {
      note.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      note.style.opacity = '1';
      note.style.transform = 'scale(1)';
    });

    // 删除按钮事件
    const deleteBtn = note.querySelector('.delete-note');
    deleteBtn.addEventListener('click', function(ev) {
      ev.stopPropagation();
      if (confirm('Are you sure you want to delete this note?')) {
        const idToDelete = parseInt(note.dataset.id);
        
        // 从localStorage删除
        deleteNoteFromStorage(idToDelete);
        
        // 从页面删除
        note.style.transition = 'transform .2s ease, opacity .2s ease';
        note.style.opacity = '0';
        note.style.transform += ' scale(.9)';
        setTimeout(() => note.remove(), 180);
      }
    });

    notesContainer.appendChild(note);
    return note;
  }

  function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#039;')
      .replaceAll('\n','<br>');
  }

  // 预先加载图片，避免延迟
  const imagesToPreload = [
    'images/postit!/sticky1.png',
    'images/postit!/sticky2.png',
    'images/postit!/sticky3.png',
    'images/postit!/sticky4.png'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // 页面加载时从localStorage恢复便签
  function loadNotesFromStorage() {
    const notes = getNotesFromStorage();
    
    // 如果没有保存的便签，创建默认便签
    if (notes.length === 0) {
      createStickyNote(
        'Hey Fox Friend!',
        'Click the + button to create a new sticky note.',
        'images/postit!/sticky.png'
      );
      // 保存默认便签到localStorage
      saveNoteToStorage(
        'Hey Fox Friend!',
        'Click the + button to create a new sticky note.',
        'images/postit!/sticky.png'
      );
    } else {
      // 加载所有保存的便签
      notes.forEach(note => {
        createStickyNote(note.title, note.content, note.design, note.id);
      });
    }
  }

  // 页面加载时加载便签
  loadNotesFromStorage();

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (addNoteModal.classList.contains('show-modal')) closeModal();
    }
  });

  // 添加清除所有便签的功能（可选，用于调试）
  // window.clearAllNotes = function() {
  //   if (confirm('Are you sure you want to delete ALL notes?')) {
  //     localStorage.removeItem('starkit_notes');
  //     notesContainer.innerHTML = '';
  //     loadNotesFromStorage(); // 重新加载默认便签
  //   }
  // };
});