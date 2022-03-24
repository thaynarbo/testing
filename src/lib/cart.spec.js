import Cart from './cart';

describe('Cart', () => {
    let cart;
    let product = {
        name: 'Adidas Sneaker',
        price: 30075,
    };
    let product2 = {
        name: 'Nike Sneaker',
        price: 45055,
    };

    beforeEach(() => {
        cart = new Cart();
    });

    describe('getTotal()', () => {
        it('should return 0 if there are no items', () => {
            expect(cart.getTotal().getAmount()).toBe(0);
        });

        it('should return sum of all products in the list ', () => {
            const item = {
                product,
                quantity: 2,
            };

            cart.add(item);

            expect(cart.getTotal().getAmount()).toEqual(60150);
        });

        it('should not allow the same product to be add more than once', () => {
            cart.add({
                product,
                quantity: 2,
            });
            cart.add({
                product,
                quantity: 1,
            });

            expect(cart.getTotal().getAmount()).toEqual(30075);
        });

        it('should remove item and receive total taking the new item into consideration', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 1,
            });

            cart.remove(product);

            expect(cart.getTotal().getAmount()).toEqual(45055);
        });
    });

    describe('discount', () => {
        it('should return total with the discount applied', () => {
            cart.add({
                product,
                quantity: 2,
                condition: {
                    percentage: 30,
                    minimum: 2,
                },
            });

            expect(cart.getTotal().getAmount()).toEqual(42105);
        });

        it('should apply discount of 50% for even quantity', () => {
            const condition = {
                quantity: 2,
            };

            cart.add({
                product,
                condition,
                quantity: 4,
            });

            expect(cart.getTotal().getAmount()).toEqual(60150);
        });

        it('should apply quantity discount of 40% for odd quantities', () => {
            const condition = {
                quantity: 2,
            };

            cart.add({
                product,
                condition,
                quantity: 5,
            });

            expect(cart.getTotal().getAmount()).toEqual(90225);
        });

        it('should not apply percentage discount quantity below minimum', () => {
            const condition = {
                percentage: 30,
                minimum: 2,
            };

            cart.add({
                product,
                condition,
                quantity: 1,
            });

            expect(cart.getTotal().getAmount()).toEqual(30075);
        });

        it('should not apply quantity discount when quantity is below condition', () => {
            const condition = {
                quantity: 5,
            };

            cart.add({
                product,
                condition,
                quantity: 1,
            });

            expect(cart.getTotal().getAmount()).toEqual(30075);
        });

        it('should receive two or more conditions and apply the one that offers more discount ', () => {
            const condition = {
                percentage: 30,
                minimum: 2,
            };

            const condition2 = {
                quantity: 2,
            };

            cart.add({
                product,
                condition: [condition, condition2],
                quantity: 4,
            });

            expect(cart.getTotal().getAmount()).toEqual(60150);
        });
    });

    describe('checkout()', () => {
        it('should return an object with total and list of items', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });

            expect(cart.checkout()).toMatchSnapshot();
        });
        it('should return an object with total and list of items when summary is called', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });

            expect(cart.summary()).toMatchSnapshot();
            expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
        });

        it('should return an object with formatted total ', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });

            expect(cart.summary().formattedTotal).toEqual('R$1,953.15'); //195315
        });
    });
});
