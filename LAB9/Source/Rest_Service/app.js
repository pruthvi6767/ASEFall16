/**
 * Created by pruthvirajreddy on 10/28/2016.
 */
 angular.module('node',[])

.controller('ncontroller',function($scope, $http, $window){


    $window.onload=function(){

       $http.get('http://localhost:8081/geti')
       .success(function (result) {

           $scope.street= result.streets[0].street;
           //console.log(result);
           //var ven1 = result;
           var descString = "";
           result.streets.forEach(function(streets) {
               descString += streets.street + " ";
           });
           //console.log(descString);
           var descArray = descString.split(" ");
          console.log(descArray);
           var descObjects = [];
           descArray.forEach(function(d) {
               if (!isNumeric(d) &&  !matches(d,"AND","OF","TO","","&","ON","-          ","THE","IN","BE","FOR","A")) {
                   var descObject = {};
                   descObject.description = d;
                   descObjects.push(descObject);
               }

           })

          //console.log(descObjects);
           var wordCount = d3.nest()
               .key(function(d) { return d.description; })
               .rollup(function(v) { return v.length; })
               .entries(descObjects);

           wordCount.sort(function(a,b) {
               return b.values - a.values;
           });
           var tags = [];

           wordCount.forEach(function(d) {
               tags.push([d.key,parseInt(d.values)]);
           });

           tags = tags.slice(0,250);
           //WordCloud(document.getElementById('cloud'), {
               //var  height = $window.innerHeight * 0.75;
               //.height(height);
              // gridSize: 100,
             //  weightFactor: 2,
              // rotateRatio: 0.5,
              // gridSize: Math.round(16 * $('#canvas').width() / 1024),
               //weightFactor: function (size) {
                 //  return Math.pow(size, 2.3) * $('#canvas').width() / 1024;
               //},
               //fontFamily: 'Times, serif',
               //color: function (word, weight) {
                 //  return (weight === 12) ? '#f02222' : '#c09292';
               //},
               //rotateRatio: 0.5,
               //backgroundColor: '#ffe0e0',
               //list : tags.map(function(word) { return [word[0], Math.round(word[1]/5)]; }),
               //wait: 10
           //});


          //console.log(tags.map(function(word) { return [word[0], Math.round(word[1]/2)]; }));
          // console.log(tagMap);
           console.log(wordCount);
           //var clicked = function(ev) {
             //  if (ev.target.nodeName === "SPAN") {
               //    var tag = ev.target.textContent;
                 //  var tagElem;
                   //if (tags.some(function(el) { if (el[0] === tag) {tagElem = el; return true;} return false; })) {
                     //  document.getElementById("details").innerText = "There were " + tagElem[1] +
                       //    " mentions of “" + tag + "” in the last year";
                  // }
               //} else {
                 //  document.getElementById("details").innerText = "";
              // }
           //}
           //document.getElementById("cloud").addEventListener("click", clicked)
           var frequency_list = [
               //{'text':null,'size':null}
           ];


           for(var i=0;i<wordCount.length;i++){

               frequency_list.push({text:wordCount[i].key, size:wordCount[i].value});
           }//[{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10},{"text":"electricity","size":15},{"text":"movement","size":10},{"text":"relation","size":5},{"text":"things","size":10},{"text":"force","size":5},{"text":"ad","size":5},{"text":"energy","size":85},{"text":"living","size":5},{"text":"nonliving","size":5},{"text":"laws","size":15},{"text":"speed","size":45},{"text":"velocity","size":30},{"text":"define","size":5},{"text":"constraints","size":5},{"text":"universe","size":10},{"text":"physics","size":120},{"text":"describing","size":5},{"text":"matter","size":90},{"text":"physics-the","size":5},{"text":"world","size":10},{"text":"works","size":10},{"text":"science","size":70},{"text":"interactions","size":30},{"text":"studies","size":5},{"text":"properties","size":45},{"text":"nature","size":40},{"text":"branch","size":30},{"text":"concerned","size":25},{"text":"source","size":40},{"text":"google","size":10},{"text":"defintions","size":5},{"text":"two","size":15},{"text":"grouped","size":15},{"text":"traditional","size":15},{"text":"fields","size":15},{"text":"acoustics","size":15},{"text":"optics","size":15},{"text":"mechanics","size":20},{"text":"thermodynamics","size":15},{"text":"electromagnetism","size":15},{"text":"modern","size":15},{"text":"extensions","size":15},{"text":"thefreedictionary","size":15},{"text":"interaction","size":15},{"text":"org","size":25},{"text":"answers","size":5},{"text":"natural","size":15},{"text":"objects","size":5},{"text":"treats","size":10},{"text":"acting","size":5},{"text":"department","size":5},{"text":"gravitation","size":5},{"text":"heat","size":10},{"text":"light","size":10},{"text":"magnetism","size":10},{"text":"modify","size":5},{"text":"general","size":10},{"text":"bodies","size":5},{"text":"philosophy","size":5},{"text":"brainyquote","size":5},{"text":"words","size":5},{"text":"ph","size":5},{"text":"html","size":5},{"text":"lrl","size":5},{"text":"zgzmeylfwuy","size":5},{"text":"subject","size":5},{"text":"distinguished","size":5},{"text":"chemistry","size":5},{"text":"biology","size":5},{"text":"includes","size":5},{"text":"radiation","size":5},{"text":"sound","size":5},{"text":"structure","size":5},{"text":"atoms","size":5},{"text":"including","size":10},{"text":"atomic","size":10},{"text":"nuclear","size":10},{"text":"cryogenics","size":10},{"text":"solid-state","size":10},{"text":"particle","size":10},{"text":"plasma","size":10},{"text":"deals","size":5},{"text":"merriam-webster","size":5},{"text":"dictionary","size":10},{"text":"analysis","size":5},{"text":"conducted","size":5},{"text":"order","size":5},{"text":"understand","size":5},{"text":"behaves","size":5},{"text":"en","size":5},{"text":"wikipedia","size":5},{"text":"wiki","size":5},{"text":"physics-","size":5},{"text":"physical","size":5},{"text":"behaviour","size":5},{"text":"collinsdictionary","size":5},{"text":"english","size":5},{"text":"time","size":35},{"text":"distance","size":35},{"text":"wheels","size":5},{"text":"revelations","size":5},{"text":"minute","size":5},{"text":"acceleration","size":20},{"text":"torque","size":5},{"text":"wheel","size":5},{"text":"rotations","size":5},{"text":"resistance","size":5},{"text":"momentum","size":5},{"text":"measure","size":10},{"text":"direction","size":10},{"text":"car","size":5},{"text":"add","size":5},{"text":"traveled","size":5},{"text":"weight","size":5},{"text":"electrical","size":5},{"text":"power","size":5}];

           console.log(frequency_list);

           var color = d3.scale.linear()
               .domain([0,1,2,3,4,5,6,10,15,20,100])
               .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

           d3.layout.cloud().size([800, 300])
               .words(frequency_list)
               .rotate(0)
               //.text(function(d) { return d.text; })
               .fontSize(function(d) { return d.size; })
               .on("end", draw)
               .start();

           function draw(words) {
               d3.select("body").append("svg")
                   .attr("width", 850)
                   .attr("height", 350)
                   .attr("class", "wordcloud")
                   .append("g")
                   // without the transform, words words would get cutoff to the left and top, they would
                   // appear outside of the SVG area
                   .attr("transform", "translate(320,200)")
                   .selectAll("text")
                   .data(words)
                   .enter().append("text")
                   .style("font-size", function(d) { return d.size + "px"; })
                   .style("fill", function(d, i) { return color(i); })
                   //.transition()
                   // rest of your code
                   //.each(function () {
                     //  d3.select(this).on("click", function (d) {alert('ok');});
                   //})
                   .attr("transform", function(d) {
                       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                   })
                   .text(function(d) { return d.text; });
           }
          function isNumeric(n) {
             return !isNaN(parseFloat(n)) && isFinite(n);
          }

           function matches(eVal,argList) {
               for (var i=1; i<arguments.length;i++)
                   if (arguments[i] == eVal)
                       return true;
           }

       })
   }
})