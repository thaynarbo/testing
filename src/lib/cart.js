import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const Money = Dinero;

import { calculateDiscount } from './discount.utils';

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
        return this.items.reduce((acc, { product, quantity, condition }) => {
            const amount = Money({
                amount: product.price * quantity,
            });
            let discount = Money({ amount: 0 });

            if (condition) {
                discount = calculateDiscount(amount, quantity, condition);
            }
            return acc.add(amount).subtract(discount);
        }, Money({ amount: 0 }));
    }

    summary() {
        const total = this.getTotal();
        const formattedTotal = total.toFormat('$0,0.00');
        const items = this.items;

        return {
            total,
            items,
            formattedTotal,
        };
    }

    checkout() {
        const { total, items } = this.summary();
        this.items = [];

        return {
            total: total.getAmount(),
            items,
        };
    }
}
