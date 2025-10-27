"use client";

import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <div className="w-full p-8 space-y-8 bg-card rounded-lg shadow-lg">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-card-foreground">Login</h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your account.
              </p>
            </div>
            <SignInForm />
          </div>
        </TabsContent>

        <TabsContent value="signup">
          <div className="w-full p-8 space-y-8 bg-card rounded-lg shadow-lg">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-card-foreground">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Enter your details to create a new account.
              </p>
            </div>
            <SignUpForm />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}