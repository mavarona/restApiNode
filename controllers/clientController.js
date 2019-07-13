const Clients = require('../models/Clients');

exports.newClient = async(req, res, next) => {

    const client = new Clients(req.body);

    try {
        await client.save();
        res.json({ message: 'Se creo un nuevo cliente' });
    } catch (err) {
        res.send(err);
        next();
    }

}

exports.showClients = async(req, res) => {
    try {
        const clients = await Clients.find({});
        res.json(clients);
    } catch (err) {
        res.send(err);
        next();
    }
}

exports.showClient = async(req, res, next) => {

    try {
        const client = await Clients.findById(req.params.id);
        if (!client) {
            res.json({ message: 'El cliente no existe' });
            next();
        }
        res.json(client);
    } catch (err) {
        res.send(err);
        next();
    }

}

exports.updateClient = async(req, res, next) => {

    try {
        const client = await Clients.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json({client, message: 'El cliente se actualizó'});
    } catch (err) {
        res.send(err);
        next();
    }

}

exports.deleteClient = async(req, res, next) => {

    try {
        await Clients.findOneAndDelete({ _id: req.params.id });
        res.json({message:'El cliente fue eliminado'});
    } catch (err) {
        res.send(err);
        next();
    }

}