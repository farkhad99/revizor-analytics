import React from 'react' 
import axios from 'axios' 

class Survey extends React.Component {
    state = {
        answers: [
            {value: 'Verybad', text: 'Ужасно', n:1},
            {value: 'Bad', text: 'Плохо',n:2 },
            {value: 'Normal', text: 'Хорошо',n:3 },
            {value: 'Super', text: 'Отлично',n:4}
        ],
        answer: ''    
    }    
    postAnswer = async (value, n) => {
        let res = await axios.post('http://localhost:5000/post/answer/a1', {
            answer: value,
            mark: n
        })
        console.log(res)
        // alert('Спасибо за ответ!)')
    }
    render(){
        return (
            <center>Запишите ваш ответ
                {this.state.answers.map(item =>  {
                  return ( <button key={item.value} onClick={() => {this.postAnswer(item.value, item.n)}}>{item.text}</button>)
                })
            }
            </center>
        )
    }
}

export default Survey