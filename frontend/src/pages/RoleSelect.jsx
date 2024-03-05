import React from 'react'
import {Link} from 'react-router-dom'
import RoleButtons from '../components/RoleButtons'

const RoleSelect = () => {
  return (
    <main>
        <RoleButtons />

        <div className="link_container">
            <Link to = {`/journals`}>
                <div className="link_item">
                    <a href="" className="link_item_container">
                        <div>
                            <p className="link_item_header">Login :&#41;</p>
                        </div>
                    </a>
                </div>
            </Link>
        </div>
    </main>
  )
}

export default RoleSelect