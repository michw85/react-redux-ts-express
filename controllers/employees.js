const { prisma } = require("../prisma/prisma-client");

/**
 *
 * @route GET /api/employees
 * @desc Get all employees
 * @access Private
 */

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch {
    // something went wrong on the server - 500
    res.status(500).json({ message: "Can't get employees" });
  }
};

/**
 *
 * @route POST /api/employees/add
 * @desc Add employees
 * @access Private
 */

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      // user error
      return res.status(400).json({ message: "all fields are required" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id, // from middleware
      },
    });

    return res.status(201).json(employee);
  } catch {
    // something went wrong on the server - 500
    res.status(500).json({ message: "something went wrong" });
  }
};

/**
 *
 * @route POST /api/employees/remove/:id
 * @desc Remove employees
 * @access Private
 */

const remove = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    return res.status(204).json("OK");
  } catch {
    // something went wrong on the server - 500
    res.status(500).json({ message: "Failed to delete employee" });
  }
};

/**
 *
 * @route PUT /api/employees/edit/:id
 * @desc Edit employees
 * @access Private
 */

const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;

    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    return res.status(204).json("OK");
  } catch {
    // something went wrong on the server - 500
    res.status(500).json({ message: "Failed to edit employee" });
  }
};

/**
 *
 * @route GET /api/employees/:id
 * @desc Get employees
 * @access Private
 */

const employee = async (req, res) => {
  try {
    const { id } = req.params; // http://localhost:8000/api/employees/b48f395a-e8fa-43d1-bca8-144c009df9b3

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json(employee);
  } catch {
    // something went wrong on the server - 500
    res.status(500).json({ message: "Failed to get employee" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
