import React, { useState } from 'react';

type DayNightToggleProps = {
    isDay: boolean;
    setIsDay: React.Dispatch<React.SetStateAction<boolean>>;

}

const DayNightToggle: React.FC<DayNightToggleProps> = ({isDay, setIsDay}) => {

    const handleToggle = () => {
        setIsDay(!isDay);
      };

  return (
    <div className="flex items-end justify-end mt-5">
      <label className="swap swap-rotate">
        <input type="checkbox" onChange={handleToggle} checked={isDay} />
        <div className="swap-on flex items-center space-x-2">
          <span className="text-lg font-bold">Day</span>
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 110-2 1 1 0 010 2zM10 20a1 1 0 110-2 1 1 0 010 2zM18 10a1 1 0 110-2 1 1 0 010 2zM2 10a1 1 0 110-2 1 1 0 010 2zM15.657 4.343a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414zM4.343 15.657a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414zM15.657 15.657a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414zM4.343 4.343a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z"></path>
            <path d="M10 4.934a5.066 5.066 0 100 10.132 5.066 5.066 0 000-10.132zM10 14.066a4.066 4.066 0 110-8.132 4.066 4.066 0 010 8.132z"></path>
          </svg>
        </div>
        <div className="swap-off flex items-center space-x-2">
          <span className="text-lg font-bold">Night</span>
          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.5 2a7.5 7.5 0 000 15c4.136 0 7.5-3.364 7.5-7.5S13.636 2 9.5 2zM10 16c-3.313 0-6-2.687-6-6s2.687-6 6-6a6.013 6.013 0 015.966 5.34A6.978 6.978 0 0010 16z"></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default DayNightToggle;
