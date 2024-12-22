"use client"

// components/experiments/ParticleMotionExperiment.tsx
import { useState, useEffect, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import Slider from "../ui/slider";
import Button from "../ui/button";
import Label from "../ui/label";

const ParticleMotionExperiment = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"solid" | "liquid" | "gas">("solid");
  const [temperature, setTemperature] = useState(50);
  const [particles, setParticles] = useState<Array<{x: number; y: number; dx: number; dy: number}>>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isRunning) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const speed = {
        solid: 0.2,
        liquid: 1,
        gas: 3
      }[state] * (temperature / 50);

      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, dx, dy } = particle;

          // Update position
          x += dx * speed;
          y += dy * speed;

          // Bounce off walls
          if (x < 0 || x > canvas.width) dx = -dx;
          if (y < 0 || y > canvas.height) dy = -dy;

          // Draw particle
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#3b82f6";
          ctx.fill();

          return { x, y, dx, dy };
        })
      );

      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, [isRunning, state, temperature]);

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
          <Label>State of Matter</Label>
          <Select value={state} onValueChange={(value: "solid" | "liquid" | "gas") => setState(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="liquid">Liquid</SelectItem>
              <SelectItem value="gas">Gas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Temperature</Label>
          <Slider
            value={[temperature]}
            onValueChange={([value]) => setTemperature(value)}
            min={0}
            max={100}
            step={1}
          />
          <span>{temperature}°</span>
        </div>

        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"} Simulation
        </Button>
      </div>
    </div>
  );
};

export default ParticleMotionExperiment;
