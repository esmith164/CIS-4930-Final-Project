const dgram = require('dgram');
const socketIo = require('socket.io');
const PORT = 1235; // UDP multicast listener port
const MCAST_ADDR = "232.1.1.1"; // Multicast address that this server listens to
const HOST = '0.0.0.0'; // Listen on all network interfaces for UDP messages

// Create a UDP socket for listening to multicast messages
const udpClient = dgram.createSocket('udp4');

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
});console.log('Socket.IO server listening on port 3000');

// Handling incoming multicast messages and forwarding them to WebSocket clients
udpClient.on('message', function (message, remote) {
    console.log('Multicast Message: From ' + remote.address + ':' + remote.port + ' - ' + message);
    io.emit('mcast_message', { message: message.toString(), remote });
});

// Binding the UDP client to the port and host
udpClient.bind(PORT, HOST);
