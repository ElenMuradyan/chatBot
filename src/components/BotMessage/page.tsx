import { TypeAnimation } from "react-type-animation";

export function BotMessage({text}: {text: string}){
    return(
        <TypeAnimation 
        className="botMessage"
        sequence={[text]}
        wrapper="span"
        speed={99}
        cursor={false}
        repeat={0}
        />
    )
}