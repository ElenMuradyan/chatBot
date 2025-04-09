import { TypeAnimation } from "react-type-animation";

export function BotMessage({text}: {text: string}){
    return(
        <TypeAnimation 
        sequence={[text]}
        wrapper="span"
        speed={99}
        cursor={false}
        repeat={0}
        />
    )
}