// app/grades/[grade]/chapters/[chapter]/page.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MathRenderer from '@/app/components/MathRenderer';
import ExperimentCard from '@/app/components/ExperimentCard';
import ParticleMotionExperiment from '@/app/components/experiments/ParticleMotionExperiment';
import RutherfordExperiment from '@/app/components/experiments/RutherfordExperiment';
import GasLawsExperiment from '@/app/components/experiments/GasLawsExperiment';
import PendulumExperiment from '@/app/components/experiments/PendulumExperiment';
import SortingExperiment from '@/app/components/experiments/SortingExperiment';

const chapterContent = {
  'algebra': {
    description: "Introduction to Algebra",
    formulas: ["a^2 + b^2 = c^2", "y = mx + b"],
    experiments: []
  },
  'geometry': {
    description: "Basics of Geometry",
    formulas: ["Area = πr^2", "Volume = \\frac{4}{3}πr^3"],
    experiments: []
  },
  'biology': {
    description: "Fundamentals of Biology",
    formulas: [],
    experiments: []
  },
  'trigonometry': {
    description: "Understanding Trigonometry",
    formulas: ["sin^2θ + cos^2θ = 1", "tanθ = \\frac{sinθ}{cosθ}"],
    experiments: []
  },
  'chemistry': {
    description: "Chemistry Concepts",
    formulas: ["PV = nRT", "E = mc^2"],
    experiments: [GasLawsExperiment, RutherfordExperiment]
  },
  'physics': {
    description: "Physics Principles",
    formulas: ["F = ma", "E = \\frac{1}{2}mv^2"],
    experiments: [ParticleMotionExperiment, PendulumExperiment]
  },
  'calculus': {
    description: "Calculus Introduction",
    formulas: ["\\frac{d}{dx}x^n = nx^{n-1}", "\\int x dx = \\frac{1}{2}x^2 + C"],
    experiments: []
  },
  'organic-chemistry': {
    description: "Organic Chemistry Basics",
    formulas: [],
    experiments: []
  },
  'electricity': {
    description: "Electricity and Magnetism",
    formulas: ["V = IR", "P = IV"],
    experiments: []
  },
  'statistics': {
    description: "Statistics Fundamentals",
    formulas: ["\\mu = \\frac{\\sum{x}}{N}", "\\sigma^2 = \\frac{\\sum{(x - \\mu)^2}}{N}"],
    experiments: [SortingExperiment]
  },
  'physical-chemistry': {
    description: "Physical Chemistry Concepts",
    formulas: ["\\Delta G = \\Delta H - T\\Delta S"],
    experiments: []
  },
  'thermodynamics': {
    description: "Thermodynamics Principles",
    formulas: ["\\Delta U = Q - W"],
    experiments: []
  },
};

const ChapterPage = () => {
  const router = useRouter();
  const { grade, chapter } = router.query;
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (chapter && typeof chapter === 'string') {
      setContent(chapterContent[chapter.toLowerCase()] || null);
    }
  }, [chapter]);

  if (!content) {
    return <div>Loading...</div>;
  }

  const { description, formulas, experiments } = content;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{chapter.replace(/-/g, ' ')} Chapter</h2>
      <p className="mb-4">{description}</p>
      
      {formulas.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Key Formulas</h3>
          <ul className="list-disc list-inside space-y-2">
            {formulas.map((formula, index) => (
              <li key={index}>
                <MathRenderer formula={formula} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {experiments.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Interactive Experiments</h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {experiments.map((ExperimentComponent, index) => (
              <ExperimentCard
                key={index}
                title={`${ExperimentComponent.name.replace(/([A-Z])/g, ' $1').trim()}`}
                description={`Explore the ${ExperimentComponent.name.replace(/([A-Z])/g, ' $1').trim()} experiment.`}
                subject="chemistry" // Adjust subject based on experiment
              >
                <ExperimentComponent />
              </ExperimentCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterPage;
