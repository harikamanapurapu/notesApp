
//Notes Component which contains enter notes and added notes along with its timestamp
import React , {useState} from "react";
import './Notes.css';

function Notes({ onNoteSubmit,activeGroup,groupInitials,isVisible,setIsVisible,setShowButton}){
  //Destructuring props passed by the groups component

  //Note text state management for entering the notes
  const [noteText,setNoteText]=useState([]) 

  //Handles the enter button click event when user tries to add a note text in the notes container
  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
  };

  //Handles the submit event When the note entered by the user
  const handleSubmit = () => {
      if (noteText.trim() !== '') {
        onNoteSubmit(noteText);
        setNoteText('');
      }
    };

  //Handles Arrow click which is only available on mobile view manages the states is visible and show button
  const handleArrowClick = () => {
      setIsVisible(false);
      setShowButton(true);
  }
    
  return(
    <div>
      {isVisible && (
      <div   className="add-note-container"        
      style={{
      display:"block", // Display as block for wider screens (web view)
      '@media (max-width: 480px)': {
        display: isVisible ? 'block' : 'none', //for mobile view
      }
      }}>
        <div className="external-note-container">
                    <div className="notes-grp-card" >
                        <p className="arrow" onClick={handleArrowClick}>&#8592;</p> {/*arrow for mobile view */}
                        <button className="notes-grp-btn" style={{backgroundColor:activeGroup.color}} ><span className="groupIconName">{groupInitials}</span></button>
                        <p className="notes-grp-Name">{activeGroup.name}</p>
                      </div>
        </div>
        <div className="note-card">
          {/* notes added card */}
          <ul>
          {activeGroup.notes.map((note)=> (
              <li className="addedNotes" key={note.id}>
                <div className="noteId">
                  <div className="notesTime">{note.timestamp.time}</div>
                  <div className="notesDate">{note.timestamp.date}</div>
                </div>
                  <div className="notesText">{note.text}</div>
              </li>))}
          </ul>
          {/* entering notes area */}
          <form onSubmit={handleSubmit} className="enter-notes">
              <textarea rows="20" col="500" placeholder="Enter your text here......" className="input-card" value={noteText} onKeyPress={handleKeyPress} onChange={(e)=>setNoteText(e.target.value)} />
              <button type="submit" className="enter-btn" ></button>
          </form>
        </div> 
      </div>)}
    </div>
  )
}

export default Notes