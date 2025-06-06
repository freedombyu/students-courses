const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://localhost:27017"; // Change if needed
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('yourDatabaseName');
    const students = [
      { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", studentId: "S10001", enrolledCourses: ["CSE-341", "WDD-321"] },
      { firstName: "Bob", lastName: "Smith", email: "bob.smith@example.com", studentId: "S10002", enrolledCourses: ["WDD-330"] },
      { firstName: "Carol", lastName: "Williams", email: "carol.williams@example.com", studentId: "S10003", enrolledCourses: [] },
      { firstName: "David", lastName: "Brown", email: "david.brown@example.com", studentId: "S10004", enrolledCourses: ["CSE-341"] },
      { firstName: "Eva", lastName: "Davis", email: "eva.davis@example.com", studentId: "S10005", enrolledCourses: ["WDD-321", "WDD-330"] },
      { firstName: "Frank", lastName: "Miller", email: "frank.miller@example.com", studentId: "S10006", enrolledCourses: [] }
    ];
    const result = await db.collection('students').insertMany(students);
    console.log(`Inserted ${result.insertedCount} students!`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);