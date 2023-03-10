const pool = require("../config/mysql-config");

exports.getProduct = async (limit) => {
    try {
        if (limit) {
            const [rows] = await pool.query(
                `SELECT * FROM product limit ${limit}`

            );
            return rows;
        }

    } catch (err) {
        console.log(err);
    }
}

exports.getProduct = async (id) => {
    try {
        const [row] = await pool.query(`SELECT * FROM product where productId = ${id}`);
        return row[0];
    } catch (err) {
        console.log(err);
    }
}

exports.createProduct = async (product) => {
    const { categoryId, price, productName, quantityInStock, thumbImage, brandId, descriptions, salePercent, saleFinishDate, createtAt } = product;

    const [result] = await pool.query(
        `INSERT INTO product VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [null, categoryId, price, productName, quantityInStock, thumbImage, brandId, descriptions, salePercent, saleFinishDate, createtAt]
    );
    console.log(result);
    return result;
};

exports.updateProduct = async (id, updatedData) => {
    let [result] = "";
    console.log(Object.keys(updatedData));
    for (let i = 0; i < Object.keys(updatedData).length; i++) {
        result = await pool.query(
            `UPDATE product SET ${Object.keys(updatedData)[i]} ='${Object.values(updatedData)[i]
            }'  WHERE productId = ${id}`
        );
    }
    return result;
};

exports.deleteProduct = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM product WHERE productId = '${id}'`);
    return result;
};
