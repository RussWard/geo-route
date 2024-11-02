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

    // Find the dot product of the two vectors and the angle between
    const vector1 = {
      x: Math.cos(λ1) * Math.cos(φ1),
      y: Math.sin(λ1) * Math.cos(φ1),
      z: Math.sin(φ1)
    };
    const vector2 = {
      x: Math.cos(λ2) * Math.cos(φ2),
      y: Math.sin(λ2) * Math.cos(φ2),
      z: Math.sin(φ2)
    };
    let dotProduct = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    let angle = Math.acos(dotProduct);
    let arcLength = (EARTH_RADIUS_KM * angle); //Distance in kilometers

    // Haversine formula for arc length (distance) between two points on a sphere
    /*const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const arcLength = EARTH_RADIUS_KM * c; // Distance in kilometers*/
    
    //Find the initial compass heading
    let compassHeading = Math.asin((Math.cos(φ2) * Math.sin(Δλ)) / Math.sin(angle));
  
    // Formula for initial compass heading (bearing)
    /*const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    let compassHeading = Math.atan2(y, x); */

    // Convert compass heading from radians to degrees and normalize it to 0-360
    compassHeading = (compassHeading * 180) / Math.PI;
    compassHeading = (compassHeading + 360) % 360;

    return {
        arcLength: arcLength.toFixed(3), // Arc length in kilometers
        compassHeading: compassHeading.toFixed(3) // Compass heading in degrees
    };
}

