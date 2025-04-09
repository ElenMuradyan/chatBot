import { TypeAnimation } from "react-type-animation";

export function BotMessage({text}: {text: string}){
    return(
        <TypeAnimation 
        sequence={[text]}
        speed={90}
        wrapper="span"
        cursor={false}
        repeat={0}
        />
    )
}