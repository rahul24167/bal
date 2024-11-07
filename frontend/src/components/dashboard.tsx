import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sessonInput } from "@rahul24167/bal-common";
import { Button } from "./ui/button";

interface ResponseType {
  message: string;
  sessons: object;
}
export interface sessonsInput {
  [sessonObjectId: string]: sessonInput;
}
export const Dashboard = () => {
  const token = localStorage.getItem("balAuthToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  // type of sessons, 
  const [sessons,setSessons] = useState<sessonsInput>({});
  const [sessionUpdateCounter, setSessionUpdateCounter] = useState(0);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data as ResponseType;
        console.log(data);
        // Update `sessons` state with the response data
        if (data.sessons) {
          setSessons(data.sessons as sessonsInput);
        } else {
          // Handle case where no sessions data is returned
          console.warn("No sessons data found.");
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        alert("Something went wrong while fetching sessions.");
      }
    };
    fetchSessions();
  }, [token, sessionUpdateCounter]);

  const createSessons = async ()=>{
    setSessionUpdateCounter(prev => prev+1);
  }


  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Workout Sessions</TabsTrigger>
          <TabsTrigger value="password">Create Workout Session</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          All workout fatched from the backend
          <div>
            {Object.keys(sessons).length > 0 ? (
              <ul>
                {Object.entries(sessons).map(([id, session]) => (
                  <li key={id}>
                    <strong>{session.sessonName}</strong> - {id}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sessions found.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="password">
          Form for creteing a workout Session
          <Button onClick={createSessons}></Button>
        </TabsContent>
      </Tabs>
    </>
  );
};
