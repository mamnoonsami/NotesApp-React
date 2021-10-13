import { getNodeText } from '@testing-library/react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

//import notes from '../assets/data'

const Note = ({match, history}) => {
    let noteId = match.params.id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async() => {
        if(noteId === 'new') return
       let response =  await fetch(`http://localhost:5000/notes/${noteId}`)
       let data = await response.json()
       setNote(data)
    }
    //let note = notes.find(note => note.id == noteId)

    let updateNote = async() => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method: "PUT",
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    } 

    let createNote = async() => {
        await fetch(`http://localhost:5000/notes/`, {
            method: "POST",
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    } 

    let deleteNote =  async () => {
        await fetch(`http://localhost:5000/notes/${noteId}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }

    let handleSubmit = () => { // when the back button, or delete button is pressed
        if(noteId !== 'new' && !note.body){
            deleteNote()
        } else if(noteId !== 'new'){
            updateNote()
        } else if(noteId === 'new' && note !== null){
            createNote()
        }
        history.push('/') // this is gonna send the user back to home page
    }
    return (
        <div className="note">
            <div className="note-header">
              
                    <h3>  
                        <Link to="/">
                            <ArrowLeft onClick = {handleSubmit}/>
                        </Link>
                    </h3>
                    {noteId !== 'new' ? ( 
                         <button onClick={deleteNote}> Delete </button>
                    ) : (
                        <button onClick={handleSubmit}> Done </button>
                    )} 
                    {/* this is a if else condition in JSX , of a new note is being added, then no need to show to delete button*/}
                
            </div>

            <textarea onChange = {(e)=> {setNote({...note, 'body': e.target.value})}} value={note?.body} placeholder="Add your note here..."></textarea> {/*onChange() function is used to be able to edit the note text*/}
        </div>
    )
}

export default Note
