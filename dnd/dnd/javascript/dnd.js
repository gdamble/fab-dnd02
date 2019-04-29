//const { EnclaveFactory } = require('./enclave')
//const { SawtoothClientFactory } = require('./sawtooth-client')


//const env = require('./env')
//const input = require('./input')
var readline = require('readline-sync');

//const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))
var dndPortal = require('./DNDPortal');

console.log("Opted Service is:-", dndPortal.serviceoptions)

var mobilenumber;
var serviceprovider;
var servicearea;
var preference;
var status;
var activationdate;

	mobilenumber = readline.question("Enter the Mobile number: ");

	 var optedService=dndPortal.serviceoptions;

	var query = require('./query');
	var b=query.queryMobileNumberIsExist(mobilenumber,optedService);
	console.log(" .....................mobile number already exist............................. "+b);


	 

	console.log("Service Providers")
	console.log("======= =========")
    console.log("1. Airtel")
    console.log("2. Jio")
    console.log("3. Bsnl")
    console.log("4. Idea")
    console.log("5. Vadofone")
    var option=readline.question("Select your service provider from 1 to 5 \n");
    switch(option){
    case '1':
    	serviceprovider="Airtel";
    	break;
    case '2':
    	serviceprovider="Jio";
    	break;
    case '3':
    	serviceprovider="Bsnl";
    	break;
    case '4':
    	serviceprovider="Idea";
    	break;
    case '5':
    	serviceprovider="Vadofone";
    	break;
    default:
    	console.log("invalid option")
    	break;
    }
    
    servicearea=readline.question("Enter the Service Area: ");
    
      
    switch(dndPortal.serviceoptions - 1) {
     case 0:	 
        preference="No call and SMS"
        status="Active"
        activationdate=Date()
        break;
     case 1:
    	preference="partial"
    	status="Active"
    	activationdate=Date()
    	break;
     case 2:
    	preference="checkstatus"
    	status=""
    	activationdate=Date()
        var query = require('./query');
        query.queryMobileNumber(mobilenumber);
    	break;
     case 3:
    	preference="partial"
    	status="De-Active"
    	activationdate=Date()
    	break;
     case 4:
    	break;
     default:
		console.log("Invalid option")
//                console.log(dndPortal.serviceoptions)
}

const newPayload = {
//		 Mobilenumber:mobilenumber,
		 Serviceprovider: serviceprovider,
		 Servicearea: servicearea,
		 Preference:preference,
		 Status:status,
		 Activationdate:activationdate
 }

// Display user input in console log.
//console.log("user input "+newPayload);
console.log("JSON request "+JSON.stringify(newPayload));


var mobNum = require('./invoke');
mobNum.createMobileNumber(mobilenumber, serviceprovider, servicearea, preference, status, activationdate);


/*const walletClient = SawtoothClientFactory({
	  enclave: enclave,
	  restApiUrl: env.restApiUrl
	})

	const walletTransactor = walletClient.newTransactor({
	  familyName: env.familyName,
	  familyVersion: env.familyVersion
	})

if (input.payloadIsValid(newPayload)) {
	console.log("Valid payload is getting submitted... "+newPayload)
	input.submitPayload(newPayload, walletTransactor)
} else {
	console.log(`Oops! Your payload failed validation and was not submitted.`)
}*/

