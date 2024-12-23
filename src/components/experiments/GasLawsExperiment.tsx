import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GasLawsExperiment = () => {
  const [pressure, setPressure] = useState(1); // in atm
  const [volume, setVolume] = useState(1); // in L
  const [temperature, setTemperature] = useState(273); // in K
  const [selectedLaw, setSelectedLaw] = useState<"boyle" | "charles" | "gay-lussac">("boyle");

  const calculateNewValue = () => {
    const R = 0.08206; // Gas constant in L⋅atm/(mol⋅K)
    const n = 1; // Number of moles (fixed for simplicity)

    switch (selectedLaw) {
      case "boyle":
        // P₁V₁ = P₂V₂ (constant T)
        return (pressure * volume) / temperature;
      case "charles":
        // P₁/T₁ = P₂/T₂ (constant V)
        return (pressure * temperature) / volume;
      case "gay-lussac":
        // V₁/T₁ = V₂/T₂ (constant P)
        return (volume * temperature) / pressure;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Gas Law</Label>
          <Select value={selectedLaw} onValueChange={(value: "boyle" | "charles" | "gay-lussac") => setSelectedLaw(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boyle">Boyle's Law (PV = k)</SelectItem>
              <SelectItem value="charles">Charles's Law (P/T = k)</SelectItem>
              <SelectItem value="gay-lussac">Gay-Lussac's Law (V/T = k)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Pressure (atm)</Label>
          <Slider
            value={[pressure]}
            onValueChange={([value]) => setPressure(value)}
            min={0.1}
            max={5}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Volume (L)</Label>
          <Slider
            value={[volume]}
            onValueChange={([value]) => setVolume(value)}
            min={0.1}
            max={5}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Temperature (K)</Label>
          <Slider
            value={[temperature]}
            onValueChange={([value]) => setTemperature(value)}
            min={273}
            max={373}
            step={1}
          />
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-semibold">Calculated Value: {calculateNewValue().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default GasLawsExperiment;