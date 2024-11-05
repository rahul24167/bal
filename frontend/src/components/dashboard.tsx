import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BACKEND_URL } from "@/config";
import { useState } from "react";

interface dashboardResponse {
  message: string;
  sessons: object;
}
export const Dashboard = () => {
  // type of sessons, 
  const [sessons,setSessons] = useState()
  const token = localStorage.getItem("balAuthToken");
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = response.data as dashboardResponse
      if(!data.sessons){
        //what to do with sessons

      }else{

      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Workout Sessions</TabsTrigger>
          <TabsTrigger value="password">Create Workout Session</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          All workout fatched from the backend{" "}
        </TabsContent>
        <TabsContent value="password">
          Form for creteing a workout Session
        </TabsContent>
      </Tabs>
    </>
  );
};
