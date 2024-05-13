import { Switch } from "@nextui-org/react";
import { Moon, Sun1 } from "iconsax-react";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isSelected = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  if (!isMounted) return null;

  return (
    <Switch
      isSelected={isSelected}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      color="primary"
      startContent={<Sun1 size={16} />}
      endContent={<Moon size={16} />}
      size="lg"
    />
  );
};