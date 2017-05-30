module.exports = function convertWeight(direction, fromWeightInt, fromWeightDecimal){

    fromWeightDecimal = (fromWeightDecimal === undefined) ? 0 : fromWeightDecimal;
    var toWeight = 0;
    if (direction === 'st2kg'){
        var fromStone = fromWeight;
        var fromLb = fromWeightDecimal;
        var fullStone = (+fromStone*14) + +fromLb;
        var fullKg = (fullStone / 2.2046);
        toWeight = fullKg.toFixed(2);
    }

    if (direction === 'kg2st'){

        var fromKg = `${fromWeightInt}.${fromWeightDecimal}`;
        var fullLb = (+fromKg * 2.2046);
        var stonePart = Math.floor((fullLb / 14));
        var decPart = Math.floor(((fullLb / 14) - stonePart)*100);
        toWeight = {
            intPart: stonePart,
            decPart: decPart
        }
    }

    if (direction === 'kg2stlbs'){

        var fromKg = `${fromWeightInt}.${fromWeightDecimal}`;
        var fullLb = (+fromKg * 2.2046);
        var stonePart = Math.floor((fullLb / 14));
        var lbPart = (fullLb - (stonePart * 14)).toFixed(2);

        toWeight = {
            intPart: stonePart,
            decPart: lbPart
        }
    }
    
    if (direction === 'kg2lbs'){

        var fromKg = `${fromWeightInt}.${fromWeightDecimal}`;
        var fullLb = (+fromKg * 2.2046);
        var lbPartInt = Math.floor(fullLb);
        var lbPartDec = Math.floor((fullLb - lbPartInt)*100);
        toWeight = {
            intPart: lbPartInt,
            decPart: lbPartDec
        }
    }
    return toWeight;
}
