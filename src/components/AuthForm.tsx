import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";



// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
  console.error('Invalid or missing VITE_SUPABASE_URL. It should start with https://');
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY');
}

// Create Supabase client only if credentials are valid
const supabase = supabaseUrl && supabaseUrl.startsWith('https://') && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        // Handle Sign Up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      } else {
        // Handle Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-sm p-6 bg-[#0a0a0a] text-white rounded-lg border border-zinc-700">
      {isSignUp ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-left pb-1">Create an account</h2>
            <p className="text-left text-sm text-zinc-400 ">Sign up to start your debt-free journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 pb-2">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 pb-2">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-2.5"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-zinc-200"
            >
              Create Account
            </Button>
          </form>
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className="text-white hover:underline"
            >
              Sign In
            </button>
          </p>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-bold text-left pb-1">Welcome back</h2>
            <p className="text-left text-sm text-zinc-400">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 pb-2">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 pb-2">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-2.5"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black rounded-lg py-2 font-medium hover:bg-zinc-200"
            >
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-zinc-400">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className="text-white hover:underline"
            >
              Sign Up
            </button>
          </p>
        </>
      )}
    </div>

  );
};
