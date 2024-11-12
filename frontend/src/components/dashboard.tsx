import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BACKEND_URL } from "@/config";
// import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { sessonInput } from "@rahul24167/bal-common";
import { Button } from "./ui/button";
// import { Sessons } from "./Sessons";

// interface ResponseType {
//   message: string;
//   sessons: object;
// }
export interface sessonsInput {
  [sessonObjectId: string]: sessonInput;
}
interface ContextProps {
  isAuthenticated: boolean;
}
export const Dashboard = () => {
  const { isAuthenticated } = useOutletContext<ContextProps>();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/");
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
          {/* <Sessons></Sessons> */}
        </TabsContent>
        <TabsContent value="password">
          Form for creteing a workout Session
          <Button></Button>
        </TabsContent>
      </Tabs>
    </>
  );
};
