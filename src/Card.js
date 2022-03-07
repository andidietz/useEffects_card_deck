import React from 'react'

const Card = ({id, name}) => {
    return (
        <div>
            <p id={id}>{name}</p>
        </div>
    )
}

export default Card