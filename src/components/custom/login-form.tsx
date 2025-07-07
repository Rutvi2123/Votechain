"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true);
        setError(null);

        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (response?.error) {
                setError("Invalid email or password");
                return;
            }

            // Redirect to dashboard or home page after successful login
            router.push("/");
            router.refresh();
        } catch (error) {
            setError("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your credentials sent to your email address.
                </p>
            </div>
            <div className="grid gap-6">
                {error && (
                    <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        disabled={isLoading}
                        {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </div>
        </form>
    );
}