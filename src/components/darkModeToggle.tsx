"use client";
import useLocalStorage from "use-local-storage";
import { Switch } from "~/components/ui/switch";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>(
    "isDark",
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  return (
    <div className="border-2 border-gray-300 rounded-full p-0.5 flex justify-center items-center w-fit mx-auto">
      <Switch
        checked={isDark}
        onCheckedChange={() => {
          document.documentElement.classList.toggle("dark", !isDark);
          setIsDark((prev) => !prev);
        }}
        className="bg-gold/50 dark:bg-gold"
      />
    </div>
  );
};

export default DarkModeToggle;
