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

module.exports = {
  all,
  add,
};
