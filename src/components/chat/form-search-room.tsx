import { emailFriendZodSchema, type EmailFriendZodSchema } from "@/lib/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useTransition } from "react"
import { useRoomActions } from "@/hooks/use-room-actions"
import { toast } from "sonner"


interface Props {
    handleClickRoomId: (id: string) => void
}

const FormSearchRoom = ({handleClickRoomId}: Props) => {

    const [isLoading, startTransition] = useTransition()
    const { findOrCreateRoom } = useRoomActions()

    const form = useForm<EmailFriendZodSchema>({
        resolver: zodResolver(emailFriendZodSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: EmailFriendZodSchema) {
        startTransition(async () => {
            const response = await findOrCreateRoom(values.email)
            if (response.success) {
                handleClickRoomId(response.roomId)
                toast.success("Room found, start chatting!")
                form.reset()
                return
            }
            toast.error(response.message)
        })
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search by email..."
                  className="rounded-lg border-border bg-background focus:bg-muted transition-colors"
                  autoComplete="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all py-2.5 font-medium active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Friend
            </>
          )}
        </button>
      </form>
    </Form>
  )
}
export default FormSearchRoom