const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    employeeName: String,
    designation: String,
    empIdNo: Number,
    dateOfBirth: Date,
    mailId: String,
    telNo: String,
    address: String,
    employeeProfileImageUrl: String,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;