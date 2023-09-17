//require("socket.io");
//require("twitter");

module.exports={


    removeSocketClients : function (stream, socket, MultipleClients) {
        for (let i = 0; i < MultipleClients.length; i++) {
            if (typeof(MultipleClients[i].socketId) === 'undefined') {
                console.log("socket id is not valid");
            }
            else if (MultipleClients[i].socketId === socket.id) {
                MultipleClients.splice(i, 1);
                console.log("socket id: " + socket.id + " disconnected");
            }
        }
        removeStreamingSockets(stream, socket);
        return MultipleClients;
    },

    getCurrentSocket : function (MultipleClients, socket, searchKeyword) {
        //find the current socket
        var currentSocket=-1;
        for(let i=0;i<MultipleClients.length;i++)
        {
            if(typeof(MultipleClients[i].socketId) === 'undefined')
            {
                console.log("socket id is not valid");
            }
            //remove and socket
            else if(MultipleClients[i].socketId === socket.id && MultipleClients[i].searchTerm === searchKeyword)
            {
                currentSocket=i;
            }
        }
        return currentSocket;
    },

    getLatestSocket : function (MultipleClients, socket) {
        //find the current socket
        var latestSocket=0;
        for(let i=0;i<MultipleClients.length;i++)
        {
            if(typeof(MultipleClients[i].socketId) === 'undefined')
            {
                console.log("socket id is not valid");
            }
            else if(MultipleClients[i].socketId === socket.id)
            {
                latestSocket=i;
            }
        }
        return latestSocket;
    },

    allowOnlyOneKeyword : function (MultipleClients, socket, searchKeyword) {
        for(let i=0;i<MultipleClients.length;i++)
        {
            if(typeof(MultipleClients[i].socketId) === 'undefined')
            {
                console.log("socket id is not valid");
            }
            else if(MultipleClients[i].socketId === socket.id && MultipleClients[i].searchTerm !== searchKeyword)
            {
                MultipleClients.splice(i, 1);
            }
        }
        return MultipleClients;
    },

    samekeywordDifferentSockets : function (MultipleClients, searchKeyword) {
        var MinimumNoDuplication=0;
        for(let i=0;i<MultipleClients.length;i++)
        {
            if(typeof(MultipleClients[i].socketId) === 'undefined')
            {
                console.log("socket id is not valid");
            }
            else if(MultipleClients[i].searchTerm === searchKeyword)
            {
                MinimumNoDuplication=i;
                break;
            }
        }
        return MinimumNoDuplication;
    }


};


function removeStreamingSockets(stream, socket) {
    try {
        stream.destroy();
        socket.destroy();
    } catch (TypeError) {
        console.log("socket is already disconnected.");
    }
}