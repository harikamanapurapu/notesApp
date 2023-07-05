import React from "react";
import { useState , useEffect } from "react";
import './Groups.css'
import Notes from "./Notes";
import bgimg from './images/notes-img.png'
import lock from './images/lock.png'


function Groups({groups,setGroups,isPopupVisible,setIsPopUpVisible}){

    // const [groups,setGroups]=useState(localStorage.groups ? JSON.parse(localStorage.groups) : [])
    // const [isPopUpVisible,setIsPopUpVisible]=useState(false)
    const [activeGroupId, setActiveGroupId] = useState(null);
    // const [groupName, setGroupName] = useState('');
    // const [groupColor, setGroupColor] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [showButton, setShowButton] = useState(true);

    
    // Save groups to local storage when groups state changes
    useEffect(() => {
        localStorage.setItem("groups", JSON.stringify(groups));
    }, [groups]);

    
    //     const createGroup = () => {
    //     setIsPopUpVisible(false);
    //     if(groupName!= ""){
    //     const newGroup = {
    //       id: Date.now(),
    //       name: groupName,
    //       color: groupColor,
    //       notes: []
    //     };
    //     setGroups([...groups, newGroup]);
        
    //      } };
    
    //   const handleGrpNameChange = (e) => {
    //     setGroupName(e.target.value);
    //   };
    
    //   const handleChangeColor = (color) => {
    //     setGroupColor(color);
    //   };

      const handleGroupClick = (groupId) => {
        setActiveGroupId(groupId);
        setIsVisible(true);
        if(window.innerWidth>768){
          setShowButton(true)
        }
        else{
          setShowButton(false)
        }
      };

    //   useEffect(() => {
    //     if (groups.length > 0 && !activeGroupId) {
    //       setActiveGroupId(groups[0].id);
    //     }
    //   }, [groups]);
    const getTimeStamp = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const formattedTime = time.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      return {time:`${formattedTime}` , date:`${day} ${month} ${year}`};
    }

      const handleNoteSubmit = (noteText) => {
        if (activeGroupId) {
          const updatedGroups = groups.map((group) => {
            if (group.id === activeGroupId) {
              const newNote = {
                id: Date.now(),
                text: noteText,
                timestamp: getTimeStamp()
              };
              return {
                ...group,
                notes: [...group.notes, newNote]
              };
            }
            return group;
          });
          setGroups(updatedGroups);
        }
      };
      const activeGroup = groups.find((group) => group.id === activeGroupId);
      const getGroupInitials = (groupName) => {
        const initials = groupName
          .trim()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase())
          .join('');
        return initials.slice(0, 2);
      };
      
      
    return(
       <div>
            {showButton &&<div id="grpsBox">
              <div className="groups-container">
                <h1 className="name">Pocket Notes</h1>
                <button className="creating-group-btn" onClick={()=>setIsPopUpVisible(true)}>+ Create Notes group</button>
                <div className="groupNamesContainer">    
                    {groups.map((group)=> (
                        < div key={group.id} className={`grp-card ${activeGroupId === group.id ? 'active' : ''}`} onClick={() => handleGroupClick(group.id)}>
                            <button className="grp-btn" style={{ backgroundColor: group.color }}>
                            {group.name.trim().split(' ').map((word, index) => (
                                <span key={index} className="groupIconName">
                                {index === 0 && word.charAt(0).toUpperCase()}
                                {index === 1 && word.charAt(0).toUpperCase()}
                                </span>
                            ))}
                            </button>
                            <p className="grp-Name">{group.name}</p>
                        </div>
                    ) )}
                </div>
              </div>
            </div>}
            {/*{selectedGrp &&
             <div className="add-note-container">
                <div className="external-note-container">
                        {groups.map((group)=> (
                            <div key={group.id} className="notes-grp-card">
                                <button className="notes-grp-btn" style={{backgroundColor:group.color}} onClick={()=>clickHandler(group.id)}></button>
                                <p className="notes-grp-Name">{group.name}</p>
                             </div>
                         ) )}
                </div>
                <div className="note-card">
                    <ul>
                    {notes.map((note)=> (
                        <li className="addedNotes" key={note.id}>
                            <div className="notesId">{note.createdAt}</div>
                            <div className="notesText">{note.text}</div>
                        </li>))}
                    </ul>
                    <div className="enter-notes">
                        <textarea rows="20" col="500" placeholder="Enter your text here..." className="input-card" onKeyPress={handleKeyPress} onChange={handleInputChange} />
                        <button className="enter-btn" onClick={addNoteHandler}></button>
                    </div>
                </div>
            </div>}

            {closeDescription && 
                <div className="notes-container">
                    <img src={bgimg} alt="img" className="image"></img>
                    <h1 className="notes-heading">Pocket Notes</h1>
                    <p className="para">Send and receive messages without keeping your phone online.</p>
                    <p className="para2">Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p> 
                    <p><img src={lock} alt="lock" className="lock-img"></img><span className="footer">end to end encrypted</span></p>  
                </div>
            }*/}
            {/* {isPopUpVisible && 
                <div className="pop-up-container">
                    <h1 className="popup-header">Create New Notes group </h1>
                    <label for="grpNameINput" className="label">Group Name</label>
                    <input type="text" placeholder="Enter your group name..." id="grpNameInput" name="name" value={groupName} onChange={handleGrpNameChange} />
                    <p className="color-choose">Choose colour</p>
                    <button onClick={()=>handleChangeColor('#B38BFA')} className="btn1"></button>
                    <button onClick={()=>handleChangeColor('#FF79F2')} className="btn2"></button>
                    <button onClick={()=>handleChangeColor('#43E6FC')} className="btn3"></button>
                    <button onClick={()=>handleChangeColor('#F19576')} className="btn4"></button>
                    <button onClick={()=>handleChangeColor('#0047FF')} className="btn5"></button>
                    <button onClick={()=>handleChangeColor(' #6691FF')} className="btn6"></button>
                    <button className="create-btn" onClick={createGroup}>Create</button>
                </div>} */}
                {(groups.length === 0 || !activeGroup)&&
                  <div className="notes-container">
                    <img src={bgimg} alt="img" className="image"></img>
                    <h1 className="notes-heading">Pocket Notes</h1>
                    <p className="para">Send and receive messages without keeping your phone online.</p>
                    <p className="para2">Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p> 
                    <p><img src={lock} alt="lock" className="lock-img"></img><span className="footer">end-to-end encrypted</span></p>    
                </div>}
                {activeGroupId && (
                    <Notes
                    groups={groups}
                    groupId={activeGroupId}
                    notes={groups.find((group) => group.id === activeGroupId).notes}
                    groupInitials={getGroupInitials(groups.find((group) => group.id === activeGroupId).name)}
                    activeGroup={activeGroup}
                    onNoteSubmit={handleNoteSubmit}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    setShowButton={setShowButton}
                    isPopupVisible={isPopupVisible}
                    />
                )}
      </div>
    )
}

export default Groups