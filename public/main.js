const form = document.getElementById('vote-form');

//form submit event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
});

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data=> {
    const votes = data.votes;
    const totalVotes = votes.length;
    //const vote points - accumulador/cuurent value
   
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0)+ parseInt(vote.points)), acc), {});
    let dataPoints = [
        {label: 'Evito', y: voteCounts.Evito},
        {label: 'Mesa', y: voteCounts.Mesa},
        {label: 'Ortiz', y: voteCounts.Ortiz},
        {label: 'Otro', y: voteCounts.Other},
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    if(chartContainer){
        //listen for event.
        document.addEventListener('votesAdded', function (e){
            document.querySelector('#charTitle').textContent= `Total Votes: ${e.detail.totalVotes}`;
        });
        const chart = new CanvasJS.Chart('chartContainer',{
            animationEnabled: true,
            theme: 'theme1',
            title:{
                text: `Total Votes ${totalVotes}`
            },
            data:[
                {
                type: 'column',
                dataPoints: dataPoints
                }
            ]
        });
        chart.render();
    
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('cdc0209ebdb93405e413', {
          cluster: 'us2',
          forceTLS: true
        });
    
        var channel = pusher.subscribe('os-poll');
        channel.bind('os-vote', function(data) {
          dataPoints = dataPoints.map(x => {
              if(x.label == data.os){
                  x.y += data.points;
                  return x;
              }else{
                  return x;
              }
          });
          chart.render();
        });
    }
});

