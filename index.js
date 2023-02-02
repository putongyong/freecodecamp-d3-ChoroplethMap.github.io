//create the title
    d3.select("main")
    .append("div")
    .attr("id", "title")
    .text("United States Educational Attainment");

    d3.select("main")
    .append("div")
    .attr("id", "description")
    .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)");

//create the tooltip
    d3.select("body")
    .append("div")
    .attr("id", "tooltip")


    async function getData() {
        const responseCounty = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
        const datasetCounty = await responseCounty.json();
        const dataCounty = topojson.feature(datasetCounty, datasetCounty.objects.counties).features
        const responseEdu = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
        const dataEdu = await responseEdu.json();
        createSVG(dataCounty, dataEdu);
      };  
     getData() 
    
function createSVG(dataCounty, dataEdu){

    var width = 800;
    var height = 500;
    var svg = d3.select("main")
    
    .append("svg")
    .attr("width", width+100)
    .attr("height", height+100)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","blue")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 600)
	.attr("y", 550)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","green")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 620)
	.attr("y", 550)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","yellow")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 640)
	.attr("y", 550)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","red")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 660)
	.attr("y", 550)


    svg.selectAll("path")
    .data(dataCounty)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr('class', 'county')
    .style('fill',(d) => {
        let result=dataEdu.find(element=>element.fips===d.id)
        if(result.bachelorsOrHigher>30) {
            return 'red'
        } else if(result.bachelorsOrHigher>20) {
            return 'yellow'
        } else if(result.bachelorsOrHigher>10) {
            return 'green'
        } else {
            return 'blue'
        } 
    } )
    .attr("data-fips",(d)=>{
        let result=dataEdu.find(element=>element.fips===d.id)
        return result.fips
    })
    .attr("data-education",(d) => {
        let result=dataEdu.find(element=>element.fips===d.id)
        return result.bachelorsOrHigher;
    })
    .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "visible") 
         })
         .on("mouseover",(e,d) => {
            let result=dataEdu.find(element=>element.fips===d.id)
            d3.select("#tooltip")
            .style("position", "absolute")
            .style("background-color","yellow")
            .style("opacity",".85")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("top", e.pageY+"px")
            .style("left",e.pageX+6+"px")
            .attr("data-education",result.bachelorsOrHigher)
            .html(`<p> ${result.area_name +' : '+ result.bachelorsOrHigher + ' % '} </p>`)
            .style("visibility", "visible")
         })
         .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "hidden")            
         })
;

}
