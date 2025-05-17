import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="custom-toast" // Add your custom toast class here
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport
        className="custom-toaster"
        style={{
          left: "50%",
          bottom: "2rem",
          top: "auto",
          right: "auto",
          transform: "translateX(-50%)",
          position: "fixed",
          zIndex: 99999,
        }}
      />
    </ToastProvider>
  )
}
