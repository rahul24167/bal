import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupInput } from "@rahul24167/bal-common";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface signupResponse {
  token: string;
  message: string;
}
export function SignupForm() {
  const [postInputs, setPostInputs] = useState<signupInput>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const sendSignupRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        postInputs
      );
      const data = response.data as signupResponse;
      const token = data.token;
      if (!token) {
        setMessage(data.message);
      } else {
        localStorage.setItem("balAuthToken", token);
        navigate("/dashboard");
      }
    } catch (e) {
      alert("Error while signing up");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your email below to Signup to your account
        </CardDescription>
      </CardHeader>
      <div className="text-red-600 text-sm">{message}</div>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <NavLink
                to="/sign"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </NavLink>
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <Button onClick={sendSignupRequest} type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <NavLink to="/signin" className="underline">
            Sign in
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}
