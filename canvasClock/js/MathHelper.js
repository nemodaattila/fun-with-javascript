/**
 * static Class | helper functions for math
 */
class MathHelper {
    /**
     * return the the sine of an angle in degree (°)
     * @param angle
     * @returns {number} the sine in degree (°)
     */
    static sinDegree(angle) {
        return Math.sin(angle * Math.PI / 180);
    }

    /**
     * return the the cosine of an angle in degree (°)
     * @param angle
     * @returns {number} the cosine in degree (°)
     */
    static cosDegree(angle) {
        return Math.cos(angle * Math.PI / 180);
    }

    /**
     * counts the coordinates of the end points of a hypotenuse of a triangle (default rectangular)
     * if the start coordinates of the hypotenuse are [0,0]
     * @param betaAngle the angle of the corner at the [0,0] point
     * @param hypotenuseLength the length of the hypotenuse side of the triangle
     * @param gammaAngle the angle of the corner between the adjacent and the opposite sides of the triangle , seen from the [0,0] point
     * @returns {number[]} end point coordinates [coordinateX, coordinateY]
     */
    static countHypotenuseCoordsInTriangle(betaAngle, hypotenuseLength, gammaAngle = 90) {
        betaAngle -= 90;
        if (betaAngle < 0) betaAngle = 360 - betaAngle;
        let alfaAngle = 180 - (gammaAngle + betaAngle);
        let legALength = (hypotenuseLength * this.sinDegree(alfaAngle)) / this.sinDegree(gammaAngle);
        legALength = Math.round(legALength * 100) / 100;
        let legBLength = Math.sqrt(Math.pow(legALength, 2) + Math.pow(hypotenuseLength, 2)
            - (2 * legALength * hypotenuseLength * this.cosDegree(betaAngle)));
        legBLength = Math.round(legBLength * 100) / 100;
        if (betaAngle > 180) legBLength = -legBLength;
        return [legALength, legBLength]
    }
}
