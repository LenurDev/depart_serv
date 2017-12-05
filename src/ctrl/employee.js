import EmployeeService from '../service/employee';
import EmployeeValidator from '../validator/employee';
import DepartmentService from '../service/department';


export default {

    findEmployeeById: (req, res, next) => {
        const { params: { id }} = req;

        EmployeeService.findEmployeeById(id)
            .then((employee) => {
                if (null == employee){
                    return next(404);
                }

                res.json(employee);
            });
    },

    findAllEmployees: (req, res) => {
        EmployeeService.findAllEmployees()
            .then(employees => {
                let departmentId = employees.map(employee => employee.departmentId);

                DepartmentService.findAllDepartmentsById(Array.from(new Set(departmentId)))
                    .then(departments => {
                        employees = employees.map(employee => {
                            let e = JSON.parse(JSON.stringify(employee));
                            e.department = departments[e.departmentId];
                            delete e['departmentId'];

                            return e;
                        });

                        res.json(employees);    
                    });
            });
    },

    findAllEmployeesByDepartmentId: (req, res, next) => {
        const { params: { id }} = req;

        DepartmentService.findDepartmentById(id)
            .then(department => {
                if (null == department)
                    return next(404);

                EmployeeService.findAllEmployeesByDepartmentId(id)
                    .then(employees => {
                        employees = employees.map(employee => {
                            let e = JSON.parse(JSON.stringify(employee));
                            e.department = departments[e.departmentId];
                            delete e['departmentId'];

                            return e;
                        });

                        res.json(employees)
                    });
            });
    },

    createEmployee: (req, res) => {
        EmployeeValidator.validateEntity(req.body)
            .then(() => {
                EmployeeService.addEmployee(req.body)
                    .then((employee) => res.json(employee));
            })
            .catch((err) => {
                res.status(400).json({
                    errors: err
                });
            });
    },

    updateEmployee: (req, res) => {
        EmployeeValidator.validateEntity(req.body)
            .then(() => {
                const { params: { id }} = req;

                EmployeeService.updateEmployee(id, req.body)
                    .then((employee) => res.json(employee));
            })
            .catch((err) => {
                res.status(400).json({
                    errors: err
                });
            });

    },

    deleteEmployee: (req, res) => {
        const { params: { id }} = req;

        EmployeeService.deleteEmployee(id)
            .then(() => res.end());
    }

};
