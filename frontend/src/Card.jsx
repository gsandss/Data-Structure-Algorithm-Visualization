function Card({title, description, gif}) {
    return(  
        <div className="card">
            {gif && <img className="card-img" src={gif} alt={`${title} animation`} />}
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Card;