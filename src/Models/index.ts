import sequelize from "../Config/database";
import User from "./User";
import Role from "./Role";
import UserRole from "./UserRole";
import Student from "./Student";
import Teacher from "./Teacher";
import Parent from "./Parent";
import Admin from "./Admin";
import Class from "./Class";
import Subject from "./Subject";
import TeachingAssignment from "./TeachingAssignment";
import LearningMaterial from "./LearningMaterial";
import Assignment from "./Assignment";
import AssignmentSubmission from "./AssignmentSubmission";
import Exam from "./Exam";
import ExamQuestion from "./ExamQuestion";
import ExamResult from "./ExamResult";
import Attendance from "./Attendance";
import FinalGrade from "./FinalGrade";
import ActivityLog from "./ActivityLogs";
import Announcement from "./Announcement";
import SystemSetting from "./SystemSetting";

// Definisi Relasi

// Relasi Many-to-Many antara User dan Role
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id", as: "roles" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id", as: "users" });

// User <-> Student, Teacher, Parent, Admin (One-to-One)
User.hasOne(Student, { foreignKey: "user_id" });
Student.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Teacher, { foreignKey: "user_id" });
Teacher.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Parent, { foreignKey: "user_id" });
Parent.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Admin, { foreignKey: "user_id" });
Admin.belongsTo(User, { foreignKey: "user_id" });

// Student <-> Class (Many-to-One)
Class.hasMany(Student, { foreignKey: "class_id" });
Student.belongsTo(Class, { foreignKey: "class_id" });

// Student <-> Parent (Many-to-One)
Parent.hasMany(Student, { foreignKey: "parent_id" });
Student.belongsTo(Parent, { foreignKey: "parent_id" });

// Teaching Assignments (Many-to-One)
Teacher.hasMany(TeachingAssignment, { foreignKey: "teacher_id" });
TeachingAssignment.belongsTo(Teacher, { foreignKey: "teacher_id" });

Subject.hasMany(TeachingAssignment, { foreignKey: "subject_id" });
TeachingAssignment.belongsTo(Subject, { foreignKey: "subject_id" });

Class.hasMany(TeachingAssignment, { foreignKey: "class_id" });
TeachingAssignment.belongsTo(Class, { foreignKey: "class_id" });

// Learning Material (Many-to-One)
TeachingAssignment.hasMany(LearningMaterial, { foreignKey: "teaching_assignment_id" });
LearningMaterial.belongsTo(TeachingAssignment, { foreignKey: "teaching_assignment_id" });

Teacher.hasMany(LearningMaterial, { foreignKey: "created_by" });
LearningMaterial.belongsTo(Teacher, { foreignKey: "created_by" });

// Assignment (Many-to-One)
TeachingAssignment.hasMany(Assignment, { foreignKey: "teaching_assignment_id" });
Assignment.belongsTo(TeachingAssignment, { foreignKey: "teaching_assignment_id" });

Teacher.hasMany(Assignment, { foreignKey: "created_by" });
Assignment.belongsTo(Teacher, { foreignKey: "created_by" });

// Assignment Submission (Many-to-One)
Assignment.hasMany(AssignmentSubmission, { foreignKey: "assignment_id" });
AssignmentSubmission.belongsTo(Assignment, { foreignKey: "assignment_id" });

Student.hasMany(AssignmentSubmission, { foreignKey: "student_id" });
AssignmentSubmission.belongsTo(Student, { foreignKey: "student_id" });

// Exam (Many-to-One)
TeachingAssignment.hasMany(Exam, { foreignKey: "teaching_assignment_id" });
Exam.belongsTo(TeachingAssignment, { foreignKey: "teaching_assignment_id" });

Teacher.hasMany(Exam, { foreignKey: "created_by" });
Exam.belongsTo(Teacher, { foreignKey: "created_by" });

// Exam Question (Many-to-One)
Exam.hasMany(ExamQuestion, { foreignKey: "exam_id" });
ExamQuestion.belongsTo(Exam, { foreignKey: "exam_id" });

// Exam Result (Many-to-One)
Exam.hasMany(ExamResult, { foreignKey: "exam_id" });
ExamResult.belongsTo(Exam, { foreignKey: "exam_id" });

Student.hasMany(ExamResult, { foreignKey: "student_id" });
ExamResult.belongsTo(Student, { foreignKey: "student_id" });

// Attendance (Many-to-One)
TeachingAssignment.hasMany(Attendance, { foreignKey: "teaching_assignment_id" });
Attendance.belongsTo(TeachingAssignment, { foreignKey: "teaching_assignment_id" });

Student.hasMany(Attendance, { foreignKey: "student_id" });
Attendance.belongsTo(Student, { foreignKey: "student_id" });

// Final Grade (Many-to-One)
Student.hasMany(FinalGrade, { foreignKey: "student_id" });
FinalGrade.belongsTo(Student, { foreignKey: "student_id" });

TeachingAssignment.hasMany(FinalGrade, { foreignKey: "teaching_assignment_id" });
FinalGrade.belongsTo(TeachingAssignment, { foreignKey: "teaching_assignment_id" });

// Activity Log (Many-to-One)
User.hasMany(ActivityLog, { foreignKey: "user_id" });
ActivityLog.belongsTo(User, { foreignKey: "user_id" });

// Export semua model
export {
  sequelize,
  User,
  Role,
  UserRole,
  Student,
  Teacher,
  Parent,
  Admin,
  Class,
  Subject,
  TeachingAssignment,
  LearningMaterial,
  Assignment,
  AssignmentSubmission,
  Exam,
  ExamQuestion,
  ExamResult,
  Attendance,
  FinalGrade,
  ActivityLog,
  Announcement,
  SystemSetting,
};
