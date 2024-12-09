const express = require("express");
const router = require("router");
const { auth } = require("../middleware/auth");
const { all } = require("../controllers/employees");

// /api/employees
router.get("/", auth, all);
// /api/employees/:id
router.get("/:id", auth, () => console.log("get single employees"));
// /api/employees/add
router.post("/add", auth, () => console.log("get employees"));
// /api/employees/remove/:id
router.post("/remove/:id", auth, () => console.log("remove employees"));
// /api/employees/edit/:id
router.put("/edit/:id", auth, () => console.log("edit employees"));

module.exports = router;
