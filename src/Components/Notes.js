import React , {useState , useEffect} from "react";
import './Notes.css';
import bgimg from './images/notes-img.png'
import lock from './images/lock.png'

function Notes({ groups,groupId, notes=[], onNoteSubmit,activeGroup,groupInitials,isVisible,setIsVisible,setShowButton,isPopupVisible}){

    
    
    const [noteText,setNoteText]=useState([]) 

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSubmit();
        }
    };
    const handleSubmit = () => {
        if (noteText.trim() !== '') {
          onNoteSubmit(noteText);
          setNoteText('');
        }
      };
    const handleArrowClick = () => {
        setIsVisible(false);
        setShowButton(true);
      }
      //if (!activeGroup) {
        //return (
          //<div className="notes-container">
            {/* Render your desired content when the active group is not found */}
            {/* <img src={bgimg} alt="img" className="image"></img>
            <h1 className="notes-heading">Pocket Notes</h1>
            <p className="para">Send and receive messages without keeping your phone online.</p>
            <p className="para2">Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p> 
            <p><img src={lock} alt="lock" className="lock-img"></img><span className="footer">end to end encrypted</span></p> */}
          //</div>
        
        //);
      //}


    return(
              <div  >
                {isVisible && (<div   className="add-note-container"        
                style={{
                display:"block", // Display as block for wider screens (web view)
                '@media (max-width: 480px)': {
                  display: isVisible ? 'block' : 'none', 
                }
              }}>
                <div className="external-note-container">
                            <div className="notes-grp-card" >
                                <p className="arrow" onClick={handleArrowClick}>&#8592;</p>
                                <button className="notes-grp-btn" style={{backgroundColor:activeGroup.color}} ><span className="groupIconName">{groupInitials}</span></button>
                                <p className="notes-grp-Name">{activeGroup.name}</p>
                             </div>
                </div>
                <div className="note-card">
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