import { useState } from 'react';
import { DollarSign, Calendar, Bell } from 'lucide-react';

const DashboardCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isHovered) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto perspective">
      <div
        className="relative transition-all duration-200 ease-out preserve-3d"
        style={{
          transform: `
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
            scale(${isHovered ? 1.02 : 1})
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-white rounded-xl p-4 shadow-2xl">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Total Debt</span>
              </div>
              <div className="text-2xl font-bold text-black">$1,021,000</div>
              <div className="text-sm text-gray-500">0.0% paid off</div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Debt Free Date</span>
              </div>
              <div className="text-2xl font-bold text-black">March 2025</div>
              <div className="text-sm text-gray-500">Based on current payments</div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Bell className="w-4 h-4" />
                <span className="text-sm">Next Payment</span>
              </div>
              <div className="text-2xl font-bold text-black">$1,384.41</div>
              <div className="text-sm text-gray-500">Due in 132 days</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-4 border-b border-gray-200">
            <button className="px-3 py-1 text-gray-600 border-b-2 border-gray-900">Debts</button>
            <button className="px-3 py-1 text-gray-400">Payments</button>
            <button className="px-3 py-1 text-gray-400">Achievements</button>
          </div>

          <div className="space-y-3">
            <div className="text-lg font-bold text-black mb-3">Upcoming Payments</div>

            <div className="flex justify-between items-center py-1">
              <div>
                <div className="font-medium text-black">Student Loan</div>
                <div className="text-sm text-gray-500">Due: 20/12/2028</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-black">$1,384.41</span>
                <button className="bg-black text-white px-3 py-1 rounded-full text-sm">Pay Now</button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1">
              <div>
                <div className="font-medium text-black">House Loan</div>
                <div className="text-sm text-gray-500">Due: 01/01/2030</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-black">$19,491.08</span>
                <button className="bg-black text-white px-3 py-1 rounded-full text-sm">Pay Now</button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1">
              <div>
                <div className="font-medium text-black">Credit Card A</div>
                <div className="text-sm text-gray-500">Due: 20/02/2026</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-black">$80.10</span>
                <button className="bg-black text-white px-3 py-1 rounded-full text-sm">Pay Now</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-6">
            <button className="flex items-center justify-center gap-2 p-3 bg-black ext-white-600 hover:bg-black/80 rounded-lg">
              <DollarSign className="w-5 h-5" />
              <span>Make a Payment</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 text-gray-600 hover:bg-accent rounded-lg">
              <Calendar className="w-5 h-5" />
              <span>Debt Calculator</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 text-gray-600 hover:bg-accent rounded-lg">
              <Bell className="w-5 h-5" />
              <span>Payment Simulator</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 text-gray-600 hover:bg-accent rounded-lg">
              <span className="text-xl">+</span>
              <span>Add Debt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
