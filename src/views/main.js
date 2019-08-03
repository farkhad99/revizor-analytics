import React from 'react' 
import axios from 'axios' 
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
// import { generateProgrammingLanguageStats } from '@nivo/generators'
import { generateCountriesData } from '@nivo/generators'
class Main extends React.Component {
    state = {
        res : '',
        data: [
        ],
        barDates: [

        ],
        bardata: [
            {
            "country": "AD",
            "hot dog": 19,
            "hot dogColor": "hsl(113, 70%, 50%)",
            "burger": 163,
            "burgerColor": "hsl(111, 70%, 50%)",
            "sandwich": 199,
            "sandwichColor": "hsl(193, 70%, 50%)",
            "kebab": 84,
            "kebabColor": "hsl(152, 70%, 50%)",
            "fries": 92,
            "friesColor": "hsl(175, 70%, 50%)" 
            },
            {
            "country": "AD",
            "hot dog": 19,
            "hot dogColor": "hsl(113, 70%, 50%)",
            "burger": 163,
            "burgerColor": "hsl(111, 70%, 50%)",
            "sandwich": 199,
            "sandwichColor": "hsl(193, 70%, 50%)",
            "kebab": 84,
            "kebabColor": "hsl(152, 70%, 50%)",
            "fries": 92,
            "friesColor": "hsl(175, 70%, 50%)"
            },
        ]
    }
    getAnswers = async () => {
        let res = await axios.get('http://localhost:5000/get/answers/a1')
        console.log(res)
        let data = []
        var vbad=0, bad = 0, norm = 0, perfect = 0
        res.data.map(item => {
            if(item.answer === 'Super') perfect+=1;
            else if(item.answer === 'Verybad') vbad+=1
            else if(item.answer === 'Normal') norm+=1
            else if(item.answer === 'Bad') bad+=1
        })
        data.push({id:'super', label: 'Отлично', value:perfect, color: 'green'})
        data.push({id:'normal', label: 'Хорошо', value:norm})
        data.push({id:'vbad', label: 'Ужасно', value:vbad})
        data.push({id:'bad', label: 'Плохо', value:bad})
        let today = new Date().getTime()
        let all_date = []
        for(let i=1;i<5;i++){
            all_dates.push(today - )
        }
        let tdate = today.getDate+'-'+(today.getMonth+1)+'-'+today.getFullYear
        let dates: []
        this.setState({barDates: dates})
        this.setState({data: data})
        this.setState({res: res}) 
    }
    componentDidMount(){ 
        this.getAnswers()
    }
    // getChartDatas = () => {
    //     arr = []
    //     this.state.res.data.map()
    // }
    render(){
        return (
            <center>
            Главная страница для руководителей компаний<br/>
            {this.state.data ? (this.state.data.map(item => {
                return (<span key={item.id}> {item.label} {item.value}<br/></span>)
            })) : (null)}    
            <div style={{height:800}}><ResponsivePie
                margin={{
                    top: 1.5,
                    right: 1.5,
                    bottom: 1.5,
                    left: 1.5,
                }}
                data={this.state.data.map(d => ({
                    ...d,
                }))}
                // colors={colors}
                innerRadius={0.4}
                enableRadialLabels={false}
                borderWidth={3}
                borderColor="#000"
                slicesLabelsSkipAngle={10}
                animate={false}
                isInteractive={false}
                />
                <br />
                <ResponsiveBar
            margin={{
                top: 1.5,
                right: 10,
                bottom: 1.5,
                left: 1.5,
            }}
            padding={0.2}
            data={generateCountriesData(['rock', 'jazz', 'hip-hop', 'reggae'], { size: 9 })}
            indexBy="date"
            enableGridX={false}
            enableGridY={false}
            keys={['rock', 'jazz', 'hip-hop']}
            // colors={colors}
            axisBottom={null}
            axisLeft={null}
            borderWidth={3}
            borderColor="#000"
            enableLabel={true}
            labelSkipHeight={24}
            isInteractive={false}
            animate={false}
        />
                </div>
                </center>
        )
    }
}

export default Main