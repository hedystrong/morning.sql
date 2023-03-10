const fs = require("fs");
const uuid = require("uuid");
const userService = require("../model/user-service")
const dataFile = process.cwd() + "/data/user.json";

exports.getAll = async (request, response) => {
    const { limit } = request.query;
    try {
        const result = await userService.getUsers(limit);
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
        return response.json({ status: false, message: "user id not found" });

    try {
        const result = await userService.getUser(id);
        response.json({ status: true, result });


    } catch (err) {
        console.log(err);
        response.json({ status: false, message: err })
    }
};

exports.create = async (request, response) => {
    const { userName, age } = request.body;

    const newObj = {
        userName,
        age
    };

    try {
        const result = await userService.createUser(newObj);
        console.log(result);
        if (result && result.affectedRows > 0) {
            response.json({ status: true, message: "Success" })
        } else {
            response.json({ status: true, message: "Nemehed aldaa garlaa" })
        }

    } catch (err) {
        response.json({ status: false, message: err })
    }


};

exports.update = async (request, response) => {
    const { id } = request.params;
    if (!id)
        return response.json({ status: false, message: "user id not found" });
    try {
        const result = await userService.updateUser(id, request.body);
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
        return response.json({ status: false, message: "user id not found" });
    try {
        const result = await userService.deleteUser(id);
        console.log(result, "controller");
        if (result && result.affectedRows > 0) {
            response.json({ status: true, message: "Success" })
        } else {
            response.json({ status: true, message: "Ustgahad aldaa garlaa" })
        }

    } catch (err) {
        response.json({ status: false, message: err })
    }
};

exports.login = (request, response) => {
    const { email, password } = request.body;

    if (!email || !password)
        return response.json({
            status: false,
            message: "medeellee buren buglunu uu",
        });

    fs.readFile(dataFile, "utf-8", async (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = data ? JSON.parse(data) : [];
        let user;
        for (let i = 0; i < parsedData.length; i++) {
            if (email == parsedData[i].email) {
                const decrypt = await bcrypt.compare(
                    password + myKey,
                    parsedData[i].password
                );

                if (decrypt) {
                    user = {
                        id: parsedData[i].id,
                        email: parsedData[i].email,
                        lastname: parsedData[i].lastname,
                        firstname: parsedData[i].firstname,
                    };
                    break;
                }
            }
        }

        console.log(user);

        if (user) {
            return response.json({
                status: true,
                result: user,
            });
        } else {
            return response.json({
                status: false,
                message: "Tanii email eswel nuuts ug buruu bna",
            });
        }
    });
};