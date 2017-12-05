import express from 'express';
import departmentCtrl from './ctrl/department';
import employeeCtrl from './ctrl/employee';

let _ = express.Router();

_.get   ('/departments',                departmentCtrl.findAllDepartments   );
_.get   ('/departments/:id',            departmentCtrl.findDepartmentById   );
_.post  ('/departments',                departmentCtrl.createDepartment     );
_.put   ('/departments/:id',            departmentCtrl.updateDepartment     );
_.delete('/departments/:id',            departmentCtrl.deleteDepartment     );
_.get   ('/departments/:id/employees',  employeeCtrl.findAllEmployeesByDepartmentId );

_.get   ('/employees',        employeeCtrl.findAllEmployees );
_.get   ('/employees/:id',    employeeCtrl.findEmployeeById );
_.post  ('/employees',        employeeCtrl.createEmployee   );
_.put   ('/employees/:id',    employeeCtrl.updateEmployee   );
_.delete('/employees/:id',    employeeCtrl.deleteEmployee   );

export default _;
