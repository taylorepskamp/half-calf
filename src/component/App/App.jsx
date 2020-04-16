import React from 'react';
import Chart from "../Chart/chart";
import PageHelmet from "../common/Helmet";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../header/Header";
import Select from 'react-select';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css';


const drinkOptions = [
    { value: '64', label: 'Espresso' },
    { value: '95', label: 'Coffee' },
    { value: '80', label: 'Red Bull' },
    { value: '45', label: 'Soda' },
    { value: '28', label: 'Green Tea' },
    { value: '47', label: 'Black Tea' },
  ];

const quantityOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];

const timeOptions = [
    { value: 5, label: '5:00 am' },
    { value: 6, label: '6:00 am' },
    { value: 7, label: '7:00 am' },
    { value: 8, label: '8:00 am' },
    { value: 9, label: '9:00 am' },
    { value: 10, label: '10:00 am' },
    { value: 11, label: '11:00 am' },
    { value: 12, label: '12:00 pm' },
    { value: 13, label: '1:00 pm' },
    { value: 14, label: '2:00 pm' },
    { value: 15, label: '3:00 pm' },
    { value: 16, label: '4:00 pm' },
    { value: 17, label: '5:00 pm' },
    { value: 18, label: '6:00 pm' },
    { value: 19, label: '7:00 pm' },
    { value: 20, label: '8:00 pm' },
    { value: 21, label: '9:00 pm' },
    { value: 22, label: '10:00 pm' },
    { value: 23, label: '11:00 pm' },
    { value: 0, label: '12:00 am' },
    { value: 1, label: '1:00 am' },
    { value: 2, label: '2:00 am' },
    { value: 3, label: '3:00 am' },
    { value: 4, label: '4:00 am' },
];

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            drinkOption: null,
            quantityOption: null,
            timeOption: null,
            drinkList:[],
            data:[{hour: "12 am"},
                  {hour: "1 am"},
                  {hour: "2 am"},
                  {hour: "3 am"},
                  {hour: "4 am"},
                  {hour: "5 am"},
                  {hour: "6 am"},
                  {hour: "7 am"},
                  {hour: "8 am"},
                  {hour: "9 am"},
                  {hour: "10 am"},
                  {hour: "11 am"},
                  {hour: "12 pm"},
                  {hour: "1 pm"},
                  {hour: "2 pm"},
                  {hour: "3 pm"},
                  {hour: "4 pm"},
                  {hour: "5 pm"},
                  {hour: "6 pm"},
                  {hour: "7 pm"},
                  {hour: "8 pm"},
                  {hour: "9 pm"},
                  {hour: "10 pm"},
                  {hour: "11 pm"},
                  {hour: "12 am +1"},
                  {hour: "1 am +1"},
                  {hour: "2 am +1"},
                  {hour: "3 am +1"},
                  {hour: "4 am +1"},
                  {hour: "5 am +1"},
                  {hour: "6 am +1"},
                  {hour: "7 am +1"},
                  {hour: "8 am +1"},
                  {hour: "9 am +1"},
                  {hour: "10 am +1"},
                  {hour: "11 am +1"},
                  ],
            bedtime: 22,
            awaketime: 31,
            bedtimeAmount:0,
            awaketimeAmount:0,
            totalAmount:0,
            peakAmount:0,
            id:0,
        }
    
    
    this.handleDrinkChange = this.handleDrinkChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.addDrink = this.addDrink.bind(this)
    this.removeDrink = this.removeDrink.bind(this)
    this.buildChart = this.buildChart.bind(this)
    this.calcMax = this.calcMax.bind(this)
    }

    calcMax(){
        let max = 0
        for(let i = 0; i<this.state.data.length; i++){
            const obj = {...this.state.data[i]}
            delete obj.hour
            const sum = Object.keys(obj).map(key=>Number(obj[key])).reduce( (sum , current)=> (sum +current),0)
            if(sum > max){
                max = sum
            }
        }
        this.setState({peakAmount: max.toFixed(0)})
    }
    
    buildChart(){
        this.setState({id: 1 + Math.random()})
        // create hours for x axis

        let dataList = [{hour: "12 am"},
                        {hour: "1 am"},
                        {hour: "2 am"},
                        {hour: "3 am"},
                        {hour: "4 am"},
                        {hour: "5 am"},
                        {hour: "6 am"},
                        {hour: "7 am"},
                        {hour: "8 am"},
                        {hour: "9 am"},
                        {hour: "10 am"},
                        {hour: "11 am"},
                        {hour: "12 pm"},
                        {hour: "1 pm"},
                        {hour: "2 pm"},
                        {hour: "3 pm"},
                        {hour: "4 pm"},
                        {hour: "5 pm"},
                        {hour: "6 pm"},
                        {hour: "7 pm"},
                        {hour: "8 pm"},
                        {hour: "9 pm"},
                        {hour: "10 pm"},
                        {hour: "11 pm"},
                        {hour: "12 am +1"},
                        {hour: "1 am +1"},
                        {hour: "2 am +1"},
                        {hour: "3 am +1"},
                        {hour: "4 am +1"},
                        {hour: "5 am +1"},
                        {hour: "6 am +1"},
                        {hour: "7 am +1"},
                        {hour: "8 am +1"},
                        {hour: "9 am +1"},
                        {hour: "10 am +1"},
                        {hour: "11 am +1"},
                        ]
        //set parameters for for loop
        let drinkId = ['drink1','drink2','drink3','drink4','drink5','drink6','drink7','drink8','drink9','drink10','drink11','drink12']
        let bedtimeCalc = []
        let awaketimeCalc = []
        let totalCalc = []
        
        for(let z = 0;z<this.state.drinkList.length;z++){
            let drink = this.state.drinkList[z]
            let name = drinkId[z]
            let t = 0
            totalCalc.push(Number(drink.mgValue))
            for (let i = drink.timeValue; i<36; i++){
                let obj = dataList[i]
                let mgs = drink.mgValue * drink.quantValue
                let degradedMgs = (mgs * (0.5 ** (t/6)))
                obj[name] =  degradedMgs.toFixed(2)
                if(i==this.state.awaketime){
                    awaketimeCalc.push(degradedMgs)
                }
                if(i==this.state.bedtime){
                    bedtimeCalc.push(degradedMgs)
                }
                t++ }
        }
        this.setState({data: dataList})
        this.setState({bedtimeAmount: bedtimeCalc.reduce( (sum , current)=> (sum +current),0).toFixed(0)},()=>{this.calcMax()})
        this.setState({awaketimeAmount: awaketimeCalc.reduce( (sum , current)=> (sum +current),0).toFixed(0)})
        this.setState({totalAmount: totalCalc.reduce( (sum , current)=> (sum +current),0).toFixed(0)})
    }

    handleDrinkChange(value){
        this.setState({ drinkOption : value });
     }
     handleTimeChange(value){
        this.setState({ timeOption : value });
     }
     handleQuantityChange(value){
        this.setState({ quantityOption : value });
     }
     handleSliderChange(value){
        this.setState({ bedtime : value[0] })
        this.setState({ awaketime : value[1] })
        //this.buildChart();
     }
  

    addDrink(){
        if(this.state.drinkOption && this.state.quantityOption && this.state.timeOption){
            //create item with uuid
            const newDrink={
                id: 1 + Math.random(),
                name: this.state.drinkOption.label,
                mgValue: this.state.drinkOption.value,
                quant: this.state.quantityOption.label,
                quantValue: this.state.quantityOption.value,
                time: this.state.timeOption.label,
                timeValue: this.state.timeOption.value
            };
            //copy of current list of items
            let list = this.state.drinkList;
            //add new item to list
            list.push(newDrink);
            //update state with new list 
            this.setState({drinkList: list}, ()=> {this.buildChart()}) 
        }
        else {
            alert("Please select all three fields.")}
    }
    removeDrink(id){
        const drinkList = [...this.state.drinkList]
        const updatedList = drinkList.filter(drink => drink.id !== id)
        this.setState({drinkList:updatedList}, ()=> {this.buildChart()})
    }
    
    
    

    render(){
        
    return (
        <>
            <PageHelmet pageTitle='Half Caff' />

            {/* Start Header Area  */}
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            <div className="breadcrumb-area rn-bg-color ptb--10 bg_image--1" data-black-overlay="6">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-inner pt--100">
                                    <h2>Half Caff.</h2>
                                    <h4>Chart Caffeine's Half-Life</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* End Header Area  */}


            {/* Start Page Wrapper  */}
            <main className="page-wrapper">

                {/* Start Progress Bar Area   */}

                <div className="rn-progress-area ptb--40 bg_color--1">
                    <div className="container">
                        <div className="row justify-content-center row--12">
                            
                            <div className="col-lg-2 col-md-2 col-12">
                                <h5>Sleep Range:</h5>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12 ">
                                <Range  min={20} 
                                        max={34} 
                                        defaultValue={[22,31]} 
                                        vertical = {false} 
                                        marks={{20:"8 pm",21: "9",22: "10",23: "11",24: "12",25: "1",26: "2",27: "3",28: "4",29: "5",30: "6", 31: "7",32: "8",33: "9",34: "10am"}}
                                        onChange={(value) => this.handleSliderChange(value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rn-progress-area bg_color--1">
                    <div className="container">
                        <div className="row justify-content-center row--15">
                          <div className="col-lg-3 col-md-6 col-12" >
                                    <Select
                                        value={this.state.drinkOption}
                                        placeholder = "Drink"
                                        onChange={(value) => this.handleDrinkChange(value)}
                                        options={drinkOptions}
                                    />
                            </div>
                            <div className="col-lg-2 col-md-2 col-12" >
                                    <Select
                                        value={this.state.quantityOption}
                                        placeholder = "Quantity"
                                        onChange={(value) => this.handleQuantityChange(value)}
                                        options={quantityOptions}
                                    />
                            </div > 
                            <div className="col-lg-2 col-md-2 col-12" >  
                                    <Select
                                        value={this.state.timeOption}
                                        placeholder = "Time"
                                        onChange={(value) => this.handleTimeChange(value)}
                                        options={timeOptions}
                                    />
                            </div > 
                            <div className="col-lg-2 col-md-2 col-12">
                                <button className="rn-button-style--2 btn-solid" onClick={ () => {this.addDrink()}}>Add</button>  
                            </div>
                            
                    </div>

                </div>
                </div>
                
                <div className="rn-progress-area ptb--20 bg_color--1">
                    <div className="container">
                        
                            {this.state.drinkList.map(drink => {
                            return(
                                <div>
                                    <div key={drink.id} className="row justify-content-center ptb--10 row--15">
                                        <div className="col-lg-3 col-md-3 col-12l" >
                                            <h5>{drink.name}</h5> 
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-12" >
                                            <h5>{drink.quant}</h5>
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-12" >
                                            <h5>{drink.time}</h5>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-12" >
                                            <button className="rn-btn btn-solid" onClick={() => {this.removeDrink(drink.id)}}>-</button>
                                        </div>
                                    </div >
                                 
                                </div>
                                )
                            })} 
                          
                    </div>
                </div>

                
               
                <Chart  key={this.state.id}
                        drinkList = {this.state.drinkList} 
                        data = {this.state.data} 
                        bedtime = {this.state.bedtime} 
                        awaketime = {this.state.awaketime}
                        peakAmount = {this.state.peakAmount}
                        />

                <div className="rn-progress-area pb--100 bg_color--1">
                    <div className="container">
                        <div className="row justify-content-center row--12">
                                <div className="col-lg-3 col-md-3 col-12">
                                    <h5>Bedtime: {this.state.bedtimeAmount} mgs</h5>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <h5>Waketime: {this.state.awaketimeAmount} mgs</h5>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <h5>Peak: {this.state.peakAmount} mgs</h5>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <h5>Total: {this.state.totalAmount} mgs</h5>
                                </div>
                        </div>


                        
                        <div  className="row justify-content-center ptb--30 row--12">
                            <p>Your intake at bedtime = <b>{(this.state.bedtimeAmount/64).toFixed(1)} shots of Espresso. </b> Note, caffeine is known to prolong the time it takes to fall asleep, shorten total sleep time, worsen sleep quality, reduce deep sleep time, and result in more frequent awakenings.</p>
                        </div>
                    </div>
                </div>
                
                
                
            </main>
            {/* End Page Wrapper  */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}
        </>
        
    )}
}

export default App;