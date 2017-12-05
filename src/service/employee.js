export default {

    findEmployeeById: ( id ) => {
        const { employees = [] } = global;

        for (let i in employees){
            if (employees[i].id == id)
                return Promise.resolve(employees[i]);
        }

        return Promise.resolve(null);
    },

    findAllEmployees: () => {
        const { employees = [] } = global;

        return Promise.resolve(employees);
    },

    findAllEmployeesByDepartmentId: ( departmentId ) => {
        const { employees = [] } = global;
        let filteredEmployees = employees.filter((employee) => employee.departmentId == departmentId );

        return Promise.resolve(filteredEmployees);
    },

    addEmployee: ( employee ) => {
        const { employees = [] } = global;

        employee.id = employees.length > 0
            ? employees[employees.length - 1].id + 1
            : 1;

        employees.push(employee);
        global.employees = employees;

        return Promise.resolve(employee);
    },

    updateEmployee: ( id, employee ) => {
        const { employees = [] } = global;

        for ( let i in employees ){
            if (employees[i].id == id) {
                employee.id = id;
                employees[i] = employee;
                global.employees = employees;

                return Promise.resolve(employee);
            }
        }

        return Promise.resolve();
    },

    deleteEmployee: ( id ) => {
        const { employees = [] } = global;

        for ( let i in employees ){
            if (employees[i].id == id) {
                employees.splice(i, 1);
                global.employees = employees;

                break;
            }
        }

        return Promise.resolve();
    },

    deleteEmployeesByDepartmentId: ( departmentId ) => {
        const { employees = [] } = global;
        global.employees = employees.filter(employee => employee.departmentId != departmentId);

        return Promise.resolve();
    }

};
