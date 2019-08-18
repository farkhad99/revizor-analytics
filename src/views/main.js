/* eslint-disable no-loop-func */
import React from 'react' 
import axios from 'axios' 
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
// import { generateProgrammingLanguageStats } from '@nivo/generators'
// import { generateCountriesData } from '@nivo/generators'
class Main extends React.Component {
    state = {
        res : '',
        data: [
        ],
        barDates: [

        ],
        linedata: [
        ],
        bardata: [
            {
            "date": "AD",
            "hot dog": 19,
            "hot dogColor": "hsl(113, 70%, 50%)",
            "burger": 163,
            "burgerColor": "hsl(111, 70%, 50%)",
            },
            {
            "date": "AD",
            "hot dog": 19,
            "hot dogColor": "hsl(113, 70%, 50%)",
            "burger": 163,
            "burgerColor": "hsl(111, 70%, 50%)",
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
        data.push({id:'Отлично', label: 'Отлично', value:perfect, color: 'green'})
        data.push({id:'Хорошо', label: 'Хорошо', value:norm})
        data.push({id:'Плохо', label: 'Плохо', value:bad})
        data.push({id:'Ужасно', label: 'Ужасно', value:vbad})
        let today = new Date().getTime()
        let bardata = []
        var linedata = [
            {
                "id": "",
                "color": "red",
                "data": [
                ]
              }
        ]
        for(let i=0;i<31;i++){
            var label = new Date(today - i*86400000).getDate()
            
            let vbad = 0, bad = 0, norm = 0, perfect = 0;
            let sum = 0
            res.data.forEach(item => {
                if(new Date(item.date).getDate() === label) {
                    sum = sum + parseInt(item.mark)
                    // console.log(sum)
                    if(item.answer === 'Super') perfect+=1;
                    else if(item.answer === 'Verybad') vbad+=1
                    else if(item.answer === 'Normal') norm+=1
                    else if(item.answer === 'Bad') bad+=1
                }
            })

            let q = vbad+bad+norm+perfect;
            console.log(sum)
            
            let avg = 0
            if(sum !== 0) avg = sum/q
            let y = avg*100/4 

            linedata[0].data.push({
                x: label,
                y: y              
            })

            // let onePercent = q / 100;
            vbad    = (vbad * 100)/q 
            bad     = (bad *100)/q
            norm    = (norm * 100)/q
            perfect = (perfect * 100)/q
            

            bardata.push(
                {
                    date: label,
                    'Ужасно': vbad,
                    'Плохо':bad,
                    'Хорошо':norm,
                    'Отлично': perfect,
                }
            )
        }

        linedata[0].data = linedata[0].data.reverse()
        this.setState({linedata: linedata})
        this.setState({bardata: bardata.reverse()})
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
            {this.state.res.data ? (this.state.res.data.map(item => {
                return (<span key={item.id}> {item.answer} {item.mark} {new Date(item.date).getDate()}<br/></span>)
            })) : (null)}    
            <div style={{height:400}}>
                <ResponsivePie
                    margin={{
                        top: 15.5,
                        right: 1.5,
                        bottom: 40.5,
                        left: 1.5,
                    }}
                    data={this.state.data.map(d => ({
                        ...d,
                    }))}
                    // colors={colors}
                    innerRadius={0.7}
                    enableRadialLabels={true}
                    borderWidth={1}
                    borderColor="#bbb"
                    slicesLabelsSkipAngle={10}
                    animate={true}
                    colors={{ scheme: 'spectral' }}
                    isInteractive={true}
                />
                <br />

               <ResponsiveBar
                    margin={{
                        top: 41.5,
                        right: 41.0,
                        bottom: 41.5,
                        left: 41.5,
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    // fill={[
                    //     {
                    //         match: {
                    //             id: 'Хорошо'
                    //         },
                    //         id: 'dots'
                    //     },
                    //     {
                    //         match: {
                    //             id: 'Плохо'
                    //         },
                    //         id: 'lines'
                    //     }
                    // ]}
                    padding={0.2}
                    data={this.state.bardata}
                    indexBy="date"
                    enableGridX={false}
                    enableGridY={true}
                    keys={[ 'Ужасно', 'Плохо', 'Хорошо', 'Отлично',  ]}
                    colors={{ scheme: 'spectral' }}
                    borderWidth={0.5}
                    borderColor="#bbb"
                    enableLabel={false}
                    labelSkipHeight={24}
                    isInteractive={true}
                    animate={true}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Дата',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 15,
                        tickPadding: 15,
                        tickRotation: 0,
                        legend: 'Проценты',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                />
                <br />
                <ResponsiveLine
                    data={this.state.linedata}
                    margin={{ top: 80, right: 110, bottom: 90, left: 90 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', stacked: true, min: 'auto', max: '100' }}
                    curve="linear"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Дата',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Средний процент',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'spectral' }}
                    pointSize={5}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    areaOpacity={0.1}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
                </div>
                </center>
        )
    }
}

export default Main