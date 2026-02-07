import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { loginMutationFn } from "../../lib/api";
import { toast } from "../../hooks/use-toast";
import { Loader, Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const formSchema = z.object({
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
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;

    mutate(values, {
      onSuccess: (data) => {
        const user = data.user;
        const decodedUrl = returnUrl ? decodeURIComponent(returnUrl) : null;
        // navigate(decodedUrl || `/workspace/${user.currentWorkspace}`);
        window.location.href = decodedUrl || `/workspace/${user.currentWorkspace}`;
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
    <div className="mesh-gradient relative flex min-h-screen w-full flex-col items-center justify-center overflow-auto p-4 sm:p-6 lg:p-8">
      {/* Main Card Container */}
      <div className="glass-card flex w-full max-w-[1100px] flex-col overflow-hidden rounded-xl shadow-2xl lg:flex-row h-auto lg:h-[600px] min-h-0">
        {/* Left Side: 3D Illustration Panel */}
        <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between bg-white/40 p-12 dark:bg-black/20">
          <div className="z-10 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-md">
              <Logo className="text-white fill-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Sync</h2>
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            <div
              className="h-64 w-full bg-contain bg-center bg-no-repeat drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAo4Yc_sggBMLNpx5SLcWF4Jh05KcjMzKi7uGBuN2Lsu0InSJ6F3c3tdwUlBzeDiN8X1oW2fuu6S9Av8_WrzgiTD0qZPVzuQyx9ZjKQEuqs6Lj7wUE_E6IYI9A_MIAxe0JMYHuQlPK-F3y1NGe3pHgIznp-bup3WujgQWc9DyDMIOIGmcjBsWyaw5TL_AJZ_uvTUbbjh0DMiIPhRu-XP0661pDJH2pm0fOcpvk4Upcwl84yfcliaTvX1CBSJH615m6QHI94pZJKSpbl')" }}
            >
            </div>
            <div className="mt-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Unlock Team Potential</h3>
              <p className="text-slate-600 dark:text-slate-300">Seamlessly manage projects, track progress, and collaborate in real-time with our advanced suite.</p>
            </div>
          </div>
          {/* Abstract decorative circles */}
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full flex-col justify-center bg-white/60 px-6 py-8 dark:bg-[#121022]/80 sm:px-12 lg:w-1/2 lg:px-16 h-full overflow-y-auto">
          {/* Mobile Header (Visible only on small screens) */}
          <div className="mb-6 flex items-center gap-3 lg:hidden justify-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-md">
              <Logo className="text-white fill-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Sync</h2>
          </div>

          <div className="mb-6 text-center lg:text-left">
            <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Enter your details to access your workspace.</p>
          </div>

          {/* Social Login */}
          <GoogleOauthButton label="Log in with Google" />

          {/* Divider */}
          <div className="relative my-4 flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span className="mx-3 flex-shrink-0 text-[10px] font-medium uppercase text-slate-400 dark:text-slate-500">Or continue with</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="mb-1 block text-sm font-medium text-slate-900 dark:text-white">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@company.com"
                        {...field}
                        className="block w-full rounded-lg border border-slate-200 bg-white dark:bg-[#121022] dark:border-slate-700 dark:text-white dark:placeholder-slate-600 px-3 h-10 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  <FormItem className="space-y-1">
                    <div className="flex items-center justify-between">
                      <FormLabel className="mb-1 block text-sm font-medium text-slate-900 dark:text-white">Password</FormLabel>
                      <div className="text-xs">
                        <Link
                          to="/forgot-password"
                          className="font-semibold text-primary hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="block w-full rounded-lg border border-slate-200 bg-white dark:bg-[#121022] dark:border-slate-700 dark:text-white dark:placeholder-slate-600 px-3 h-10 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 pr-10"
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-white focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me */}
              <div className="flex items-center mt-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 dark:bg-slate-900 dark:border-slate-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500 dark:text-slate-400">Remember me</label>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary to-indigo-600 h-10 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#1e1c2e]"
              >
                {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Login to Dashboard
              </Button>
            </form>
          </Form>

          {/* Footer Sign Up */}
          <div className="mt-6 text-center text-sm">
            <p className="text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/sign-up"
                className="font-bold text-primary transition-colors hover:underline dark:text-indigo-400"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer Tagline for Mobile */}
          <div className="mt-6 block text-center lg:hidden">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-600">B2B Project Management SaaS</p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 lg:text-white/60">
        <Link to="/privacy" className="hover:text-primary lg:hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-primary lg:hover:text-white transition-colors">Terms of Service</Link>
        <Link to="/contact" className="hover:text-primary lg:hover:text-white transition-colors">Help Center</Link>
      </div>
    </div>
  );
};

export default SignIn;
