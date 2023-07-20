type CustomButtonProps = {
    text: string
    className?: string
    onClick: (param:any) => void
}

export default function CustomButton({text,onClick,className}:CustomButtonProps){
    return (
        <button className={`bg-customBlack w-full h-full max-w-[350px] max-h-[40px] p-[10px] text-white rounded-[5px] align-middle ${className}`} onClick={onClick}>
            {text}
        </button>
    )
}