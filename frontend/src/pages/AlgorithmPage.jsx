import React from "react";
import { useNavigate } from "react-router-dom";

const cardStyle={
    fontSize: '18px',
    paddingLeft: '150px',
    fontSize: '20px',
    paddingRight: '150px'
};

const buttonStyle={
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px',
    gap: '8px'
}

const imgStyle={
    maxWidth: '100%', 
    height: '200px',
    display: 'block',
    border: '3px solid black'
}
const imgWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '16px 0'
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
                    Back
                </button>
            </div>
            
            {algorithm.gif ? (
                <div style={imgWrapperStyle}>
                    <img
                        src={algorithm.gif}
                        alt={`${algorithm.name} visualization`}
                        style={imgStyle}
                    />
                </div>
            ) : null}

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