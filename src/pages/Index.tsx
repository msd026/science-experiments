import ExperimentCard from "@/components/ExperimentCard";
import ParticleMotionExperiment from "@/components/experiments/ParticleMotionExperiment";
import RutherfordExperiment from "@/components/experiments/RutherfordExperiment";
import GasLawsExperiment from "@/components/experiments/GasLawsExperiment";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Interactive Chemistry Experiments
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore atomic structure, states of matter, and gas laws through interactive simulations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ExperimentCard
            title="Rutherford's Gold Foil"
            description="Visualize alpha particle scattering in Rutherford's famous experiment"
            subject="chemistry"
          >
            <RutherfordExperiment />
          </ExperimentCard>

          <ExperimentCard
            title="States of Matter"
            description="Visualize particle behavior in different states of matter"
            subject="chemistry"
          >
            <ParticleMotionExperiment />
          </ExperimentCard>

          <ExperimentCard
            title="Gas Laws"
            description="Explore the relationships between pressure, volume, and temperature"
            subject="chemistry"
          >
            <GasLawsExperiment />
          </ExperimentCard>
        </div>
      </div>
    </div>
  );
};

export default Index;