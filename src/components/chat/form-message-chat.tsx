import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useMessagesActions } from "@/hooks/use-messages-actions"
import { toast } from "sonner"
import { useTransition } from "react"

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
            } catch (error) {
                toast.error("Unable to send message")
                console.log(error);
            }
        })
    }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
            control={form.control}
            name="text"
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <Input placeholder="Write message" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" disabled={isLoading} className="space-y-2">
            {
                isLoading ? "Sending" : "Send"
            }
        </Button>
    </form>
  </Form>
}

export default FormMessageChat