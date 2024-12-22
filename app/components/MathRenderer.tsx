// components/MathRenderer.tsx
import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface MathRendererProps {
  formula: string;
  inline?: boolean;
}

const MathRenderer: React.FC<MathRendererProps> = ({ formula, inline = false }) => {
  return inline ? <InlineMath math={formula} /> : <BlockMath math={formula} />;
};

export default MathRenderer;
