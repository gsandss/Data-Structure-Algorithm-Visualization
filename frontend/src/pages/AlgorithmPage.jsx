import React from "react";

const cardStyle={
    fontSize: '18px',
    paddingLeft: '150px',
    fontSize: '20px',
};

function AlgorithmPage({ algorithm }){
    
    return(
        <div className = "description">
            <h1 className="description-header">
                {algorithm.name}
            </h1>
            <p style={cardStyle}>
                { algorithm.description }
            </p>

            <button>Start</button>
        </div>
    );
}

export default AlgorithmPage;