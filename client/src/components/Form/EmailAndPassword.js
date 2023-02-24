const EmailAndPassword = (props) => {

    const handleChange = props.handleChange
    const email = props.email

    return (
        <>
            <input type="email" name="email" placeholder="e-mail" required value={email} onChange={handleChange} />
            <input type="password" name="password" placeholder="mot de passe" required onChange={handleChange} />
        </>
    )
}

export default EmailAndPassword