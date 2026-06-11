import profilePicture from './assets/profilePicture.png';
import { motion } from 'framer-motion';


function Card({title, description, color, profilePicture}) {
    return(  
        <div className="card">
            <img src={profilePicture} alt="Profile" />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Card;