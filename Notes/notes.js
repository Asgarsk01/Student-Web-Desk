document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesContainer = document.getElementById('notesContainer');
    let notes = [];
  
    // Load notes from local storage
    loadNotes();
  
    addNoteBtn.addEventListener('click', function() {
      createNote();
    });
  
    function createNote() {
      const note = document.createElement('div');
      note.classList.add('note');
  
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerHTML = '×';
  
      const textarea = document.createElement('textarea');
      textarea.placeholder = 'Type your note here...';
      
      // Add event listener to save notes when textarea content changes
      textarea.addEventListener('input', saveNotes);
  
      const dateLabel = document.createElement('div');
      dateLabel.classList.add('date-label');
      dateLabel.textContent = getCurrentDate();
  
      note.appendChild(deleteBtn);
      note.appendChild(textarea);
      note.appendChild(dateLabel);
  
      notesContainer.appendChild(note);
  
      makeNoteDeletable(deleteBtn);
  
      // Add note to the array
      notes.push(note);
  
      // Save notes to local storage
      saveNotes();
    }
  
    function makeNoteDeletable(deleteBtn) {
      deleteBtn.addEventListener('click', function() {
        const note = deleteBtn.parentNode;
        note.parentNode.removeChild(note);
  
        // Remove note from the array
        const index = notes.indexOf(note);
        if (index > -1) {
          notes.splice(index, 1);
        }
  
        // Save notes to local storage
        saveNotes();
      });
    }
  
    function getCurrentDate() {
      const currentDate = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return currentDate.toLocaleDateString(undefined, options);
    }
  
    function saveNotes() {
      const notesData = notes.map(function(note) {
        const textarea = note.querySelector('textarea');
        return {
          content: textarea.value,
          top: note.style.top,
          left: note.style.left,
          date: note.querySelector('.date-label').textContent
        };
      });
      localStorage.setItem('notes', JSON.stringify(notesData));
    }
  
    function loadNotes() {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        const notesData = JSON.parse(savedNotes);
        notesData.forEach(function(noteData) {
          const note = document.createElement('div');
          note.classList.add('note');
          note.style.top = noteData.top;
          note.style.left = noteData.left;
  
          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('delete-btn');
          deleteBtn.innerHTML = '×';
  
          const textarea = document.createElement('textarea');
          textarea.value = noteData.content;
          
          // Add event listener to save notes when textarea content changes
          textarea.addEventListener('input', saveNotes);
  
          const dateLabel = document.createElement('div');
          dateLabel.classList.add('date-label');
          dateLabel.textContent = noteData.date;
  
          note.appendChild(deleteBtn);
          note.appendChild(textarea);
          note.appendChild(dateLabel);
  
          notesContainer.appendChild(note);
  
          makeNoteDeletable(deleteBtn);         
  
          // Add note to the array
          notes.push(note);
        });
      }
    }
  });
  