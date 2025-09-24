import { Button } from "@/components/ui/button";
import { OTPScreen } from "./OTPConfig";

interface OTPFormProps extends OTPScreen {
    email?: string
    onCallForm?: () => void
}

export default function OTPForm({title, description, onCallForm, email}: OTPFormProps){
    return(
        <form>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button onClick={onCallForm}>Call another form</Button>
            
        </form>
    )
}