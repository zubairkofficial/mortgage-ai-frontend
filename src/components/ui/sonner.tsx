import { useTheme } from "@/components/theme/theme-provider"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
    
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border ",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      style={
        {
          // Base toast styling
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          // Success toast (green)
          "--success-bg": "var(--success)",
          "--success-text": "var(--brand-teal)",
          "--success-border": "color-mix(in srgb, var(--brand-teal) 30%, transparent)",

          // Info toast (blue)
          "--info-bg": "color-mix(in srgb, var(--brand-light-blue) 20%, transparent)",
          "--info-text": "var(--brand-light-blue)",
          "--info-border": "color-mix(in srgb, var(--brand-light-blue) 30%, transparent)",

          // Warning toast (yellow)
          "--warning-bg": "color-mix(in srgb, var(--brand-gold) 20%, transparent)",
          "--warning-text": "var(--brand-gold)",
          "--warning-border": "color-mix(in srgb, var(--brand-gold) 30%, transparent)",

          // Error toast (red)
          "--error-bg": "color-mix(in srgb, var(--destructive) 20%, transparent)",
          "--error-text": "var(--destructive)",
          "--error-border": "color-mix(in srgb, var(--destructive) 30%, transparent)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
