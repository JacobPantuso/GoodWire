import * as account from "./account.js";

var orders = [];
export class Order {
    constructor(orderNumber, orderDate, cart, status, email, total) {
        this.orderNumber = orderNumber;
        if (orderDate == null) {
            this.orderDate = new Date().toDateString() + ' @ ' + new Date().toLocaleTimeString();
        } else {
            this.orderDate = orderDate;
        }
        this.cart = cart;
        this.status = status;
        this.email = email;
        this.total = total;
    }

    getOrderNumber() {
        return this.orderNumber;
    }

    // returns formatted date string
    getOrderDate() {
        return this.orderDate;
    }

    // needs to be integrated with cart class/product class
    getItems() {
        return this.cart;
    }

    getStatus() {
        return this.status;
    }

}

export function newOrder(orderNumber, cart, status, email, price, test) {
    if ((orderNumber == '' || orderNumber == null || orderNumber == undefined || isNaN(parseInt(orderNumber))) || (cart == '' || cart == null || cart == undefined || cart == []) || (status == '' || status == null || status == undefined) || (email == '' || email == null || email == undefined) || (price == '' || price == null || price == undefined || isNaN(parseInt(price)))) {
        return null;
    } else {
        if (sessionStorage.getItem('guest') == 'true' || test == true) {
            var order = new Order(orderNumber, null, cart, status, email, price);
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            return order;
        } else {
            var res = account.getAccountByName(sessionStorage.getItem('name'));
            var order = new Order(orderNumber, null, cart, status, email, price);
            res.addOrder(order);
            orders.push(order);
            return order;
        }
    }
}

export function cancelOrder(orderNumber, test) {
    if (getOrder(orderNumber) == null) {
        return false;
    }
    if (sessionStorage.getItem('guest') == 'true' && test == true) {
        var newOrders = [];
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].orderNumber != orderNumber) {
                newOrders.push(orders[i]);
            }
        }
        orders = newOrders;
        localStorage.setItem('orders', JSON.stringify(orders));
    } else if (sessionStorage.getItem('guest') == 'false' && test == null) {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var newOrders = [];
        for (var i = 0; i < res.orders.length; i++) {
            if (res.orders[i].orderNumber != orderNumber) {
                newOrders.push(res.orders[i]);
            } else {
                var order = res.orders[i];
            }
        }
        orders = newOrders;
        res.removeOrder(order);
    }
    return true;
}

export function getOrder(orderNumber) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].getOrderNumber() == orderNumber) {
            return orders[i];
        }
    }
    return null;
}

export function receiveStorage() {
    if (sessionStorage.getItem('guest') == 'true') {
        var retrievedOrders = JSON.parse(localStorage.getItem('orders'));
        if (retrievedOrders == null) {
            localStorage.setItem('orders') = [];
        } else {
            for (var i = 0; i < retrievedOrders.length; i++) {
                orders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].orderDate, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email, retrievedOrders[i].total));
            }
        }
    } else if (sessionStorage.getItem('guest') == 'false') {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var retrievedOrders = res.getOrders();
        var newOrders = []
        for (var i = 0; i < res.orders.length; i++) {
            orders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].orderDate, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email, retrievedOrders[i].total));
            newOrders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].orderDate, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email, retrievedOrders[i].total));
        }
        res.clearOrders();
        for (var i = 0; i < newOrders.length; i++) {
            res.addOrder(newOrders[i]);
        }
    }
}