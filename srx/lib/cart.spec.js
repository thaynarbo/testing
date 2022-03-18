import Cart from './cart';

describe('', () => {
    let cart;

    beforeEach(() => {
        cart = new Cart();
    });
    it('should return 0 if there are no items', () => {
        expect(cart.getTotal()).toBe(0);
    });

    it('should return sum of all products in the list ', () => {
        const item = {
            product: {
                name: 'Adidas sneaker',
                price: 300,
            },
            quantity: 2, //600
        };

        cart.add(item);

        expect(cart.getTotal()).toBe(600);
    });
});
