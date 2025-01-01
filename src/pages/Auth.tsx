import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/AuthForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full min-h-[500px] p-8 rounded-lg shadow-lg">
        <AuthForm />
      </div>
    </div>
  );
};


export default Auth;
