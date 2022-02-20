function load_change_chart(table_index) {
    ticker_list = [], mentions_list = [], change_list = [], parent_list = []
    tr = document.getElementsByTagName("table")[table_index].querySelectorAll("tr")
    for (i=1; i<tr.length; i++) {
        td = tr[i].querySelectorAll("td")
        ticker_list.push(td[0].innerHTML)
        mentions_list.push(td[1].innerHTML)
        change_list.push(Math.floor(td[2].innerHTML))
        parent_list.push("")
    }

    var data = [{
        type: 'treemap',
        values: mentions_list,
        labels: ticker_list,
        parents: parent_list,
        customdata: change_list,
        marker: {
            cmin: -200,
            cmax: 200,
            cmid: 0,
            colorscale: [
                ['0.0', 'rgb(255, 40, 30)'],
                ['0.1', 'rgb(246, 53, 56)'],
                ['0.2', 'rgb(191, 64, 69)'],
                ['0.3', 'rgb(139, 68, 78)'],
                ['0.4', 'rgb(100, 73, 83)'],
                ['0.5', 'rgb(65, 69, 84)'],
                ['0.6', 'rgb(53, 118, 78)'],
                ['0.7', 'rgb(47, 158, 79)'],
                ['0.8', 'rgb(47, 158, 79)'],
                ['0.9', 'rgb(48, 204, 90)'],
                ['1.0', 'rgb(48, 255, 100)'],
            ],
            colors: change_list,
        },
        hovertemplate: "<b>%{label}</b><br>Mentions: %{value}<br>Change: %{customdata}%<br><extra></extra>",
        textposition: "center",
        texttemplate: "<b>%{label}</b><br>%{customdata}%",
    }]

    var layout = {
        autosize: true,
        margin: {
            t:0,
            l:10,
            r:10,
            b: 15,
            pad: 0
        },
        automargin: true,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        legend: {
            x: 0.5,
            xanchor: 'center',
            y: 1.1,
            orientation: 'h',
        },
    }

    Plotly.newPlot('change_mentions', data, layout, {displayModeBar: false, showTips: false, responsive: true})
        .then(gd => {
            gd.on("plotly_treemapclick", () => false)
        })
}

function load_sentiment_chart(table_index, link) {
    ticker_list = [], sentiment_list = [], mentions_list = []
    tr = document.getElementsByTagName("table")[table_index].querySelectorAll("tr")
    for (i=1; i<31; i++) {
        td = tr[i].querySelectorAll("td")
        ticker_list.push(td[1].innerHTML)
        mentions_list.push(td[2].innerHTML)
        sentiment_list.push(td[3].innerHTML)
    }

    for (i=1; i<tr.length; i++) {
        td = tr[i].querySelectorAll("td")
        td[1].innerHTML = `<a href="/${link}_live_ticker/?quote=${td[1].innerHTML}"><b>${td[1].innerHTML}</b></a>`
    }

    var trace1 = {
        x: ticker_list,
        y: mentions_list,
        line: {'color': '#4444b1'},
        name: 'Mentions',
        hovertemplate:
                `<b>$%{x}</b><br>` +
                "Mentions: %{y}<br>" +
                "<extra></extra>",
        type: 'line',
        mode: 'lines+markers',
        yaxis: 'y2'
    };

    var trace2 = {
        x: ticker_list,
        y: sentiment_list,
        name: 'Net Sentiment',
        marker: {
            color: '#ffa500c4',
        },
        hovertemplate:
                `<b>$%{x}</b><br>` +
                "Sentiment: %{y}%<br>" +
                "<extra></extra>",
        type: 'bar',
    };

    trace2.marker.color = trace2.y.map(function (v) {
      return v <= 0  ? '#ff0000ad' : 'rgb(38, 166, 154)'
    });

    var layout = {
        autosize: true,
        margin: {
            t:0,
            l:50,
            r:50,
            pad: 0
        },
        automargin: true,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            showgrid: false,
            showline: true,
            color: "gray",
            rangemode: 'tozero',
            range: [-0.5, 30]
        },
        yaxis2: {
            showgrid: false,
            showline: true,
            rangemode: 'tozero',
            color: "gray",
            title: {
                text: 'No. of Mentions',
                font: {
                    size: 12,
                }
            },
            side: 'right'
        },
        yaxis: {
            showgrid: false,
            showline: true,
            rangemode: 'tozero',
            title: {
                text: 'Sentiment',
                font: {
                    size: 12,
                }
            },
            color: "gray",
        },
        legend: {
            x: 0.5,
            xanchor: 'center',
            y: 1.1,
            orientation: 'h',
        },
    };

    var data = [trace2, trace1]
    Plotly.newPlot('sentiment_chart', data, layout, {displayModeBar: false, showTips: false, responsive: true});
}

