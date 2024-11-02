import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Calendar, Users } from "lucide-react";

export const LandingPage = () => {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Fitness Journey with Bal
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Achieve your fitness goals with our easy-to-use workout
                  tracking app. Log workouts, monitor progress, and stay
                  motivated.
                </p>
              </div>
              <div className="space-x-4">
                <Button>
                  <NavLink to="/signin">Get Started</NavLink>
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <BarChart2 className="w-10 h-10 mb-2" />
                  <CardTitle>Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Monitor your fitness journey with detailed charts and
                    statistics.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="w-10 h-10 mb-2" />
                  <CardTitle>Plan Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Create and schedule your workout routines with our intuitive
                    planner.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-10 h-10 mb-2" />
                  <CardTitle>Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Connect with other fitness enthusiasts and share your
                    achievements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Fitness Journey Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of users who have transformed their lives with
                  Bal.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                  <Button type="submit"><NavLink to="signup">Sign Up</NavLink></Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <NavLink className="underline underline-offset-2" to="terms">
                    Terms & Conditions
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
