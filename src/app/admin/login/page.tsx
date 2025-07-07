"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function AdminLoginPage() {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

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
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                {error && (
                    <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Admin Login</CardTitle>
                            <CardDescription>
                                Enter your credentials to access the admin panel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            {...form.register("email")}
                                        />
                                        {form.formState.errors.email && (
                                            <p className="text-sm text-red-500">
                                                {form.formState.errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
