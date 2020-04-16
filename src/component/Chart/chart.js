import React from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class Chart extends React.Component{
    
    

    componentDidMount(){
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = this.props.data;
        
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "hour"

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        let drinkId = ['drink1','drink2','drink3','drink4','drink5','drink6','drink7','drink8','drink9','drink10','drink11','drink12']

        for(let i = 0; i < this.props.drinkList.length; i++){
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.categoryX = "hour";
            series.name = this.props.drinkList[i].name;
            series.dataFields.valueY = drinkId[i];
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

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";

        // axis ranges
        let range = categoryAxis.axisRanges.create();
        range.category = chart.data[this.props.bedtime].hour
        range.endCategory = chart.data[this.props.awaketime].hour
        range.axisFill.fill = chart.colors.getIndex(11);
        range.axisFill.fillOpacity = 0.2;

        range.label.text = "Sleep Time";
        range.label.inside = true;
        range.label.rotation = 90;
        range.label.horizontalCenter = "right";
        range.label.verticalCenter = "bottom";
        
    }

    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }

    render(){

      return(
        <div className="rn-progress-area bg_color--1">
            <div className="container">
                <div className="row justify-content-center row--15">
                    <div id="chartdiv" style={{ width: "100%", height: "600px" }}>
                    </div>
                </div>
            </div>
        </div>
      )}
}
      export default Chart