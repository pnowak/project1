describe('Cash register', function () {

    function StaffMember(name, discountPercent){
            this.name = name;
            this.discountPercent = discountPercent;
    }

    var me = new StaffMember('Pio', 20);

    var cashRegister = {
        total: 0,
        lastTransactionAmount: 0,
        add: function(itemCost){
            this.total += (itemCost || 0);
            this.lastTransactionAmount = itemCost;
        },
        scan: function(item, quantity){
            switch (item){
            case "eggs": this.add(0.98 * quantity); break;
            case "milk": this.add(1.23 * quantity); break;
            case "magazine": this.add(4.99 * quantity); break;
            case "chocolate": this.add(0.45 * quantity); break;
            }
            return true;
        },
        voidLastTransaction : function(){
            this.total -= this.lastTransactionAmount;
            this.lastTransactionAmount = 0;
        },
        applyStaffDiscount: function(employee) {
            this.total -= this.total * (employee.discountPercent / 100);
        }
    };

    it('is a object', function () {
    	expect(cashRegister).not.toBe(null);
    });

    it('to include add method', function () {
        expect(cashRegister.add).toBeDefined();
    });

    it('property - total - start with zero', function () {
    	expect(cashRegister.total).toBeEqual(0);
    });

    it('method - scan - always return true', function () {
    	expect(cashRegister.scan).toByTruthy();
    });

    describe('have StaffMember', function () {

    	it('with a name', function () {
    		expect(me.name).toBeDefined();
    	});

        it('with method discountPercent which always greater than zero', function () {
        	expect(me.discountPercent).toBeGreaterThan(0);
        });
    });
});