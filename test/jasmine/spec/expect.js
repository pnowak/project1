describe('Cash register', function () {
    
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

    var me = new StaffMember('Pio', 20);

    function StaffMember(name, discountPercent){
        this.name = name;
        this.discountPercent = discountPercent;
    }

    it('is a object', function () {
        var o = typeof cashRegister;
        expect(o).not.toBe(null);
    });

    it('with four method', function () {
        var arr = ['add', 'scan', 'voidLastTransaction', 'applyStaffDiscount'];

        expect(arr).toEqual(jasmine.arrayContaining(['add', 'scan', 'voidLastTransaction', 'applyStaffDiscount']));
    });

    it('include add method', function () {
        expect(cashRegister.add).toBeDefined();
    });

    it('property total start with zero', function () {
        expect(cashRegister.total).toEqual(0);
    });

    it('method scan always return true', function () {
        expect(cashRegister.scan).toBeTruthy();
    });

    describe('connected with StaffMember', function () {

        it('which be a constructor', function () {
            expect(me).toBeTruthy(me instanceof StaffMember);
        })

        it('which have a name', function () {
            expect(me.name).toBeDefined();
        });

        it('which method discountPercent always greater than zero', function () {
            expect(me.discountPercent).toBeGreaterThan(0);
        });
    });
});