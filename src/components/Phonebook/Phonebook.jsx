
import { Component } from "react"
import { nanoid } from 'nanoid';

import Filter from "./Filter";
import TitlePhonebook from "./TitlePhonebook";
import Form from "./Form"
import ContactList from "./ContactList";


class Phonebook extends Component {
    state = {
    contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    };

        componentDidMount() {
        const contacts = localStorage.getItem('contacts')
        const parseContacts = JSON.parse(contacts)
        if (contacts) {
            this.setState({
            contacts: parseContacts
        })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        }
    }
    
    addContact = (data) => {
        if (this.state.contacts.find(item => item.name === data.name)) {
            alert(`${data.name} is already in your Phonebook`);
            return;
        }
        this.setState(prevState => {
        const { name, number } = data;
        const newContact = {
        id: nanoid(),
        name,
        number,
        };
        return {
        contacts: [...prevState.contacts, newContact],
        };
        });
    }
    
    Filter = e => {
    this.setState({
        filter: e.target.value,
    });
    };

        filteredContact() {
        if (!this.state.filter) {
            return this.state.contacts;
        }
        const filteredContacts = this.state.contacts.filter(({ name }) => {
            const res = name.toLowerCase().includes(this.state.filter.toLowerCase());
            return res;
        });
        
        return filteredContacts;
    }
    

    deleted = (id) => {
    this.setState(({ contacts }) => ({
        contacts: contacts.filter(contact => contact.id !== id),
    }));
    };
    


    
    render() {
        return ( 
            <div>
                <TitlePhonebook title='Phonebook'/>
                <Form onSubmit={this.addContact} />
                <TitlePhonebook title='Contacts' />
                <Filter onChange={this.Filter} filter={this.state.filter} />
                <ContactList
                    contacts={this.filteredContact()}
                    deleted={this.deleted}
                />
            </div>
        )
    }
}
export default Phonebook