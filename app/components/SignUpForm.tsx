"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { PasswordInput } from "../components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFormValues, signinSchema } from "../schemas/authsignin";

interface SignUpFormProps {
  onSwitchToSignIn?: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const { signIn } = useAuthActions(); 
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    setError(null);
    setLoading(true);

    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow: "signUp", 
      });
      router.push("/notes");
    } catch (err) {
      console.error("Sign up error:", err);
      
      setError("Failed to create account. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-card-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Enter your details to create a new account.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        type="email"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Password"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              {error && (
                <div className="text-sm text-destructive text-center">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </Form>

          {onSwitchToSignIn && (
            <Button
              variant="link"
              type="button"
              className="w-full text-sm text-muted-foreground cursor-pointer"
              onClick={onSwitchToSignIn}
              disabled={loading}
            >
              Already have an account? Sign In
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}