const child_process = require('child_process');
const fs = require('fs');

console.log('im inside c.js');
fs.writeFileSync('output.json','','UTF-8');

let output = child_process.spawn('C:\\Program Files\\Wireshark\\tshark.exe', 
	['-r', 'sout','-T','json','-e','tcp.port','-e','udp.port']);

output.stdout.on('data',(data) =>
        {
            //console.log(data);

            fs.appendFile("output.json", data, 'UTF-8', function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        }
    );