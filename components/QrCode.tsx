
import React from 'react';
import { UsdtIcon } from './icons/UsdtIcon';

// This is a static, stylized representation of a QR code.
const QrCode: React.FC = () => {
    // Generate a pseudo-random pattern for visual effect
    const pattern = Array.from({ length: 25 * 25 }).map((_, i) => ({
        id: i,
        fill: Math.random() > 0.4 ? '#111827' : '#FFFFFF',
    }));

    return (
        <div className="relative w-56 h-56 bg-white p-3 rounded-2xl shadow-lg mx-auto">
            <svg width="100%" height="100%" viewBox="0 0 250 250" shapeRendering="crispEdges">
                {pattern.map(p => (
                    <rect key={p.id} x={(p.id % 25) * 10} y={Math.floor(p.id / 25) * 10} width="10" height="10" fill={p.fill} />
                ))}
                
                {/* QR Code corner patterns */}
                <rect x="0" y="0" width="70" height="70" fill="white" />
                <rect x="10" y="10" width="50" height="50" fill="#111827" />
                <rect x="20" y="20" width="30" height="30" fill="white" />

                <rect x="180" y="0" width="70" height="70" fill="white" />
                <rect x="190" y="10" width="50" height="50" fill="#111827" />
                <rect x="200" y="20" width="30" height="30" fill="white" />
                
                <rect x="0" y="180" width="70" height="70" fill="white" />
                <rect x="10" y="190" width="50" height="50" fill="#111827" />
                <rect x="20" y="200" width="30" height="30" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12">
                   <UsdtIcon />
                </div>
            </div>
        </div>
    );
};

export default QrCode;
