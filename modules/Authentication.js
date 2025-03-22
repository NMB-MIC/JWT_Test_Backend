const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (emp_no, password, repassword, email) => {
  emp_no = String(emp_no).toLowerCase();
  if (String(emp_no).length != 5) {
    return {
      result: "ng",
      detail: "emp no out of range must be 5 digit",
    };
  }
  let get_emp_no = await models.Authentication.findOne({
    where: { emp_no: emp_no },
    raw: true,
  });
  if (!String(email).includes("@minebea")) {
    return {
      result: "ng",
      detail: "must be use only minebea email",
    };
  }
  if (password != repassword) {
    return {
      result: "ng",
      detail: "password do not match",
    };
  }
  if (String(password).length < 8) {
    return {
      result: "ng",
      detail: "password range must be at least 8",
    };
  }

  if (get_emp_no != null) {
    if (get_emp_no.emp_no == emp_no) {
      return {
        result: "ng",
        detail: "emp no already exist",
      };
    }
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  try {
    await models.Authentication.create({
      emp_no: emp_no,
      password: hashedPassword,
      email: email,
      signup_status: "deactivate",
    });
  } catch (error) {
    if (e.name == "SequelizeUniqueConstraintError") {
      return {
        result: "ng",
        detail: "email already exist",
      };
    } else {
      return {
        result: "ng",
        detail: e.name,
      };
    }
  }
  return {
    result: "ok",
    detail: "successful",
  };
};

const LogIn = async (emp_no, password) => {
  emp_no = String(emp_no).toLocaleLowerCase();

  let get_password = await models.Authentication.findOne({
    where: { emp_no: emp_no },
    raw: true,
  });

  if (get_password == null) {
    return {
      result: "ng",
      detail: "emp no not found",
    };
  }
  if (!bcrypt.compareSync(password, get_password.password)) {
    return {
      result: "ng",
      detail: "password incorrect",
    };
  }

  return {
    result: "ok",
    detail: {
      emp_no: get_password.emp_no,
      email: get_password.email,
      signup_status: get_password.signup_status,
    },
  };
};

const LogInJwt = async (emp_no, password) => {
  const createToken = (emp_no) => {
    const token = jwt.sign({ emp_no: emp_no }, "secret", {
<<<<<<< HEAD
      expiresIn: '2min',
=======
      expiresIn: '5min',
>>>>>>> 957b140 (update)
    });
    return token;
  };
  emp_no = String(emp_no).toLocaleLowerCase();
<<<<<<< HEAD

=======
>>>>>>> 957b140 (update)
  let get_password = await models.Authentication.findOne({
    where: { emp_no: emp_no },
    raw: true,
  });
  console.log(get_password);
  if (get_password == null) {
    return {
      result: "ng",
      detail: "emp no not found",
    };
  }
  if (!bcrypt.compareSync(password, get_password.password)) { 
    // if not bcrypt password not match  , (get_password.password != password)
    return {
      result: "ng",
      detail: "password incorrect",
    };
  }
  const token = await createToken(emp_no);
  return {
    result: "ok",
    detail: {
      emp_no: get_password.emp_no,
      email: get_password.email,
      signup_status: get_password.signup_status,
      token: token,
    },
  };
};

const GetAuthen = async () => {
  try {
    return await models.Authentication.findAll({
      // raw: true,
    });
  } catch (error) { 
    throw { result: "ng", detail: error.name };  //ถ้ามีข้อผิดพลาดเกิดขึ้น จะ throw error กลับไปโดยกำหนดรูปแบบเป็น JSON object
  }
};

const AcceptSignUp = async (emp_no) => {
  try {
    let signup_status = "activate";
    await models.Authentication.update(
      { signup_status: signup_status },
      { where: { emp_no: emp_no } }
    );
  } catch (error) {
    throw { result: "ng", detail: error.name };
  }
  return {
    result: "ok",
    detail: "update ok",
  };
};

module.exports = { LogIn, LogInJwt, GetAuthen, SignUp, AcceptSignUp };
