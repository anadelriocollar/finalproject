import Label from "./Label"
import Input from "./Input"

function Field({ id, children, type, value }) {
    /* to be able to return two elements we have to wrap them in a container */
    return <>
        <Label forId={id}>{children}</Label>
        <Input id={id} type={type || "text"} value={value} />
    </>
}

export default Field 