console.log("RUNNING MQTT SUB");
var broker="mqtt://10.0.0.3";
var mqtt=require('mqtt');
var topic1 = "manage/con1";
var topic2 = "manage/con2";

var topic_msg = new Array(2);
var topic_num = 2;

var options={
	clientId:"viewer",
	username:"test3",
	password:"1234",
	clean:true};

var client = mqtt.connect(broker,options);
var i=0;

client.subscribe(topic1);
client.subscribe(topic2);

client.on('message',function(topic, message,packet){
	if(topic == "manage/con1"){
		topic_msg[0]=message;
		console.log("Received '"+message+"' on '"+topic1+"'");
	}

	if(topic == "manage/con2"){
		topic_msg[1]=message;
		console.log("Received '"+message+"' on '"+topic2+"'");
	}
	
});
client.on('error', function(err) {
    console.log(err);
});

var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(onRequest).listen(8888);
console.log('Server has started');
function onRequest(request, response){
	var _url = request.url;
    	var queryData = url.parse(_url, true).query;
    	var title = queryData.id;
	response.writeHead(200);
	
	var template = `
	<!doctype html>
	<html>
        <script type="text/javascript">
        setTimeout("location.reload()",500);
        </script>
	    <head>
	        <title>Viewer</title>
	        <meta charset="utf-8">
	        <style>
                body{
                    text-align: center;
                    margin: 0 auto;
                    background-color: #525C62;
                }
                footer{
                    position:absolute;
                    bottom:0;
                    width:100%;
                    height:70px;   
                    
                }
                #box{
                    position: absolute;
                    
                    width: 500px;
                    height: 500px;
                    left: 50%;
                    top: 50%;
                    
                    margin-left: -250px;
                    margin-top: -250px;
                }
                .totalbox{
                    width: 500px;
                    height: 400px;
                    margin-top: 10px;
                }
                #box0{
                    width:374px;
                    background-color: #83b633;
                    height: 70px;
                    text-align: center;
                    margin: auto auto auto auto;
                }
                #box1 {
                    float: left;
                    background-color: #20ab8e;
                    height: 170px;
                    width: 182px;
                    text-align: center;
                    margin-right: 10px;
                    margin-left: 63px;
                }
                #box2 {
                    float: left;
                    background-color: #3b6ac0;
                    height: 170px;
                    width: 182px;
                    text-align: center;
                    margin-right: 63px;
                }
                h1{
                    color: white;
                }
                h3{
                    font-size: 22px;
                    color: white;
                    letter-spacing: -0.3px;
                    font-family: "Open Sans",sans-serif,Helvetica;
                    margin-bottom: 2px;
                }
                .temp{
                    font-size: 56px;
                    margin: 0;
                    color: white;
                    letter-spacing: 0.5px;
                    font-family: "Open Sans",sans-serif,Helvetica;
                }
                .host{
                    font-size: 18px;
                    margin: 0 0;
                    color: white;
                    letter-spacing: 0.5px;
                    font-family: "Open Sans",sans-serif,Helvetica;
                }
	        </style>
	    </head>
	<body>
        <div id="box">
            <h1>냉동창고 모니터링</h1>
        <div id = "box0">
            <h3>브로커 주소</h3>
            <p class="host">${broker}</p>
        </div>
        <div class = "totalbox">
            <div id="box1">
                <h3>
                    냉동창고 1
                </h3>
                <p class="temp">${topic_msg[0]}℃</p>
            </div>
            <div id="box2">
                <h3>
                    냉동창고 2
                </h3>
                <p class="temp">${topic_msg[1]}℃</p>
            </div>
        </div>
        </div>
    </body>
    <footer>
        Copyright 2019.QBQB. All right reserved.
    </footer>
</html>
	`;
	response.end(template);
}


