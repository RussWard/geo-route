// algorithm.js

// Earth radius in kilometers
const EARTH_RADIUS_KM = 6371;

export function calculateDistanceAndBearing(originLatitude, originLongitude, destinationLatitude, destinationLongitude) {
    // Convert degrees to radians
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const φ1 = toRadians(originLatitude);
    const λ1 = toRadians(originLongitude);
    const φ2 = toRadians(destinationLatitude);
    const λ2 = toRadians(destinationLongitude);

    // Calculate the change in coordinates
    const Δφ = φ2 - φ1;
    const Δλ = λ2 - λ1;

    // Haversine formula for arc length (distance) between two points on a sphere
    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const arcLength = EARTH_RADIUS_KM * c; // Distance in kilometers

    // Formula for initial compass heading (bearing)
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    let compassHeading = Math.atan2(y, x);

    // Convert compass heading from radians to degrees and normalize it to 0-360
    compassHeading = (compassHeading * 180) / Math.PI;
    compassHeading = (compassHeading + 360) % 360;

    return {
        arcLength: arcLength.toFixed(2), // Arc length in kilometers
        compassHeading: compassHeading.toFixed(2) // Compass heading in degrees
    };
}

