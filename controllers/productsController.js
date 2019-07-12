const Products = require('../models/Products');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
};

const upload = multer(configMulter).single('img');

exports.uploadFile = async(req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            res.json({ message: err });
        }
        return next();
    });
}

exports.newProduct = async(req, res, next) => {

    const product = new Products(req.body);

    try {
        if (req.file.filename) {
            product.img = req.file.filename;
        }
        await product.save();
        res.json({ message: 'Se creó un nuevo producto' });
    } catch (err) {
        console.log(err);
        next()
    }

}

exports.showProducts = async(req, res) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (err) {
        console.log(err);
        next();
    }
}

exports.showProduct = async(req, res, next) => {

    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            res.json({ message: 'El producto no existe' });
            next();
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        next();
    }

}

exports.updateProduct = async(req, res, next) => {

    try {
        let productOld = await Products.findById(req.params.id);
        let newProduct = req.body;
        if (req.file.filename) {
            newProduct.img = req.file.filename;
        } else {
            newProduct.img = productOld.img;
        }
        let product = await Products.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(product);
    } catch (err) {
        console.log(err);
        next();
    }

}

exports.deleteProduct = async(req, res, next) => {
    try {
        let product = await Products.findById(req.params.id);
        if (product.img) {
            const imgOldPath = __dirname + `/../uploads/${product.img}`;
            fs.unlink(imgOldPath, (err) => {
                if (err) {
                    console.log(err.message);
                }
                return;
            });
        }
        await Products.findOneAndDelete({ _id: req.params.id });
        res.json('El producto fue eliminado');
    } catch (err) {
        console.log(err);
        next();
    }
}