import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar">
        <h4 className="sidebar-item"><Link to='/improve/'>Improve</Link></h4>
        <h4 className="sidebar-item"><Link to='/sentence/'>sentence</Link></h4>
        <h4 className="sidebar-item"><Link to='/grammar/'>Grammar</Link></h4>
        <h4 className="sidebar-item"><Link to='/course/'>Course</Link></h4>
        <h4 className="sidebar-item"><Link to='/todos/'>Todo</Link></h4>
    </div>
  )
}

export default Sidebar