const students = [
  { id: 1, name: 'Alice Johnson', age: 20, grades: [85, 92, 78] },
  { id: 2, name: 'Bob Smith', age: 22, grades: [55, 48, 60] },
  { id: 3, name: 'Brown George', age: 21, grades: [90, 95, 92] },
  { id: 4, name: 'Adam Jubril', age: 23, grades: [70, 75, 80] },
  { id: 5, name: 'Adebayo Titilope', age: 24, grades: [40, 45, 50] }
];

console.log("=== Initial Students Array ===");
console.log(students);


// QUESTION 2: Calculate Averages
/**
 * Calculates the average of an array of grades and rounds to 2 decimal places.
 * @param {Array<number>} grades - Array of numeric grades
 * @returns {number} Rounded average grade
 */
function calculateAverage(grades) {
  if (grades.length === 0) return 0;
  
  // Use reduce() to sum up all the grades in the array
  const sum = grades.reduce((accumulator, current) => accumulator + current, 0);
  const average = sum / grades.length;
  
  // Return the average rounded to 2 decimal places (converted back to a number)
  return Number(average.toFixed(2));
}

// Use map() to create a new array with an added 'average' property for each student
const studentsWithAverage = students.map(student => {
  return {
    ...student, // Copies id, name, age, and grades over safely
    average: calculateAverage(student.grades) // Adds the new property
  };
});

console.log("=== Students With Average ===");
console.log(studentsWithAverage);


// QUESTION 3: Filter Passing Students
/**
 * Filters the students array to return only those with an average >= 60.
 * @param {Array<Object>} studentsArr - Array of student objects with averages
 * @returns {Array<Object>} Filtered array of passing students
 */
function getPassingStudents(studentsArr) {
  return studentsArr.filter(student => student.average >= 60);
}

const passingStudents = getPassingStudents(studentsWithAverage);

console.log("=== Passing Students (Average >= 60) ===");
console.log(passingStudents);


// QUESTION 4: Functions & Callbacks
/**
 * Higher-order function that processes an array of students using a callback function.
 * @param {Array<Object>} studentsArr - Array of student objects
 * @param {Function} callback - Transformation function to apply to each student
 * @returns {Array<Object>} New array with transformed student objects
 */
function processStudents(studentsArr, callback) {
  return studentsArr.map(student => callback(student));
}

/**
 * Callback function to add a letterGrade property based on the student's average.
 * A: 90+, B: 80+, C: 70+, D: 60+, F: below 60
 * @param {Object} student - Single student object
 * @returns {Object} Student object with added letterGrade property
 */
function addLetterGrade(student) {
  let letterGrade = 'F';
  
  if (student.average >= 90) {
    letterGrade = 'A';
  } else if (student.average >= 80) {
    letterGrade = 'B';
  } else if (student.average >= 70) {
    letterGrade = 'C';
  } else if (student.average >= 60) {
    letterGrade = 'D';
  }

  return {
    ...student, // Copies existing properties (including average) over safely
    letterGrade: letterGrade // Adds the letter grade property
  };
}

/**
 * Callback function to add a status property ("Pass" or "Fail").
 * @param {Object} student - Single student object
 * @returns {Object} Student object with added status property
 */
function addStatus(student) {
  return {
    ...student, // Copies existing properties over safely
    status: student.average >= 60 ? 'Pass' : 'Fail' // Adds the status property
  };
}

// Testing Process Students with Letter Grades Callback
const studentsWithGrades = processStudents(studentsWithAverage, addLetterGrade);
console.log("=== Students with Letter Grades ===");
console.log(studentsWithGrades);

// Testing Process Students with Status Callback
const studentsWithStatus = processStudents(studentsWithAverage, addStatus);
console.log("=== Students with Status ===");
console.log(studentsWithStatus);