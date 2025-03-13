const models = require("../models");
const jwt = require("jsonwebtoken");

const LogIn = async (emp_no, password) => {
    emp_no = String(emp_no).toLocaleLowerCase()

    let get_password = await models.Authentication.findOne({
        where: { emp_no: emp_no },
        raw: true
    })

    if (get_password == null) {
        return {
            result: "ng",
            detail: "emp no not found"
        }
    }
    if (get_password.password != password) {
        return {
            result: "ng",
            detail: "password incorrect"
        }
    }

    return {
        result: "ok",
        detail: {
            emp_no: get_password.emp_no,
            email: get_password.email,
            signup_status: get_password.signup_status,
        }
    }

}

const LogInJwt = async (emp_no, password) => {
    const createToken = (emp_no) => {
        const token = jwt.sign(
            { emp_no: emp_no },
            "secret",
            {
                expiresIn: 15,
            }
        );
        return token;
    }
    emp_no = String(emp_no).toLocaleLowerCase()

    let get_password = await models.Authentication.findOne({
        where: { emp_no: emp_no },
        raw: true
    })

    if (get_password == null) {
        return {
            result: "ng",
            detail: "emp no not found"
        }
    }
    if (get_password.password != password) {
        return {
            result: "ng",
            detail: "password incorrect"
        }
    }
    const token = await createToken(emp_no)
    return {
        result: "ok",
        detail: {
            emp_no: get_password.emp_no,
            email: get_password.email,
            signup_status: get_password.signup_status,
            token: token
        }
    }

}


const GetAuthen = async () => {
    try {
        return await models.Authentication.findAll({
            raw: true
        })
    } catch (error) {
        throw { result: 'ng', detail: error.name }
    }

}

module.exports = { LogIn, LogInJwt, GetAuthen }