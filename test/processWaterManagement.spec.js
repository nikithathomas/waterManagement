const assert = require('assert');
const expect=require('expect.js');
const { ProcessWaterManagement } = require('../js/processWaterManagement');

let processWaterManagement=new ProcessWaterManagement();

describe('Test Process Water Management',()=>{
    describe('Test Input Water Allocation',()=>{
        it('Test Input Water Allocation with valid data',()=>{
            processWaterManagement.inputWaterAllocation('3','2:3');
            const waterUsage=5*10*30;
            const waterExpenditure=((2/5)*waterUsage)+((3/5*waterUsage)*1.5);
            assert.equal(processWaterManagement._waterUsage._totalWaterUsage,waterUsage);
            assert.equal(processWaterManagement._waterUsage._totalWaterExpenditure,waterExpenditure);
        });
        it('Test Input Water Allocation with invalid apartmentType',()=>{
            processWaterManagement.inputWaterAllocation('sdfs','2:3');
            assert.equal(processWaterManagement._waterUsage,'');
        });
        it('Test Input Water Allocation with invalid waterRatio',()=>{
            processWaterManagement.inputWaterAllocation('3','sddsf');
            assert.equal(processWaterManagement._waterUsage,'');
        });
        it('Test Input Water Allocation with borewellWater 0 ratio',()=>{
            processWaterManagement.inputWaterAllocation('2','3:0');
            const waterUsage=3*10*30;
            const waterExpenditure=waterUsage
            assert.equal(processWaterManagement._waterUsage._totalWaterUsage,waterUsage);
            assert.equal(processWaterManagement._waterUsage._totalWaterExpenditure,waterExpenditure);
        });
        beforeEach(()=>{
            processWaterManagement=new ProcessWaterManagement();
        })
    });
    describe('Test calculate total bill',()=>{
        describe('Test calculate total bill for no guests',()=>{
            const numberOfGuests=0;
            processWaterManagement.inputWaterAllocation('3','2:3');
            const waterUsage=5*10*30;
            const waterExpenditure=((2/5)*waterUsage)+((3/5*waterUsage)*1.5);
            processWaterManagement.calculateTotalBill(numberOfGuests);
            assert.equal(processWaterManagement._waterUsage._totalWaterUsage,waterUsage);
            assert.equal(processWaterManagement._waterUsage._totalWaterExpenditure,waterExpenditure);
        });
        describe('Test calculate total bill for no guests',()=>{
            const numberOfGuests=10;
            processWaterManagement.inputWaterAllocation('2','2:3');
            const waterUsage=3*10*30;
            const waterExpenditure=((2/5)*waterUsage)+((3/5*waterUsage)*1.5);
            processWaterManagement.calculateTotalBill(numberOfGuests);
            const waterUsageOfGuests=10*10*30;
            const waterExpenditureOfGuests=(500*2)+(1000*3)+(1500*5);
            const totalWaterUsage=waterUsage+waterUsageOfGuests;
            const totalWaterExpenditure=waterExpenditure+waterExpenditureOfGuests;
            assert.equal(processWaterManagement._waterUsage._totalWaterUsage,totalWaterUsage);
            assert.equal(processWaterManagement._waterUsage._totalWaterExpenditure,totalWaterExpenditure);
        });
        beforeEach(()=>{
            processWaterManagement=new ProcessWaterManagement();
        })
    });
})