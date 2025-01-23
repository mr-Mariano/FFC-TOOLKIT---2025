import React from 'react';
import { Link } from 'react-router';
import '../styles/CardContainer.css'; // Assuming you have a CSS file for styling

const Card = ({ link, tema, descripcion }) => {
    return (
        <Link to={`/${link}`} className="card-link">
            <div className="card">
                <img src="icon1.png" alt="Ícono 1" />
                <div className="card-content">
                    <p className="card-title">{tema}</p>
                    <p className="card-subtitle">{descripcion}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;