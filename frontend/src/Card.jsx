function Card({title, description, color, gif}) {
    return(  
        <div className="card">
            {gif && <img className="card-img" src={gif} alt={`${title} animation`} />}
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Card;