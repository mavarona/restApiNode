const Orders = require('../models/Orders');

exports.newOrder = async(req, res) => {

    const order = new Orders(req.body);

    try {
        await order.save();
        res.json({ message: 'Se creo el pedido' });
    } catch (err) {
        console.log(err);
        next();
    }

}

exports.showOrders = async(req, res, next) => {
    try {
        const orders = await Orders.find({})
            .populate('client')
            .populate({
                path: 'products.product',
                model: 'Products'
            });
        res.json(orders);
    } catch (err) {
        console.log(err);
        next();
    }
}

exports.showOrder = async(req, res, next) => {

    try {
        const order = await Orders.findById(req.params.id);
        if (!order) {
            res.json({ message: 'No existe el pedido' });
            next();
        }
        res.json(order);
    } catch (err) {
        console.log(err);
        next();
    }

}

exports.updateOrder = async(req, res, next) => {

    try {
        const order = await Orders.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(order);
    } catch (err) {
        console.log(err);
        next();
    }

}

exports.deleteOrder = async(req, res, next) => {

    try {
        await Orders.findOneAndDelete({ _id: req.params.id });
        res.json('El pedido fue eliminado');
    } catch (err) {
        console.log(err);
        next();
    }

}