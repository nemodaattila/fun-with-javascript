class MathHelper
{
    static sinDegree(num)
    {
        return Math.sin(num * Math.PI / 180);
    }

    static cosDegree(num)
    {
        return Math.cos(num * Math.PI / 180);
    }

    static countHypotenuseCoordsInTriangle(betaAngle, hypotenuseLength, gammaAngle = 90)
    {
        // console.log(betaAngle)

        betaAngle -= 90;
        if (betaAngle<0) betaAngle=360-betaAngle;
        // console.log(betaAngle)
        let alfaAngle=180-(gammaAngle+betaAngle);

        let legALength=(hypotenuseLength*this.sinDegree(alfaAngle))/this.sinDegree(gammaAngle);
        legALength=Math.round(legALength * 100) / 100;

        let legBLength=Math.sqrt(Math.pow(legALength,2)+Math.pow(hypotenuseLength,2)
            -(2*legALength*hypotenuseLength*this.cosDegree(betaAngle)));
        legBLength=Math.round(legBLength * 100) / 100;
        if (betaAngle>180) legBLength=-legBLength;
        // console.log(legALength, legBLength)
        return [legALength,legBLength]
    }
}
