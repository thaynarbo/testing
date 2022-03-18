import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;
export default class Cart {
    items = [];
    add(item) {
        const duplicate = { product: item.product };
        if (find(this.items, duplicate)) {
            remove(this.items, duplicate);
        }
        this.items.push(item);
    }
    remove(product) {
        remove(this.items, { product });
    }

    getTotal() {
        return this.items.reduce((acc, item) => {
            return acc.add(
                Money({ amount: item.product.price * item.quantity }),
            );
        }, Money({ amount: 0 }));
    }

    summary() {
        const total = this.getTotal().getAmount();
        const items = this.items;

        return {
            total,
            items,
        };
    }

    checkout() {
        const { total, items } = this.summary();
        this.items = [];

        return {
            total,
            items: this.items,
        };
    }
}
