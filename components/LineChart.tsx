
import React from 'react';

interface LineChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, color, width = 300, height = 150 }) => {
  if (!data || data.length < 2) {
    return null;
  }

  const yMax = Math.max(...data);
  const yMin = Math.min(...data);
  const xStep = width / (data.length - 1);
  // Prevent division by zero if all data points are the same
  const yRange = yMax - yMin === 0 ? 1 : yMax - yMin;

  const pathD = data.reduce((acc, point, i) => {
    const x = i * xStep;
    // Normalize y-coordinate within the height, adding some vertical padding (10% top and bottom)
    const y = height * 0.9 - ((point - yMin) / yRange) * (height * 0.8);
    
    if (i === 0) {
      return `M ${x},${y}`;
    }
    return `${acc} L ${x},${y}`;
  }, '');

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LineChart;
