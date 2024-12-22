// components/experiments/PendulumExperiment.tsx
import { useState, useEffect } from "react";
import Slider from "../ui/slider";
import Button from "../ui/button";
import Label from "../ui/label";

const PendulumExperiment = () => {
  const [length, setLength] = useState(100);
  const [gravity, setGravity] = useState(9.81);
  const [angle, setAngle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      if (isRunning) {
        // T = 2π√(L/g) is the period of a pendulum
        const period = 2 * Math.PI * Math.sqrt(length / gravity);
        // Calculate angle based on simple harmonic motion
        const newAngle = 30 * Math.cos(2 * Math.PI * time / period);
        setAngle(newAngle);
        setTime(prev => prev + 0.016); // Approximately 60 FPS
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isRunning) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRunning, length, gravity, time]);

  const resetSimulation = () => {
    setTime(0);
    setAngle(0);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full relative bg-gray-50 rounded-lg">
        <div className="absolute top-0 left-1/2 origin-top"
             style={{
               height: `${length}px`,
               transform: `rotate(${angle}deg)`,
               transition: 'height 0.3s ease, transform 0.016s linear'
             }}>
          <div className="w-0.5 h-full bg-gray-800" />
          <div className="w-4 h-4 rounded-full bg-blue-500 -ml-[6px]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Pendulum Length (cm)</Label>
          <Slider
            value={[length]}
            onValueChange={([value]) => setLength(value)}
            min={50}
            max={200}
            step={1}
            disabled={isRunning}
          />
          <span>{length} cm</span>
        </div>

        <div className="space-y-2">
          <Label>Gravity (m/s²)</Label>
          <Slider
            value={[gravity]}
            onValueChange={([value]) => setGravity(value)}
            min={1}
            max={20}
            step={0.1}
            disabled={isRunning}
          />
          <span>{gravity} m/s²</span>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
          >
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button onClick={resetSimulation} variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendulumExperiment;
