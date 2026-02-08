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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Professional Background Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-100 h-auto lg:h-[700px] m-4">

        {/* Left Side: Illustration Panel */}
        <div className="hidden lg:flex flex-col w-1/2 bg-slate-900 p-12 relative overflow-hidden items-center justify-center text-center">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />

          {/* Logo */}
          <div className="absolute top-10 left-10 flex items-center gap-3 z-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <Logo className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Team Sync</span>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-sm">
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">Join the Future of Work</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10">
              Experience a new standard of productivity. Collaborate, manage, and scale your team effortlessly.
            </p>

            {/* Abstract UI Element */}
            <div className="relative w-full aspect-video rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-4 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-all duration-700">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="space-y-3">
                <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                <div className="h-2 w-5/6 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center bg-white px-8 py-12 sm:px-12 lg:px-16 relative">

          {/* Mobile Header */}
          <div className="mb-10 flex items-center gap-3 lg:hidden justify-center">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Logo className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Sync</h2>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
              <p className="text-slate-500">Enter your information to get started.</p>
            </div>

            <GoogleOauthButton label="Sign up with Google" />

            <div className="relative my-8 flex items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="mx-4 flex-shrink-0 text-xs font-semibold tracking-wider text-slate-400 uppercase">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-slate-700 font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-11 bg-white border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg transition-all"
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
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-slate-700 font-medium">Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@company.com"
                          {...field}
                          className="h-11 bg-white border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg transition-all"
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
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="h-11 bg-white border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg pr-10 transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
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
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-lg shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {isPending && <Loader className="mr-2 h-5 w-5 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center text-sm">
              <p className="text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links (Floating) */}
      <div className="absolute bottom-6 w-full text-center">
        <div className="flex justify-center gap-6 text-sm font-medium text-slate-400">
          <Link to="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
          <Link to="/help" className="hover:text-slate-600 transition-colors">Help Center</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
