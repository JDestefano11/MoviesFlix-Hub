import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    // Function to handle click on the card
    const handleHardClick = () => {
        onMovieClick(movie);
    }

    // Styles for the card
    const cardStyles = {
        backgroundColor: '#1a1a1a', // Dark background
        color: '#f0f0f0', // Light text color
        border: '1px solid #333', // Dark border
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        width: '200px', // Fixed width for consistent card size
        marginBottom: '10px', // Reduced spacing between cards
    };

    // Styles for the movie poster image
    const imageStyles = {
        maxHeight: '250px', // Maximum height for movie poster
        objectFit: 'cover', // Maintain aspect ratio and cover the entire space
    };

    return (
        <div className="movie-card" onClick={handleHardClick} style={{ marginBottom: '20px' }}>
            <Card style={cardStyles}>
                {/* Movie poster image */}
                <Card.Img variant="top" src={movie.ImageUrl} className="card-img-top" style={imageStyles} alt={movie.Title} />
                {/* Card body */}
                <Card.Body>
                    {/* Movie title */}
                    <Card.Title style={{ color: '#f0f0f0', fontSize: '16px', marginBottom: '10px' }}>{movie.Title}</Card.Title>
                    {/* Genre information */}
                    <Card.Text style={{ color: '#ccc', fontSize: '14px', marginBottom: '10px' }}>
                        Genre: {movie.Genre.Name}
                    </Card.Text>
                    {/* Open button */}
                    <Button onClick={() => onMovieClick(movie)} variant="link" className="btn-link" style={{ color: '#ff4500', fontSize: '14px' }}>
                        Open
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};
