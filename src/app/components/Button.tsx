type CustomButtonProps = {
    text: string
    onClick: (param:any) => void
}

export default function CustomButton({text,onClick }:CustomButtonProps){
    return (
        <button className="bg-customBlack w-full h-full max-w-[350px] max-h-[40px] p-[10px] text-white rounded-[5px] align-middle " onClick={onClick}>
            {text}
        </button>
    )
}