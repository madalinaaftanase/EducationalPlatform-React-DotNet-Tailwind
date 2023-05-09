interface FormField{
    text:string;
    type:string;
    name:string;
    required:boolean;
    className:string;
    onChange: any;
}
function FormField({onChange,text,type,name,required,className}:FormField){
    return (
        <>
            <label>{text}</label>
            <input className={className} type={type} name={name} onChange={onChange} required={required} />
        </>
    )
}

export default FormField;