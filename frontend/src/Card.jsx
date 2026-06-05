import profilePicture from './assets/profilePicture.png';

function Card(){
    return(  
        <div className="card">
            <img className="card-img" alt="Gavin Sands" src={profilePicture}></img>
            <h2 className="card-title">Gavin Sands</h2>
            <p className="card-text">I am currently a student at Iowa State University</p>
        </div>
    );
}

export default Card;