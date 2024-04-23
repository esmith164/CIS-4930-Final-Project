const dgram = require('dgram');
const socketIo = require('socket.io');
const net = require('net');
const PORT = 1235; // UDP multicast listener port
const MCAST_ADDR = "232.1.1.1"; // Multicast address that this server listens to
const HOST = '0.0.0.0'; // Listen on all network interfaces for UDP messages

// Create a UDP socket for listening to multicast messages
const udpClient = dgram.createSocket('udp4');
const client = new net.Socket();

udpClient.on('listening', function () {
    const address = udpClient.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    udpClient.setBroadcast(true);
    udpClient.setMulticastTTL(128);
    udpClient.addMembership(MCAST_ADDR); // Join the multicast group
});

// Socket.IO server setup
const io = require('socket.io')(3000, {
  cors: {
    origin: "http://localhost:8080", // Replace with the URL of your Vue app
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
console.log('Socket.IO server listening on port 3000');
const ipMap = {};
// Handling incoming multicast messages and forwarding them to WebSocket clients
udpClient.on('message', function (message, remote) {
    console.log('Multicast Message: From ' + remote.address + ':' + remote.port + ' - ' + message);
    io.emit('mcast_message', { message: message.toString(), remote });
    ipMap[JSON.parse(message)['Thing ID']] = remote.address;
    console.log(ipMap);
});

function sendJsonOverTCP(ipAddress, port, jsonData) {
  // Serialize JSON data to string
  const jsonString = JSON.stringify(jsonData);

  // Create a TCP client socket
  const client = new net.Socket();

  // Connect to the server
  client.connect(port, ipAddress, () => {
      console.log('Connected to server');

      // Send JSON data to the server
      client.write(jsonString);
  });

  // Handle connection errors
  client.on('error', (error) => {
      console.error('Error:', error);
      client.destroy(); // Close the client socket
  });

  // Handle incoming data from the server
  client.on('data', (data) => {
    console.log('Received from server:', data.toString());
    try {
        const res = JSON.parse(data.toString());
        console.log(res);
        if(res['Service Result'] !== 'No Output')
        {
          console.log(res['Service Result']);
          io.emit('result', res['Service Result']);
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
  });

  // Handle disconnection from the server
  client.on('close', () => {
      console.log('Connection closed');
  });
}

// Listen for new connections from clients
io.on('connection', socket => {
  console.log('New client connected');

  // Listen for messages from this client
  socket.on('client_message', (data) => {
      console.log('Message from client:', data.commands);
      data.commands.forEach(element => {
          const body = element.split(',');
          const serviceInputs = body.slice(2).join(',');
          const jsonObject = {
              "Tweet Type": "Service call",
              "Thing ID": body[0],
              "Space ID": "GatorByte",
              "Service Name": body[1],
              "Service Inputs": `(${serviceInputs})`
          };

          console.log(jsonObject);

          // Send JSON data over TCP to the corresponding IP address
          const ipAddress = ipMap[body[0]];
          const port = 6668; // Specify the port to use
          sendJsonOverTCP(ipAddress, port, jsonObject);
      });
  });

  // Optionally, handle disconnection
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});


// Binding the UDP client to the port and host
udpClient.bind(PORT, HOST);