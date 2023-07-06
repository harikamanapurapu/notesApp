//Groups Component which consists the side bar for the groups created by the user

import React from "react";
import { useState , useEffect } from "react";
import './Groups.css'
import Notes from "./Notes";
import bgimg from './images/notes-img.png'
import lock from './images/lock.png'


function Groups({groups,setGroups,setIsPopUpVisible}){

    //active group Id handles the group which is active
    const [activeGroupId, setActiveGroupId] = useState(null);
    //Isvisible and showbutton handles the mobile view to set display properties in react
    const [isVisible, setIsVisible] = useState(false);
    const [showButton, setShowButton] = useState(true);

    
    // Save groups to local storage when groups state changes
    useEffect(() => {
        localStorage.setItem("groups", JSON.stringify(groups));
    }, [groups]);

    //Handles the click when the group name is clicked, sets to active and opens its respective notes and handles mobile view too.
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

    //Gets time stamp when notes is added to the notes container
    const getTimeStamp = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const formattedTime = time.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      return {time:`${formattedTime}` , date:`${day} ${month} ${year}`};
    }

    //updates the active group Id with the respective notes container
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

    //finds the active group and Sets the active group with the respective group id
    const activeGroup = groups.find((group) => group.id === activeGroupId);

    //Group Initials are the group name start letters
    const getGroupInitials = (groupName) => {
      const initials = groupName
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
      return initials.slice(0, 2);
    };
      
      
    return(
      // The main groups Container which handles groups name and  color and the initials includes mobile view with state showbutton
       <div>
          {showButton &&
          <div id="grpsBox">
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

          {/* When there is no active group or groups are not created yet then this container will be displayed */}
          {(groups.length === 0 || !activeGroup)&&
            <div className="notes-container">
              <img src={bgimg} alt="img" className="image"></img>
              <h1 className="notes-heading">Pocket Notes</h1>
              <p className="para">Send and receive messages without keeping your phone online.</p>
              <p className="para2">Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p> 
              <p><img src={lock} alt="lock" className="lock-img"></img><span className="footer">end-to-end encrypted</span></p>    
          </div>}

          {/* Passing props to notes component and if activeGroup is there then only the respective notes will be opened   */}
          {activeGroupId && (
              <Notes
              groupInitials={getGroupInitials(groups.find((group) => group.id === activeGroupId).name)}
              activeGroup={activeGroup}
              onNoteSubmit={handleNoteSubmit}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              setShowButton={setShowButton}
              />
          )}
      </div>
    )
}

export default Groups