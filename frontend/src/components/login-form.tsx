import { Link, useNavigate } from "react-router-dom";

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

import { signinInput } from "@rahul24167/bal-common"
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useState } from "react";

interface signinResponse {
  token: string;
  message: string;
}
export function LoginForm() {
  const [postInputs, setPostInputs] = useState<signinInput>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const sendSigninRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signin`,
        postInputs
      );
      const data = response.data as signinResponse;
      const token = data.token;
      if (!token) {
        setMessage(data.message);
      } else {
        localStorage.setItem("balAuthToken", token);
        navigate("/dashboard");
      }
    } catch (e) {
      alert("Try few times as our backend is busy.");
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signin</CardTitle>
        <CardDescription>
          Enter your email below to Signin/Login to your account
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
              onChange={(e)=>{setPostInputs({
                ...postInputs,
                email: e.target.value
              });
            }}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/sign"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              onChange={(e)=>{setPostInputs({
                ...postInputs,
                password: e.target.value
              });
            }}
            />
          </div>
          <Button onClick={sendSigninRequest} type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
