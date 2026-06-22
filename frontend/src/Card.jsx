function Card({title, description, gif, timeComplexity, spaceComplexity}) {
    return(  
        <div className="card">
            {gif && <img className="card-img" src={gif} alt={`${title} animation`} />}
            <h2 className="card-title">{title}</h2>
            <div className="card-meta">
                {timeComplexity && <small>Time: {timeComplexity}</small>}
                {spaceComplexity && <small style={{marginLeft: '12px'}}>Space: {spaceComplexity}</small>}
            </div>
        </div>
    );
}

export default Card;