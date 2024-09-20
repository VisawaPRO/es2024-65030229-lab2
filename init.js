db = new Mongo().getDB("mydatabase");

db.students.insertMany([
    { studentCode: "S001", firstName: "John", lastName: "Doe", age: 21, email: "john@example.com" },
    { studentCode: "S002", firstName: "Jane", lastName: "Doe", age: 22, email: "jane@example.com" }
]);

