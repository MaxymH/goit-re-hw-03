import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './form.module.css'



class Form extends Component {

    state = {
        name: '',
        number: ''
    }

    handleChange = (e) => {
        const item = e.currentTarget.name;
        const value = e.currentTarget.value
        this.setState({
            [item]: value
        })
    }
    


    onSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state);
        this.setState({
            name: '',
            number: ''
        })
    }
    

    render() {
        return (
            <form className={s.form} onSubmit={this.onSubmit}>
                <h3 className={s.title}>Name</h3>
                <label>
                    <input
                        className={s.input}
                        onChange={this.handleChange}
                        value={this.state.name}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <h3 className={s.title}>Number</h3>
                <label>
                    <input
                        className={s.input}
                        onChange={this.handleChange}
                        value={this.state.number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <button className={s.button} type='submit'>Add contact</button>
            </form>
        )
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}



export default Form