// app/grades/[grade]/page.tsx
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Accordion } from '@radix-ui/react-accordion';
import MathRenderer from '@/app/components/MathRenderer';

const gradeChapters = {
  '9th': ['Algebra', 'Geometry', 'Biology'],
  '10th': ['Trigonometry', 'Chemistry', 'Physics'],
  '11th': ['Calculus', 'Organic Chemistry', 'Electricity'],
  '12th': ['Statistics', 'Physical Chemistry', 'Thermodynamics'],
};

const GradePage = () => {
  const router = useRouter();
  const { grade } = router.query;
  const [chapters, setChapters] = useState<string[]>([]);

  useEffect(() => {
    if (grade && typeof grade === 'string') {
      setChapters(gradeChapters[grade.toLowerCase()] || []);
    }
  }, [grade]);

  if (!grade) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{grade} Grade</h2>
      <Accordion type="single" collapsible>
        {chapters.map((chapter) => (
          <Accordion.Item key={chapter} value={chapter}>
            <Accordion.Trigger>{chapter}</Accordion.Trigger>
            <Accordion.Content>
              <p>This is the {chapter} chapter content.</p>
              {/* Example of rendering a math formula */}
              <MathRenderer formula={"E = mc^2"} />
              {/* Link to the chapter page */}
              <Link href={`/grades/${grade}/chapters/${chapter.toLowerCase().replace(/\s+/g, '-')}`}>
                <a className="text-blue-500 underline">Go to {chapter} Chapter</a>
              </Link>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default GradePage;
