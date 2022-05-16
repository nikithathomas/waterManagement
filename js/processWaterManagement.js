const { WaterUsage } = require("./waterUsage");
const { 
    ALLOT_WATER,
    ADD_GUESTS,
    BILL,
    TWO_BEDROOM_APARTMENT,
    THREE_BEDROOM_APARTMENT,
    ZERO
} = require("./constants");



class ProcessWaterManagement {
    constructor() {
        this._waterUsage = '';
    }
    inputWaterAllocation(apartmentType, waterRatio) {
        if (apartmentType && waterRatio) {
            const numberOfBedrooms = parseInt(apartmentType, 10);
            const waterRatioArray = waterRatio.split(':');
            const corporationWater = parseInt(waterRatioArray[0], 10);
            const borewellWater = parseInt(waterRatioArray[1], 10);
            if ((numberOfBedrooms === TWO_BEDROOM_APARTMENT || numberOfBedrooms === THREE_BEDROOM_APARTMENT) && (corporationWater >= ZERO && borewellWater >= ZERO))
                this._waterUsage = new WaterUsage(numberOfBedrooms, corporationWater, borewellWater);
        }

    }
    calculateTotalBill(numberOfGuests) {
        this._waterUsage.calculateWaterUsageOfGuests(numberOfGuests);
        console.log(`${this._waterUsage._totalWaterUsage} ${this._waterUsage._totalWaterExpenditure}`);
    }
    populateWaterInput(data) {
        let numberOfGuests = 0;
        data.split('\n').forEach((line) => {
            const inputArray = line.split(" ");
            const inputAction = inputArray[0];
            switch (inputAction) {
                case ALLOT_WATER:
                    const apartmentType = inputArray[1];
                    const waterRatio = inputArray[2];
                    this.inputWaterAllocation(apartmentType, waterRatio);
                    break;
                case ADD_GUESTS:
                    const guestEntry = parseInt(inputArray[1], 10);
                    numberOfGuests = numberOfGuests + guestEntry;
                    break;
                case BILL:
                    this.calculateTotalBill(numberOfGuests);
                    break;
            }

        });
    }
}

module.exports = {
    ProcessWaterManagement: ProcessWaterManagement
}
