const {
    STANDARD_NUMBER_OF_LITRES,
    DAYS_IN_A_MONTH,
    FIVE_HUNDRED_LITRES,
    THOUSAND_FIVE_HUNDRED_LITRES,
    THOUSAND_LITRES,
    THREE_THOUSAND_LITRES,
    RATE_OF_BASIC_SLAB,
    RATE_OF_BOREWELL_WATER,
    RATE_OF_MEDIUM_SLAB,
    RATE_OF_MAJOR_SLAB,
    RATE_OF_ADVANCED_SLAB,
    TWO_BEDROOM_APARTMENT,
    TWO_BEDROOM_NUMBER_OF_PEOPLE,
    THREE_BEDROOM_APARTMENT,
    THREE_BEDROOM_NUMBER_OF_PEOPLE
} = require('./constants');

class WaterUsage {
    constructor(apartmentType, corporationWater, borewellWater) {
        this._apartmentType = apartmentType;
        this._corporationWater = corporationWater;
        this._borewellWater = borewellWater;
        this._totalWaterRatio = this._corporationWater + this._borewellWater;
        this._totalWaterUsage = this.calculateInitialWaterUsage();
        this._totalWaterExpenditure = this.calculateBasicWaterExpenditure();
    }
    calculateInitialWaterUsage() {
        let basicWaterUsage = STANDARD_NUMBER_OF_LITRES * DAYS_IN_A_MONTH;
        if (this._apartmentType === TWO_BEDROOM_APARTMENT) {
            basicWaterUsage = basicWaterUsage * TWO_BEDROOM_NUMBER_OF_PEOPLE;
        } else if(this._apartmentType === THREE_BEDROOM_APARTMENT){
            basicWaterUsage = basicWaterUsage * THREE_BEDROOM_NUMBER_OF_PEOPLE;
        }
        return basicWaterUsage;
    }
    calculateBasicWaterExpenditure() {
        const corporationWaterPortion = Math.round((this._corporationWater * this._totalWaterUsage) / this._totalWaterRatio);
        const borewellWaterPortion = Math.round((this._borewellWater * this._totalWaterUsage) / this._totalWaterRatio);
        const basicWaterExpenditure = (corporationWaterPortion) + Math.round(borewellWaterPortion * RATE_OF_BOREWELL_WATER);
        return basicWaterExpenditure;
    }
    calculateWaterUsageOfGuests(numberOfGuests) {
        let guestWaterUsage = STANDARD_NUMBER_OF_LITRES * DAYS_IN_A_MONTH * numberOfGuests;
        let guestWaterExpenditure = 0;
        if (guestWaterUsage < FIVE_HUNDRED_LITRES + 1) {
            guestWaterExpenditure = guestWaterUsage * RATE_OF_BASIC_SLAB;
        } else if (guestWaterUsage < THOUSAND_FIVE_HUNDRED_LITRES + 1) {
            guestWaterExpenditure = (FIVE_HUNDRED_LITRES * RATE_OF_BASIC_SLAB) + ((guestWaterUsage - FIVE_HUNDRED_LITRES) * RATE_OF_MEDIUM_SLAB);
        } else if (guestWaterUsage < THREE_THOUSAND_LITRES + 1) {
            guestWaterExpenditure = (FIVE_HUNDRED_LITRES * RATE_OF_BASIC_SLAB) + (THOUSAND_LITRES * RATE_OF_MEDIUM_SLAB) + ((guestWaterUsage - THOUSAND_FIVE_HUNDRED_LITRES) * RATE_OF_MAJOR_SLAB);
        } else {
            guestWaterExpenditure = (FIVE_HUNDRED_LITRES * RATE_OF_BASIC_SLAB) + (THOUSAND_LITRES * RATE_OF_MEDIUM_SLAB) + (THOUSAND_FIVE_HUNDRED_LITRES * RATE_OF_MAJOR_SLAB) + ((guestWaterUsage - THREE_THOUSAND_LITRES) * RATE_OF_ADVANCED_SLAB);
        }
        this._totalWaterUsage = this._totalWaterUsage + guestWaterUsage;
        this._totalWaterExpenditure = this._totalWaterExpenditure + guestWaterExpenditure;
    }
}

module.exports = {
    WaterUsage: WaterUsage
}