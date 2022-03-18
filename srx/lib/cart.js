export default class Cart {
    list = [];
    add(item) {
        this.list.push(item);
    }

    getTotal() {
        return this.list.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);
    }
}
