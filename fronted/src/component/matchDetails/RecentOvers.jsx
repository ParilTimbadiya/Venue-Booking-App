// import React from 'react';
// import './matchDetails.css';

// const RecentOvers = ({ recentOvsStats }) => {
//   // Function to determine the class and content for each ball
//   const getBallStyle = (ball) => {
//     if (ball === 'W' || ball === 'Wicket') {
//       return { className: 'run-circle wicket', content: 'W' };
//     } else if (ball === '4') {
//       return { className: 'run-circle four', content: '4' };
//     } else if (ball === '6') {
//       return { className: 'run-circle six', content: '6' };
//     } else if (ball === '0') {
//       return { className: 'run-circle zero', content: '0' };
//     } else if (ball === '1') {
//       return { className: 'run-circle one', content: '1' };
//     } else if (ball === '2') {
//       return { className: 'run-circle one', content: '2' };
//     } else if (ball === 'Wd') {
//       return { className: 'run-circle one', content: 'wd' };
//     } else if (ball === 'Wd2') {
//       return { className: 'run-circle one', content: 'wd2' };
//     } else {
//       return { className: 'run-circle default', content: ball };
//     }
//   };
  
//   // Clean the input string by removing unwanted symbols
//   const cleanBallsData = (input) => {
//     if (!input) return '';
    
//     // Remove ... and | symbols and any extra spaces
//     return input.replace(/\.\.\.|[|]/g, '').replace(/\s+/g, ' ').trim();
//   };
  
//   const safeRecentOvsStats = cleanBallsData(recentOvsStats || '');
  
//   return (
//     <div className="recent-overs">
//       <span className="recent-label mr-210">Recent Balls : </span>
//       <div className="balls-container">
//         {safeRecentOvsStats.split(' ').filter(ball => ball).map((ball, index) => {
//           const { className, content } = getBallStyle(ball);
//           return (
//             <div key={index} className={className}>
//               {content}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RecentOvers;






import React from 'react';

const RecentOvers = ({ recentOvsStats }) => {
  // Function to determine the class and content for each ball
  const getBallStyle = (ball) => {
    if (ball === 'W' || ball === 'Wicket') {
      return { className: 'bg-red-600 text-white', content: 'W' };
    } else if (ball === '4') {
      return { className: 'bg-blue-500 text-white', content: '4' };
    } else if (ball === '6') {
      return { className: 'bg-green-500 text-white', content: '6' };
    } else if (ball === '0') {
      return { className: 'bg-gray-700 text-white', content: '0' };
    } else if (ball === '1' || ball === '2') {
      return { className: 'bg-yellow-500 text-black', content: ball };
    } else if (ball.toLowerCase().includes('wd')) {
      return { className: 'bg-purple-500 text-white', content: ball.toLowerCase() };
    } else {
      return { className: 'bg-gray-500 text-white', content: ball };
    }
  };

  // Clean the input string by removing unwanted symbols
  const cleanBallsData = (input) => {
    if (!input) return '';
    return input.replace(/\.{3}|[|]/g, '').replace(/\s+/g, ' ').trim();
  };

  const safeRecentOvsStats = cleanBallsData(recentOvsStats || '');

  return (
    <div className="text-gray-300 p-4">
      <p className="text-lg font-semibold mb-2">Recent Balls:</p>
      <div className="flex flex-wrap gap-2">
        {safeRecentOvsStats.split(' ').filter(ball => ball).map((ball, index) => {
          const { className, content } = getBallStyle(ball);
          return (
            <div key={index} className={`w-8 h-8 flex items-center justify-center rounded-full ${className} text-sm font-bold`}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOvers;