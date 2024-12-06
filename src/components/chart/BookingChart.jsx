// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { addDays, format, isWithinInterval } from "date-fns";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { MdDateRange } from "react-icons/md";
// // import { BASE_URl } from "../../constraints";
// import axios from "axios";
// // Register the necessary Chart.js components
// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const BookingChart = ({ title,url }) => {
//   const BASE_URl = "https://book-my-adventure.onrender.com/api/v1"
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(addDays(new Date(), 15));
//   const [bookings, setBookings] = useState([]);

//   // Fetch booking data from the API
//   const fetchBookingData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URl}${url}`);
//       if (response.status === 200) {
//         const bookedData = response.data?.data?.map((data) => ({
//           date: new Date(data.createdAt||data.departureTime),
//         }));
//         // console.log(response.data?.data);
        
//         setBookings(bookedData);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Filter and process bookings data within the selected date range
//   const filterBookingsByDateRange = (bookings, start, end) => {
//     const filteredBookings = bookings.filter((booking) =>
//       isWithinInterval(booking.date, { start, end })
//     );

//     const dateCounts = {};
//     filteredBookings.forEach((booking) => {
//       const formattedDate = format(booking.date, "dd/MM/yyyy");
//       dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
//     });

//     return dateCounts;
//   };

//   useEffect(() => {
//     fetchBookingData();
//     // console.log(bookings);
    
//   }, []);

//   const bookingData = filterBookingsByDateRange(bookings, startDate, endDate);

//   const data = {
//     labels: Object.keys(bookingData).sort(),
//     datasets: [
//       {
//         label: title.split(" ")[0],
//         data: Object.values(bookingData),
//         fill: true,
//         backgroundColor: title?.includes("rips")? "rgba(75,192,192,0.2)":"rgba(255,102,12,0.2)",
//         borderColor: title?.includes("rips")?"rgba(175,172,255,1)":"rgba(75,192,192,1)",
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <div className="rounded-md shadow-md w-fit">
//       <div className="p-4 flex justify-between border-b-2 items-center mb-4">
//         <h2 className="text-xl font-bold">{title}</h2>
//         <div className="flex items-center flex-wrap">
//           <div className="w-fit">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="p-2 pr-0 outline-none w-[100px] border border-r-0 rounded-r-none rounded-md"
//             />
//           </div>
//           <div className="w-[9px] h-[2px] bg-black mr-1"></div>
//           <div className="w-fit">
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               className="p-2 pl-0 outline-none w-[100px] border border-l-0 rounded-l-none rounded-md"
//             />
//           </div>
//           <MdDateRange className="text-[#FF4F99] ml-2" size={28} />
//         </div>
//       </div>
//       <Line data={data} className="p-4 mt-2 min-h-[50vh]" />
//     </div>
//   );
// };

// export default BookingChart;


// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { addDays, format, isWithinInterval } from "date-fns";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { MdDateRange } from "react-icons/md";
// import axios from "axios";

// // Register the necessary Chart.js components
// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const BookingChart = ({ title, url }) => {
//   // const BASE_URl = "https://book-my-adventure.onrender.com/api/v1";
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(addDays(new Date(), 15));
//   const [bookings, setBookings] = useState([]);

//   const fetchBookingData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URl}${url}`);
//       if (response.status === 200) {
//         const bookedData = response.data?.data?.map((data) => ({
//           date: new Date(data.createdAt || data.departureTime),
//         }));
//         setBookings(bookedData);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const filterBookingsByDateRange = (bookings, start, end) => {
//     const filteredBookings = bookings.filter((booking) =>
//       isWithinInterval(booking.date, { start, end })
//     );

//     const dateCounts = {};
//     filteredBookings.forEach((booking) => {
//       const formattedDate = format(booking.date, "dd/MM/yyyy");
//       dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
//     });

//     return dateCounts;
//   };

//   useEffect(() => {
//     fetchBookingData();
//   }, []);

//   const bookingData = filterBookingsByDateRange(bookings, startDate, endDate);

