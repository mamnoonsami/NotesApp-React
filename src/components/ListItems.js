import { getDefaultNormalizer } from '@testing-library/react'
import React from 'react'
import { Link } from 'react-router-dom'



const getTime = (note) => {
  // the getTime() function returns time but looks ugly
  // this function will will trim the time data and make it look good for the frontend

  return new Date(note.updated).toLocaleDateString()
}


const getTitle = (note) => {
  //this function trims the notes to show the appropriate header in front page for longer texts
  //split the new lines and store this in array
  // if the first line is greater than 45 char then return the first 45 characters

  const title = note.body.split('\n')[0]
  if(title.length > 45){
    return title.slice(0,45)
  }

  return title
}

const getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll('\n','')
  content = content.replaceAll(title,'')

  if(content.length > 45){
    return content.slice(0,45) + "... "
  }

  return content
}


const ListItems = ({note}) => {
    console.log('Props: ', note.body)
    return (
      <Link to = {`/note/${note.id}`}>
        <div className="notes-list-item">
          <h3>{getTitle(note)}</h3> 
          <p id="time-con"><span>{getTime(note)}</span>{getContent(note)}</p>

        </div>
      </Link>
    )
}

export default ListItems
