import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HeroProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Hero({ title, icon, children, className }: HeroProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
