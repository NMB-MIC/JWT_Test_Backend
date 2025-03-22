const express = require("express");
const router = express.Router();
const moduleUsage = require("../modules/Authentication");
const jwt = require("../middlewares/jwt");


router.post("/singup", async (req, res) => {
    try {
        let { emp_no, password, repassword, email } = req.body
        let result = await moduleUsage.SignUp(emp_no, password, repassword, email)
        console.log(result)
        res.send(result);
    } catch (error) {
    }
}); 

router.get("/open", async (req, res) => {
  try {
    console.log("hi");
    res.send({ msg: "hi" });
  } catch (error) {
    res.send(error)
  }
});

router.post("/singup", async (req, res) => {
  try {
    let { emp_no, password, repassword, email } = req.body;
    let result = await moduleUsage.SignUp(emp_no, password, repassword, email);
    console.log(result);
    res.send(result);
  } catch (error) {}
});

// router.get(`/login`, async (req, res) => {
//   try {
//     let username = req.query.username;
//     let password = req.query.password;
//     let result = await moduleUsage.LogIn(username, password);
//     res.send(result);
//   } catch (error) {}
// });

// router.get("/login-jwt", async (req, res) => {
//   try {
//     let username = req.query.username;
//     let password = req.query.password;
//     let result = await moduleUsage.LogInJwt(username, password);
//     res.send(result);
//   } catch (error) {}
// });
router.post(`/login`, async (req, res) => {

    try {
      let emp_no = req.body.emp_no;
      let password = req.body.password;
      let result = await moduleUsage.LogIn(emp_no, password);
      res.send(result);
    } catch (error) {}
  });

router.post("/login-jwt", async (req, res) => {
    try {
      let emp_no = req.body.emp_no;
      let password = req.body.password;
      let result = await moduleUsage.LogInJwt(emp_no, password);
      console.log(result)
      res.send(result);
    } catch (error) {}
  });


router.get("/get_authen", async (req, res) => {
  try {
    let result = await moduleUsage.GetAuthen();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get_authen_jwt", jwt.verifyToken, async (req, res) => {
  try {
    let result = await moduleUsage.GetAuthen();
    res.send(result);
    // res.json({ result: "ok", result });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/accept_signup', jwt.verifyToken, async (req, res) => {
    try {
        const { emp_no } = req.body
        let result = await moduleUsage.AcceptSignUp(emp_no)
        res.send(result)
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;
