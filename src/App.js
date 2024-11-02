import React, { useState } from 'react';
import CoordinateInput from './components/CoordinateInput';
import { calculateDistanceAndBearing } from './algorithm';
import { Container, Button, Result } from './styles';

function App() {
    const [originLatitude, setOriginLatitude] = useState('');
    const [originLongitude, setOriginLongitude] = useState('');
    const [destinationLatitude, setDestinationLatitude] = useState('');
    const [destinationLongitude, setDestinationLongitude] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = () => {
        const calculation = calculateDistanceAndBearing(
            parseFloat(originLatitude),
            parseFloat(originLongitude),
            parseFloat(destinationLatitude),
            parseFloat(destinationLongitude)
        );
        setResult(calculation);
    };

    return (
        <Container>
            <h1>Geolocation Route App</h1>
            <CoordinateInput
                label="Origin Latitude (Decimal format)"
                value={originLatitude}
                onChange={(e) => setOriginLatitude(e.target.value)}
            />
            <CoordinateInput
                label="Origin Longitude (Decimal format)"
                value={originLongitude}
                onChange={(e) => setOriginLongitude(e.target.value)}
            />
            <CoordinateInput
                label="Destination Latitude (Decimal format)"
                value={destinationLatitude}
                onChange={(e) => setDestinationLatitude(e.target.value)}
            />
            <CoordinateInput
                label="Destination Longitude (Decimal format)"
                value={destinationLongitude}
                onChange={(e) => setDestinationLongitude(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
            
            {result && (
                <Result>
                    <h3>Results:</h3>
                    <p>Arc Length: {result.arcLength} km</p>
                    <p>Compass Heading: {result.compassHeading}°</p>
                </Result>
            )}
        </Container>
    );
}

export default App;


