import DepartmentService from '../service/department';
import EmployeeService from '../service/employee';
import DepartmentValidator from '../validator/department';

export default {

    findDepartmentById: (req, res) => {
        const { params: { id }} = req;

        DepartmentService.findDepartmentById(id)
            .then((department) => res.json(department));
    },

    findAllDepartments: (req, res) => {
        const { params: { offset = 0, limit = 20 }} = req;

        DepartmentService.findAllDepartments()
            .then((depatments) => res.json(depatments));
    },

    createDepartment: (req, res) => {
        DepartmentValidator.validateEntity(req.body)
            .then(() => {
                DepartmentService.addDepartment(req.body)
                    .then((department) => res.json(department));
            })
            .catch((err) => {
                res.status(400).json({
                    errors: err
                });
            });
    },

    updateDepartment: (req, res) => {
        DepartmentValidator.validateEntity(req.body)
            .then(() => {
                const { params: { id }} = req;

                DepartmentService.updateDepartment(id, req.body)
                    .then((department) => res.json(department));
            })
            .catch((err) => {
                res.status(400).json({
                    errors: err
                });
            });
    },

    deleteDepartment: (req, res) => {
        const { params: { id }} = req;

        DepartmentService.deleteDepartment(id)
            .then(() => {
                EmployeeService.deleteEmployeesByDepartmentId(id)
                    .then(() => res.end());
            });
    }

};
