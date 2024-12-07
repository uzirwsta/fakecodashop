import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import games from '../games';
import Game from '../components/Game';

function HomeScreen() {
  return (
    <div
      style={{
        background: 'linear-gradient(45deg, rgba(255, 0, 255, 0.6), rgba(0, 0, 255, 0.6))',
        padding: '20px 0',
        backgroundSize: '300% 300%',
        animation: 'bgAnimation 5s ease infinite',
        minHeight: '100vh',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container>
        {/* Popular Games Header Container */}
        <div
          style={{
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '20px 0',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '4rem',
              textShadow: '0 0 10px rgba(255, 0, 255, 0.9), 0 0 20px rgba(0, 0, 255, 0.9)',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            Popular Games
          </h1>
        </div>

        {/* Row for Games */}
        <Row>
          {games.map(game => (
            <Col key={game._id} sm={12} md={6} lg={4} xl={3} style={{ paddingBottom: '20px' }}>
              <div
                style={{
                  backgroundColor: '#222',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  padding: '10px',
                }}
              >
                {/* Hover Effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    transition: 'opacity 0.3s ease',
                    opacity: 0,
                    borderRadius: '15px',
                  }}
                />
                <img
                  src={game.image}
                  alt={game.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    transition: 'transform 0.3s ease',
                  }}
                />
                {/* Game Name Container */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontFamily: 'Orbitron, sans-serif',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  {game.name}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomeScreen;
