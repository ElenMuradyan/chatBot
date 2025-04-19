export interface voiceRecognitionInterface {
    setVoiceMessage: (val: string) => void,
    setVoiceRecording: (val: boolean) => void,
    endFuncton: () => Promise<string>,
    loading: boolean
}