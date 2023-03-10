const fs = require("fs")
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/product.json"
const productService = require("../model/product-service")

exports.create = async (request, response) => {
    const { categoryId, price, productName, quantityInStock, thumbImage, brandId, descriptions, salePercent, saleFinishDate, createtAt } = request.body;

    const newObj = {
        categoryId,
        price,
        productName,
        quantityInStock,
        thumbImage,
        brandId,
        descriptions,
        salePercent,
        saleFinishDate,
        createtAt
    };

    try {
        const result = await productService.createProduct(newObj);
        console.log(result);
        if (result && result.affectedRows > 0) {
            response.json({ status: true, message: "Success" })
        } else {
            response.json({ status: false, message: "Nemehed aldaa garlaa" })
        }

    } catch (err) {
        response.json({ status: false, message: err })
    }


};



exports.getAll = async (request, response) => {
    const { limit } = request.query;
    try {
        const result = await productService.getProduct(limit);
        if (result.length > 0) {
            response.json({ status: true, result })
        }

    } catch (err) {
        console.log(err);
        response.json({ status: false, message: err })
    }

};

exports.getOne = async (request, response) => {
    const { id } = request.params;

    if (!id)
        return response.json({ status: false, message: "product id not found" });

    try {
        const result = await productService.getProduct(id);
        response.json({ status: true, result });


    } catch (err) {
        console.log(err);
        response.json({ status: false, message: err })
    }
};




exports.update = async (request, response) => {
    const { id } = request.params;
    if (!id)
        return response.json({ status: false, message: "product id not found" });
    try {
        const result = await productService.updateProduct(id, request.body);
        console.log(result);
        if (result.length > 0 && result[0].affectedRows > 0) {
            response.json({ status: true, message: "Success" })
        } else {
            response.json({ status: true, message: "Nemehed aldaa garlaa" })
        }

    } catch (err) {
        response.json({ status: false, message: err })
    }
};

exports.delete = async (request, response) => {
    const { id } = request.params;
    if (!id)
        return response.json({ status: false, message: "product id not found" });
    try {
        const result = await productService.deleteProduct(id);
        console.log(result, "controller");
        if (result && result.affectedRows > 0) {
            response.json({ status: true, message: "Success" })
        } else {
            response.json({ status: false, message: "Ustgahad aldaa garlaa" })
        }

    } catch (err) {
        response.json({ status: false, message: err })
    }
};