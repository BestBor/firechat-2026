import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useMessagesActions } from "@/hooks/use-messages-actions"
import { toast } from "sonner"
import { useTransition, useEffect } from "react"

interface Props {
    roomId: string
}

const FormMessageChat = ({roomId}: Props) => {

    const [isLoading, startTransition] = useTransition()

    const {sendMessage} = useMessagesActions(roomId)

    const form = useForm<MessageZodSchemaType>({
        resolver: zodResolver(messageZodSchema),
        defaultValues: {
            text: ""
        },
    })

    async function onSubmit(values: MessageZodSchemaType) {
        startTransition(async () => {
            try {
                await sendMessage(values.text)
                form.reset()
                // Focus after reset completes
                setTimeout(() => {
                    form.setFocus('text')
                }, 100)
            } catch (error) {
                toast.error("Unable to send message")
                console.log(error);
            }
        })
    }

    useEffect(() => {
        form.setFocus('text')
    }, [roomId, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name="text"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="rounded-full border-border bg-background focus:bg-card transition-colors"
                    autoComplete="off"
                    disabled={isLoading}
                    {...field}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default FormMessageChat