import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const calculatePercentageDiscount = (amount, item) => {
    if (item.condition?.percentage && item.quantity >= item.condition.minimum) {
        return amount.percentage(item.condition.percentage);
    }
    return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
    if (item.condition.quantity && item.quantity >= item.condition.quantity) {
        return amount.percentage(50);
    }
};

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
            const amount = Money({
                amount: item.product.price * item.quantity,
            });
            let discount = calculatePercentageDiscount(amount, item);

            if (item.condition?.quantity) {
                discount = calculateQuantityDiscount(amount, item);
            }
            return acc.add(amount).subtract(discount);
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
