import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { useToast } from "./ui/use-toast";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { supabase } from "../integrations/supabase/client";

export const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ full_name: string | null; avatar_url: string | null } | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        
        setUser(user);
        
        if (user) {
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .maybeSingle();
            
          if (profileError) throw profileError;
          setProfile(data);
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
      }
    };
    
    getUser();
  }, [toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };


  const handleComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update!",
    });
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || ""} />
              <AvatarFallback>{profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleComingSoon}>My Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/debts')}>My Debts</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
              <><Moon className="h-4 w-4 mr-2" />Dark Mode</>
            ) : (
              <><Sun className="h-4 w-4 mr-2" />Light Mode</>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleComingSoon}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;