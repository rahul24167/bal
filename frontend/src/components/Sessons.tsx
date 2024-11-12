// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { BACKEND_URL } from "@/config";
// import { sessonInput } from "@rahul24167/bal-common";
// import { CalendarDays, Clock, MapPin } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // interface Session {
// //   id: string;
// //   title: string;
// //   date: string;
// //   time: string;
// //   location: string;
// //   description: string;
// // }

// // const dummySessions: Session[] = [
// //   {
// //     id: "1",
// //     title: "Introduction to React",
// //     date: "2023-06-15",
// //     time: "10:00 AM - 12:00 PM",
// //     location: "Online",
// //     description: "Learn the basics of React and component-based architecture.",
// //   },
// //   {
// //     id: "2",
// //     title: "Advanced JavaScript Techniques",
// //     date: "2023-06-17",
// //     time: "2:00 PM - 4:00 PM",
// //     location: "Tech Hub, Room 301",
// //     description: "Dive deep into advanced JavaScript concepts and patterns.",
// //   },
// //   {
// //     id: "3",
// //     title: "UI/UX Design Principles",
// //     date: "2023-06-20",
// //     time: "11:00 AM - 1:00 PM",
// //     location: "Design Studio",
// //     description:
// //       "Explore key principles of user interface and user experience design.",
// //   },
// //   {
// //     id: "4",
// //     title: "Node.js Backend Development",
// //     date: "2023-06-22",
// //     time: "3:00 PM - 5:00 PM",
// //     location: "Online",
// //     description: "Build scalable backend services with Node.js and Express.",
// //   },
// //   {
// //     id: "5",
// //     title: "Mobile App Development with React Native",
// //     date: "2023-06-25",
// //     time: "10:00 AM - 12:00 PM",
// //     location: "Innovation Center",
// //     description: "Create cross-platform mobile apps using React Native.",
// //   },
// //   {
// //     id: "6",
// //     title: "Data Visualization with D3.js",
// //     date: "2023-06-28",
// //     time: "1:00 PM - 3:00 PM",
// //     location: "Data Lab",
// //     description: "Learn to create interactive data visualizations with D3.js.",
// //   },
// // ];


// interface ResponseType {
//     message: string;
//     sessons: object;
//   }
// interface sessonsInput {
//   [sessonObjectId: string]: sessonInput;
// }
// export const Sessons = () => {
//   const token = localStorage.getItem("balAuthToken");
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, [token, navigate]);
//   // type of sessons,
//   const [sessons, setSessons] = useState<sessonsInput>({});
//   const [sessionUpdateCounter, setSessionUpdateCounter] = useState(0);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_URL}/dashboard`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = response.data as ResponseType;
//         console.log(data);
//         // Update `sessons` state with the response data
//         if (data.sessons) {
//           setSessons(data.sessons as sessonsInput);
//         } else {
//           // Handle case where no sessions data is returned
//           console.warn("No sessons data found.");
//         }
//       } catch (error) {
//         console.error("Failed to fetch sessions:", error);
//         alert("Something went wrong while fetching sessions.");
//       }
//     };
//     fetchSessions();
//   }, [token, sessionUpdateCounter]);

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Your Sessions</h1>
//       <Accordion type="single" collapsible className="w-full">
//         {Object.values(sessons).map((sesson:any) => (
//           <AccordionItem key={sesson.id} value={sesson.id}>
//             <AccordionTrigger className="text-left">
//               <div className="flex items-center justify-between w-full">
//                 <span>{sesson.title}</span>
//                 <span className="text-sm text-muted-foreground">
//                   {sesson.date}
//                 </span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="grid gap-2 p-4">
//                 <p className="text-sm text-muted-foreground">
//                   {sesson.description}
//                 </p>
//                 <div className="flex items-center">
//                   <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
//                   <span className="text-sm">{sesson.date}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="mr-2 h-4 w-4 opacity-70" />
//                   <span className="text-sm">{sesson.time}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <MapPin className="mr-2 h-4 w-4 opacity-70" />
//                   <span className="text-sm">{sesson.location}</span>
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// };
