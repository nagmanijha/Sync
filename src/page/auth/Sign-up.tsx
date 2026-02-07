import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import Logo from "../../components/logo";
import GoogleOauthButton from "../../components/auth/google-oauth-button";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "../../lib/api";
import { toast } from "../../hooks/use-toast";
import { Loader, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        navigate("/sign-in");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mesh-gradient relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Main Card Container */}
      <div className="glass-card flex w-full max-w-[1000px] flex-col overflow-hidden rounded-xl shadow-2xl lg:flex-row max-h-[660px]">
        {/* Left Side: 3D Illustration Panel */}
        <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between bg-white/40 p-10 dark:bg-black/20">
          <div className="z-10 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-md">
              <Logo className="text-white fill-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Sync</h2>
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            <div
              className="h-64 w-full bg-contain bg-center bg-no-repeat drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
            >
            </div>
            <div className="mt-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Join the Future of Work</h3>
              <p className="text-slate-600 dark:text-slate-300">Experience a new standard of productivity. Collaborate, manage, and scale your team effortlessly.</p>
            </div>
          </div>
          {/* Abstract decorative circles */}
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="flex w-full flex-col justify-center bg-white/50 px-8 py-12 dark:bg-[#121022]/60 sm:px-12 lg:w-1/2 lg:px-16">
          {/* Mobile Header (Visible only on small screens) */}
          <div className="mb-8 flex items-center gap-3 lg:hidden justify-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-md">
              <Logo className="text-white fill-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Sync</h2>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white md:text-3xl">Create Account</h1>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-400">Enter your information to get started.</p>
          </div>

          <div className="grid gap-3">
            <GoogleOauthButton label="Sign up with Google" />

            {/* Divider */}
            <div className="relative my-4 flex items-center py-0.5">
              <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="mx-1 shrink text-xs font-medium uppercase text-slate-400 dark:text-slate-500">Or continue with</span>
              <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-slate-900 dark:text-white">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-slate-900 dark:text-white">Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@company.com"
                          {...field}
                          className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-primary"
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
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-slate-900 dark:text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 pr-10 text-base outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-primary"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-white focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary to-indigo-600 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
                >
                  {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </Form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-bold text-primary hover:underline dark:text-indigo-400"
              >
                Sign In
              </Link>
            </p>

            {/* Footer Tagline for Mobile */}
            <div className="mt-8 block text-center lg:hidden">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-600">B2B Project Management SaaS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 flex gap-6 text-sm text-white/60">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        <Link to="/help" className="hover:text-white transition-colors">Help Center</Link>
      </div>
    </div>
  );
};

export default SignUp;
