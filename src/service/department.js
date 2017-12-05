export default {

    findDepartmentById: ( id ) => {
        const { departments = [] } = global;

        for (let i in departments){
            if (departments[i].id == id)
                return Promise.resolve(departments[i]);
        }

        return Promise.resolve(null);
    },

    findAllDepartmentsById: ( id = [] ) => {
        const { departments = [] } = global;
        let result = {};

        for (let i in departments){
            if (id.indexOf(departments[i].id) !== -1)
                result[departments[i].id] = departments[i];
        }

        return Promise.resolve(result);
    },

    findAllDepartments: () => {
        const { departments = [] } = global;

        return Promise.resolve(departments);
    },

    addDepartment: ( department ) => {
        const { departments = [] } = global;

        department.id = departments.length > 0
            ? departments[departments.length - 1].id + 1
            : 1;

        departments.push(department);

        global.departments = departments;

        return Promise.resolve(department);
    },

    updateDepartment: ( id, department ) => {
        const { departments = [] } = global;

        for ( let i in departments ){
            if (departments[i].id == id) {
                department.id = id;
                departments[i] = department;
                global.departments = departments;

                return Promise.resolve(department);
            }
        }

        return Promise.resolve();
    },

    deleteDepartment: ( id ) => {
        const { departments = [] } = global;

        for ( let i in departments ) {
            if (departments[i].id == id) {
                departments.splice(i, 1);
                global.departments = departments;

                break;
            }
        }

        return Promise.resolve();
    }
};
