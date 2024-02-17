const { Socket } = require('socket.io');

const io = require('socket.io')(8000, {cors:{origin:"*"}});

let totalVotes = 0;
let votingPolls = {
    'dont-like': 0,
    'like': 0,
}

io.on('connection',socket =>{

    //send current data of votes to user when visited the site
    socket.emit('update',{votingPolls,totalVotes})
    
    socket.on('send-vote', voteTo =>{
        totalVotes +=1;
        console.log(voteTo);
        votingPolls[voteTo] +=1;
        socket.broadcast.emit('receive-vote',{votingPolls,totalVotes});
        socket.emit('update',{votingPolls,totalVotes})
    })
})