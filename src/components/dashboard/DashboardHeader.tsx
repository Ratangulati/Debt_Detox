import UserProfile from "../UserProfile";

export const DashboardHeader = () => {
  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Debt Detox</h1>
      </div>
      <UserProfile />
    </header>
  );
};