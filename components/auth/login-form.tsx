"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "./auth-card";
import { LoginSchema } from "@/types/login-schema";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState<"idle" | "executing" | "success" | "error">("idle");

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const { email, password } = values;
    
    // Set status to executing before making the request
    setStatus("executing");
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message

    try {
      // Attempt to sign in
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/"
      });

      if (error) {
        // If error occurs, set error message and status to 'error'
        setError(error.message || "Login failed");
        setStatus("error");
        return;
      }

      // On success, set success message, reset form and change status to 'success'
      setSuccess("Login successful!");
      form.reset();
      setStatus("success");

      // Redirect to home after successful login
      router.push("/");
      router.refresh();
    } catch (err: any) {
      // In case of unexpected errors, handle with a generic message
      setError(err?.message || "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <AuthCard
      cardTitle="Welcome back!"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="krisdy@gmail.com"
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
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
                      <Input
                        {...field}
                        placeholder="*********"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormSuccess message={success} />
              <FormError message={error} />

              <Button size={"sm"} variant={"link"} asChild>
                <Link href="/auth/reset">Forgot your password</Link>
              </Button>
            </div>

            <Button
              type="submit"
              className={cn("w-full")}
              disabled={status === "executing"} // Disable the button when executing
            >
              {status === "executing" ? "Logging in..." : "Login"} {/* Show 'Logging in...' when executing */}
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};
