// components/Menu.tsx
import Link from "next/link";

const grades = ["9th", "10th", "11th", "12th"];

const Menu = () => {
  return (
    <nav className="w-64 bg-white shadow-md h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Grades</h2>
      <ul>
        {grades.map((grade) => (
          <li key={grade} className="mb-4">
            <Link 
              href={`/grades/${grade.toLowerCase()}`} 
              className="text-lg text-blue-500 hover:underline"
            >
              {grade} Grade
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
