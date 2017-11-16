const child_process = require('child_process');
const fs = require('fs');

console.log('im inside c.js');
fs.writeFileSync('output.json','','UTF-8');

let output = child_process.exec('C:\\Program" "Files\\Wireshark\\tshark.exe -r sout -T json -e tcp.port -e udp.port > output.json');