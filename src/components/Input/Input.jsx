const Input = ({ placeholder, inputChangehandler, value, inputKeychange, type }) => {
    return (
        <input placeholder={placeholder}
            onChange={inputChangehandler}
            value={value}
            onKeyUp={inputKeychange}
            type={type} />
    );
};

export default Input;