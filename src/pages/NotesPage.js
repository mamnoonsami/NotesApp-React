import React, {useState, useEffect} from 'react'
//import notes from '../assets/data'
import ListItems from '../components/ListItems'
import AddButton from '../components/AddButton'

const NotesPage = () => {
    let [notes, setNotes] = useState([]) //ALWAYTS HAS TO BE ON TOP
    useEffect(() => {
            getNotes()
    }, []) //THIS IS GONNA FIRE UP ON THE FIRST LOAD, BECAUSE IT HAS DEPENDENCY ARRAY

    let getNotes = async() => {
        let response = await fetch('http://localhost:5000/notes') // get the data from the server
        let data = await response.json() //convert the data to JSON format

        setNotes(data) // send the data to useEffect
    }
    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782;Notes</h2>
                <p className="notes-count">{notes.length}</p>
                
            </div>

            <div className="notes-list">
                {notes.map(note => (
                <ListItems note={note}/>
                ))}
            </div>

            <AddButton/>
            
            
        </div>
    )
}

export default NotesPage
