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
    //const Δφ = φ2 - φ1;
    const Δλ = Math.abs(λ2 - λ1);

    //find the sine of the angle between the destination and the north pole

    let destinationToPole = Math.PI/2 - φ2;

    //calculate the vector from one point to another
    function vectorBetweenVectors(headVector, tailVector) {
      return {
        x: headVector.x - tailVector.x,
        y: headVector.y - tailVector.y,
        z: headVector.z - tailVector.z
      }
    };
  
    // Find the dot product of the two vectors and the angle between
    function dotProduct(vectorA, vectorB) {
      return vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z;
    }

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

    const vectorNorth = {
      x: 0,
      y: 0,
      z: 1
    };
   
    let angle = Math.acos(dotProduct(vector1,vector2));
    let arcLength = (EARTH_RADIUS_KM * angle); //Distance in kilometers

    // Haversine formula for arc length (distance) between two points on a sphere
    /*const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const arcLength = EARTH_RADIUS_KM * c; // Distance in kilometers*/
    
    //Find the initial compass heading in radians from north

    let compassHeading;
    
    if (Math.acos(dotProduct(vectorBetweenVectors(vector1,vector2),vectorBetweenVectors(vector1,vectorNorth))) > Math.PI/2) {
      compassHeading = Math.PI - Math.asin((Math.sin(destinationToPole) * Math.sin(Δλ)) / Math.sin(angle));
    } else {
      compassHeading = Math.asin((Math.sin(destinationToPole) * Math.sin(Δλ)) / Math.sin(angle));
    };

    
  console.log(compassHeading)
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

