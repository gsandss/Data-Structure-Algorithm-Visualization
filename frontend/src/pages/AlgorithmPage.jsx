import React from "react";
import { useNavigate } from "react-router-dom";

const cardStyle={
    fontSize: '18px',
    paddingLeft: '150px',
    fontSize: '20px',
};

const buttonStyle={
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px',
    gap: '8px'
}

function AlgorithmPage({ algorithm }){
    const navigate = useNavigate();

    return(
        <div className = "description">
            <div className="button-style">
                <button 
                    onClick ={() => navigate('/')}
                    style={buttonStyle}
                >
                    Return
                </button>
            </div>
            
            <h1 className="description-header">
                {algorithm.name}
            </h1>

            <p style={cardStyle}>
                { algorithm.description }
            </p>
        </div>
    );
}

export default AlgorithmPage;