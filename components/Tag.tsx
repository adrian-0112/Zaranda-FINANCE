
import React from 'react';

interface TagProps {
  text: string;
  color?: 'green' | 'blue' | 'yellow' | 'gray';
}

const Tag: React.FC<TagProps> = ({ text, color = 'gray' }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {text}
    </div>
  );
};

export default Tag;