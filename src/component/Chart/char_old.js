import React from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class Chart extends React.Component{
    componentDidMount(){
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = [];
        
        
        // create hours for x axis
        for (let i = 0; i<36 ; i++){
            if(i==0){
                chart.data.push({
                     "hour":`12 am`,
                    })
            }
            if(i==12){
                chart.data.push({
                         "hour":`12 pm`,
                        })
            }
            if(i>0 &&i<12){
            chart.data.push({
                 "hour":`${i} am`,
                })
            }
            if(i>12 && i<24){
                chart.data.push({
                    "hour":`${i%12} pm`,
                   })
            }
            if(i==24){
                chart.data.push({
                    "hour":`12 am +1`,
                   })
            }
            if(i>24){
                chart.data.push({
                    "hour":`${i%24} am +1`,
                   })
            }
        }

        //create values for line series 1
        if(this.props.drinkList.length > 0){
            let drink1 = this.props.drinkList[0]
            let  t = 0
                for (let i=drink1.timeValue; i<36;i++){
                    let name = "drink1"
                    let obj = chart.data[i]
                    let mgs = drink1.mgValue * drink1.quantValue
                    obj[name] =  (mgs * (0.5 ** (t/6))).toFixed(2)
                    t++ }
        }

        if(this.props.drinkList.length > 1){
            let drink2 = this.props.drinkList[1]
                let  t = 0
                for (let i=drink2.timeValue; i<36;i++){
                    let name = "drink2"
                    let obj = chart.data[i]
                    let mgs = drink2.mgValue * drink2.quantValue
                    obj[name] =  (mgs * (0.5 ** (t/6))).toFixed(2)
                    console.log(chart.data[i])
                    t++ }
                
        }

        if(this.props.drinkList.length > 2){
            let drink3 = this.props.drinkList[2]
            let  t = 0
                for (let i=drink3.timeValue; i<36;i++){
                    let name = "drink3"
                    let obj = chart.data[i]
                    let mgs = drink3.mgValue * drink3.quantValue
                    obj[name] =  (mgs * (0.5 ** (t/6))).toFixed(2)
                    t++ }
        }


        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "hour"
           

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        if(this.props.drinkList.length > 0){
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX = "hour";
        series.name = this.props.drinkList[0].name;
        series.dataFields.valueY = "drink1";
        series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value} mg</b></span>";
        series.tooltipText = "[#000]{valueY.value}[/]";
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.strokeWidth = 3;
        series.tooltip.getFillFromObject = false;
        series.fillOpacity = 0.6;
        series.strokeWidth = 2;
        series.stacked = true;
        }

        if(this.props.drinkList.length > 1){
        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.name = this.props.drinkList[1].name;
        series2.dataFields.categoryX = "hour";
        series2.dataFields.valueY = "drink2";
        series2.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value} mg</b></span>";
        series2.tooltipText = "[#000]{valueY.value}[/]";
        series2.tooltip.background.fill = am4core.color("#FFF");
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.background.strokeWidth = 3;
        series2.sequencedInterpolation = true;
        series2.fillOpacity = 0.6;
        series2.stacked = true;
        series2.strokeWidth = 2;}

        if(this.props.drinkList.length > 2){
        let series3 = chart.series.push(new am4charts.LineSeries());
        series3.name = this.props.drinkList[2].name;
        series3.dataFields.categoryX = "hour";
        series3.dataFields.valueY = "drink3";
        series3.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value} mg</b></span>";
        series3.tooltipText = "[#000]{valueY.value}[/]";
        series3.tooltip.background.fill = am4core.color("#FFF");
        series3.tooltip.getFillFromObject = false;
        series3.tooltip.getStrokeFromObject = true;
        series3.tooltip.background.strokeWidth = 3;
        series3.sequencedInterpolation = true;
        series3.fillOpacity = 0.6;
        series3.defaultState.transitionDuration = 1000;
        series3.stacked = true;
        series3.strokeWidth = 2;}


        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";

        // axis ranges
        let range = categoryAxis.axisRanges.create();
        range.category = chart.data[22].hour;
        range.endCategory = chart.data[30].hour;
        range.axisFill.fill = chart.colors.getIndex(11);
        range.axisFill.fillOpacity = 0.2;

        range.label.text = "Sleep Time";
        range.label.inside = true;
        range.label.rotation = 90;
        range.label.horizontalCenter = "right";
        range.label.verticalCenter = "bottom";

        /*let range2 = categoryAxis.axisRanges.create();
        range2.category = chart.data[22].hour;
        range2.grid.stroke = chart.colors.getIndex(7);
        range2.grid.strokeOpacity = 0.6;
        range2.grid.strokeDasharray = "5,2";


        range2.label.text = "Motorcycle fee introduced";
        range2.label.inside = true;
        range2.label.rotation = 90;
        range2.label.horizontalCenter = "right";
        range2.label.verticalCenter = "bottom";*/

        let bedtime = 23
        this.bedtimeCalc = chart.data[bedtime].drink1 + chart.data[bedtime].drink2 + chart.data[bedtime].drink3
        
    }

    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }

    render(){

      return(
        <div className="rn-progress-area pb--30 bg_color--1">
            <div className="container">
                <div className="row justify-content-center row--15">
                    <div id="chartdiv" style={{ width: "100%", height: "600px" }}>
                    </div>
                </div>
                <div className="row justify-content-center ptb--40 row--12">
                        <div className="col-lg-3 col-md-3 col-12">
                            <h5>Bedtime: 60 mgs</h5>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <h5>Waketime: 50 mgs</h5>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <h5>Peak: 60 mgs</h5>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <h5>Total: 70 mgs</h5>
                        </div>
                </div>
            </div>
        </div>
      )}
}
      export default Chart