document.addEventListener('DOMContentLoaded', function() {
    showNotes();
    const reset = document.querySelector('#button2');
    const button = document.querySelector('#button');

    reset.onclick = function() {
        localStorage.clear();
        document.querySelector('#notes').innerHTML = `<p>Nothing to show! Use "Add Note" button to start adding notes.</p>`;
    }
    
    button.onclick = function() {
        let title = document.querySelector('#title');
        let note = document.querySelector('#note');
        let titles = localStorage.getItem('titles');
        let notes = localStorage.getItem('notes');
        if (titles == null) {
            titlesArr = []
        }
        else titlesArr = JSON.parse(titles);
        if (notes == null) {
            notesArr = [];
        }
        else notesArr = JSON.parse(notes);

        titlesArr.push(title.value);
        notesArr.push(note.value);
        localStorage.titles = JSON.stringify(titlesArr);
        localStorage.notes = JSON.stringify(notesArr);

        showNotes();
    }

    
});


function showNotes() {
    const titles = localStorage.getItem('titles');
    const notes = localStorage.getItem('notes');
    if (titles == null) {
        titlesArr = [];
    }
    else titlesArr = JSON.parse(titles);
    if (notes == null) {
        notesArr = [];
    }
    else notesArr = JSON.parse(notes);

    let html = "";
    notesArr.forEach(function(item, index) {
        html += `<div class="notes"> 
                    <h3>${titlesArr[index]}</h3>
                    <p>${item}</p>
                    <input type="button" value="Delete Note" class="addedNotes" onclick="deleteNote(this.id)">
                </div>`;
    });
    let elements = document.querySelector('#notes');
    if (notesArr.length == 0) {
        elements.innerHTML =  `<p>Nothing to show! Use "Add Note" button to start adding notes.</p>`;
    }
    else {
        elements.innerHTML = html;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null)  notesArr = [];
    else notesArr = JSON.parse(notes);
    notesArr.splice(index, 1);
    localStorage.notes = JSON.stringify(notesArr);
    showNotes();
}