function load_trending_chart(table_index, graph_id, color) {
    tr = document.getElementsByTagName("table")[table_index].querySelectorAll("tr")
    ticker_list = [], mentions_list = [];

    for (i=19; i>0; i--) {
        td = tr[i].querySelectorAll("td")
        ticker_list.push(td[1].innerHTML)
        mentions_list.push(td[2].innerHTML)
    }

    var trace1 = {
        x: mentions_list,
        y: ticker_list,
        name: 'Calls',
        marker: {
            color: color,
        },
        hovertemplate:
                `<b>$%{y}</b><br>` +
                "Mentions: %{x}<br>" +
                "<extra></extra>",
        type: 'bar',
        orientation: 'h'
    };

    var layout = {
        barmode: 'stack',
        autosize: true,
        margin: {
            t:0,
            l:50,
            r:20,
            pad: 0
        },
        automargin: true,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            showgrid: false,
            showline: true,
            fixedrange: true,
            color: "gray",
            rangemode: 'tozero',
            title: {
                text: 'No. of Mentions',
                font: {
                    size: 12,
                }
            },
        },
        yaxis: {
            showgrid: false,
            showline: true,
            rangemode: 'tozero',
            fixedrange: true,
            color: "gray",
        },
        legend: {
            x: 0.5,
            xanchor: 'center',
            y: 1.1,
            orientation: 'h',
        },
    };

    var data = [trace1]
    Plotly.newPlot(graph_id, data, layout, {displayModeBar: false, showTips: false, responsive: true});
}

function load_word_cloud(word_list){
    data = []
    for (i in word_list) {
        row = word_list[i]
        data.push({"x": row[0], "value": row[1]})
    }
    anychart.onDocumentReady(function() {
        var chart = anychart.tagCloud(data);
        chart.title().enabled(false);
        chart.angles([0])
        chart.colorRange(false);
        chart.container("word_cloud");
        chart.background().fill("transparent");
        chart.tooltip().useHtml(true);
        chart.tooltip().format(function() {
            return `<span>Mentions: ${this.getData("value")}</span>`
        });
        chart.tooltip().background().fill("gray");
        chart.draw();
    })
}

const searchTicker = (elem, table_index) =>{
let filter = elem.value.toUpperCase();
let filter_table = document.querySelectorAll("table")[table_index];
let tr = filter_table.getElementsByTagName('tr');
for (var i = 0; i < tr.length; i++){
    let td = tr[i].getElementsByTagName('td')[1];
    if(td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display="";
            }
            else {
                tr[i].style.display="none";
            }
        }
    }
}

function show_banned_words(elem) {
    if (elem.className == "hidden") {
        document.querySelector("#banned_words_div").style.removeProperty("display")
        elem.classList.remove("hidden")
        elem.innerHTML = "Hide"
    }
    else {
        document.querySelector("#banned_words_div").style.display = "none"
        elem.classList.add("hidden")
        elem.innerHTML = "To see the list of excluded words, click here."
    }
}