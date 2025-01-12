// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//     const [cveData, setCveData] = useState([]);

//     useEffect(() => {
//         const fetchCveData = async () => {
//             try {
//                 // Using Docker service name for backend communication
//                 const response = await axios.get('http://server:3000/api/cve');
//                 setCveData(response.data);
//             } catch (error) {
//                 console.error('Error fetching CVE data:', error.message);
//             }
//         };

//         fetchCveData();
//     }, []);

//     return (
//         <div>
//             <h1>CVE Vulnerabilities</h1>
//             <ul>
//                 {cveData.map((item, index) => (
//                     <li key={index}>{item.name}</li> // Adjust based on API response
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default App;
