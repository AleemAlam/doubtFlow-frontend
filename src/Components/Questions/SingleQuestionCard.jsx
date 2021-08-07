import React from 'react'

const SingleQuestionCard = ({match}) => {
   const qstID= match.params.id
    return (
        <div>
            {qstID}
        </div>
    )
}

export default SingleQuestionCard
