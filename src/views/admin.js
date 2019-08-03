import React from 'react' 
import axios from 'axios'
const mytable = {
    'width': '100%'
}
class Admin extends React.Component {
    state = {
        loggedIn: true,
        companies: [],
        name: '',
        type: '',
        login: '',
        password:'',
    }
    componentDidMount(){
        this.getCompanies()
    }
    getCompanies = async () => {
        let result  = await axios.get('http://localhost:5000/get/companies')
        this.setState({companies: result.data.reverse})
    }
    postCompany = async () => {
        let result  = await axios.post('http://localhost:5000/get/companies', {
            login: this.state.login,
            password: this.state.password,
            type: this.state.type,
            name:this.state.name
        })
        this.setState({companies: result.data.reverse})
    }
    render(){
        return (
            <div>
                <div>
                <input onClick={(e) =>{ this.setState({'name': e.target.value})}} />
                <input onClick={(e) =>{ this.setState({'type': e.target.value})}} />
                <input onClick={(e) =>{ this.setState({'login': e.target.value})}} />
                <input onClick={(e) =>{ this.setState({'password': e.target.value})}} />
                <button onClick={this.postCompany}>Создать</button>
                </div>
                <table border="1" className={mytable}>
                    <tbody>
                        <tr>
                        <td>Имя</td>
                        <td>Тип заведения</td>
                        <td>Логин</td>
                        <td>Пароль</td>
                        </tr>    
                        {/* {this.state.companies.map(item => {
                            return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.login}</td>
                                <td>{item.password}</td>
                            </tr>)
                        })}                   */}
                    </tbody>      
                </table>
            </div>
        )
    }
}

export default Admin