//   const data = {
//     labels: Object.keys(bookingData).sort(),
//     datasets: [
//       {
//         label: title.split(" ")[0],
//         data: Object.values(bookingData),
//         fill: true,
//         backgroundColor: title?.includes("rips")
//           ? "rgba(75,192,192,0.2)"
//           : "rgba(255,102,12,0.2)",
//         borderColor: title?.includes("rips")
//           ? "rgba(175,172,255,1)"
//           : "rgba(75,192,192,1)",
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <div className="rounded-md shadow-md w-full bg-white">
//       <div className="p-4 flex flex-col sm:flex-row justify-between border-b-2 items-center mb-4">
//         <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">
//           {title}
//         </h2>
//         <div className="flex flex-wrap items-center justify-center sm:justify-end mt-2 sm:mt-0">
//           <div className="w-fit">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="p-2 pr-0 outline-none w-[80px] sm:w-[100px] border border-r-0 rounded-r-none rounded-md text-xs sm:text-sm"
//             />
//           </div>
//           <div className="w-[9px] h-[2px] bg-black mx-1"></div>
//           <div className="w-fit">
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               className="p-2 pl-0 outline-none w-[80px] sm:w-[100px] border border-l-0 rounded-l-none rounded-md text-xs sm:text-sm"
//             />
//           </div>
//           <MdDateRange className="text-[#FF4F99] ml-2" size={24} />
//         </div>
//       </div>
//       <Line data={data} className="p-4 mt-2 min-h-[40vh] sm:min-h-[50vh]" />
//     </div>
//   );
// };

// export default BookingChart;
// sample date

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { addDays, format, isWithinInterval } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";

// Register the necessary Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BookingChart = ({ title, url }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 15));
  const [bookings, setBookings] = useState([
    { date: new Date("2024-11-01") },
    { date: new Date("2024-11-05") },
    { date: new Date("2024-11-10") },
    { date: new Date("2024-11-15") },
    { date: new Date("2024-11-20") },
  ]); // Example static bookings data

  const filterBookingsByDateRange = (bookings, start, end) => {
    const filteredBookings = bookings.filter((booking) =>
      isWithinInterval(booking.date, { start, end })
    );

    const dateCounts = {};
    filteredBookings.forEach((booking) => {
      const formattedDate = format(booking.date, "dd/MM/yyyy");
      dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
    });

    return dateCounts;
  };

  useEffect(() => {
    // If you plan to fetch data in the future, you would re-enable this function.
    // fetchBookingData(); // Example API call if needed
  }, []);

  const bookingData = filterBookingsByDateRange(bookings, startDate, endDate);

  const data = {
    labels: Object.keys(bookingData).sort(),
    datasets: [
      {
        label: title.split(" ")[0],
        data: Object.values(bookingData),
        fill: true,
        backgroundColor: title?.includes("rips")
          ? "rgba(75,192,192,0.2)"
          : "rgba(255,102,12,0.2)",
        borderColor: title?.includes("rips")
          ? "rgba(175,172,255,1)"
          : "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,  // Ensures the chart is responsive
    maintainAspectRatio: false,  // Ensures the chart resizes and maintains its aspect ratio on different screen sizes
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,  // Smaller font size for mobile screens
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,  // Smaller font size for mobile screens
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top", // Adjust the legend to a position that works well on mobile
        labels: {
          font: {
            size: 8, // Smaller legend font size for mobile screens
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 10,  // Smaller tooltip font size for mobile screens
        },
      },
    },
  };

  return (
    <div className="rounded-md shadow-md w-full bg-white">
      <div className="p-4 flex flex-col sm:flex-row justify-between border-b-2 items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">
          {title}
        </h2>
        <div className="flex flex-wrap items-center justify-center sm:justify-end mt-2 sm:mt-0 space-x-2">
          <div className="w-full sm:w-auto">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="p-2 pr-0 outline-none w-[80px] sm:w-[100px] border border-r-0 rounded-r-none rounded-md text-xs sm:text-sm"
            />
          </div>
          <div className="w-[9px] h-[2px] bg-black mx-1"></div>
          <div className="w-full sm:w-auto">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="p-2 pl-0 outline-none w-[80px] sm:w-[100px] border border-l-0 rounded-l-none rounded-md text-xs sm:text-sm"
            />
          </div>
          <MdDateRange className="text-[#FF4F99] ml-2" size={24} />
        </div>
      </div>
      <div className="p-4 mt-2 min-h-[40vh] sm:min-h-[50vh]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BookingChart;


