import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const RutherfordExperiment = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [foilThickness, setFoilThickness] = useState(0.6); // in microns
  const [alphaParticles, setAlphaParticles] = useState<Array<{x: number; y: number; dx: number; dy: number; deflected: boolean}>>([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize alpha particles
    const initialParticles = Array.from({ length: 50 }, () => ({
      x: 50,
      y: Math.random() * canvas.height,
      dx: 2,
      dy: 0,
      deflected: false
    }));
    setAlphaParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isRunning) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gold foil
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = foilThickness;
      ctx.stroke();

      setAlphaParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, dx, dy, deflected } = particle;

          // Check for collision with gold foil
          if (x > canvas.width / 2 - foilThickness/2 && x < canvas.width / 2 + foilThickness/2 && !deflected) {
            // 1 in 10000 chance of significant deflection
            if (Math.random() < 0.0001) {
              const angle = (Math.random() - 0.5) * Math.PI;
              dx = 2 * Math.cos(angle);
              dy = 2 * Math.sin(angle);
              deflected = true;
            }
          }

          // Update position
          x += dx;
          y += dy;

          // Draw particle
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = deflected ? "#ff0000" : "#0000ff";
          ctx.fill();

          // Reset particle if it goes off screen
          if (x > canvas.width || x < 0 || y > canvas.height || y < 0) {
            x = 50;
            y = Math.random() * canvas.height;
            dx = 2;
            dy = 0;
            deflected = false;
          }

          return { x, y, dx, dy, deflected };
        })
      );

      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, [isRunning, foilThickness]);

  return (
    <div className="space-y-6">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full bg-gray-50 rounded-lg"
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Gold Foil Thickness (microns)</Label>
          <Slider
            value={[foilThickness]}
            onValueChange={([value]) => setFoilThickness(value)}
            min={0.1}
            max={2}
            step={0.1}
          />
        </div>

        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"} Experiment
        </Button>
      </div>
    </div>
  );
};

export default RutherfordExperiment;