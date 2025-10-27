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
import { toast } from "sonner";

interface SignInFormProps {
  onSwitchToSignUp?: () => void;
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
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
    setLoading(true); // ✅ start loading

    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow: "signIn",
      });

      toast.success("✅Successfully signed in!");
      
      router.push("/notes");
    } catch (err) {
      toast.error("❌Failed to sign in.");
      console.error("Sign in error:", err);
      setError("👀Invalid email or password.");
    } finally {
      setLoading(false); 
    }
  }

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="text-center space-y-5">
            <h1 className="text-3xl font-bold text-card-foreground">Login</h1>
            <p className="text-muted-foreground ">
              Enter your credentials to log in.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              {/* ✅ Use your own error state, not form.root */}
             {error && (
                <div className="text-sm text-destructive text-center">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          {onSwitchToSignUp && (
            <Button
              variant="link"
              type="button"
              className="w-full text-sm text-muted-foreground cursor-pointer"
              onClick={onSwitchToSignUp}
              disabled={loading}
            >
              Don&apos;t have an account? Sign Up
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}