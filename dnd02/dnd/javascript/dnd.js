//const { EnclaveFactory } = require('./enclave')
//const { SawtoothClientFactory } = require('./sawtooth-client')


//const env = require('./env')
//const input = require('./input')
try {
    var readline = require('readline-sync');

    //const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))
    var dndPortal = require('./DNDPortal');

    var serviceOption = dndPortal.serviceoptions.toString()[0];
    console.log("Opted Service is:-", serviceOption);

    var mobilenumber;
    var serviceprovider;
    var servicearea;
    var preference;
    var status;
    var activationdate;
    var optedServices;

    mobilenumber = readline.question("Enter the Mobile number: ");
    //  Govind
    //	var b=query.queryMobileNumberExist(mobilenumber);
    //	console.log(" .....................mobile number already exist............................. "+b);
    //
    var query = require('./query');
    var Q = require('q');
    var Display_promise = Q.denodeify(query.queryMobileNumber);


    query.queryMobileNumber(mobilenumber)
        .then(function (result) {
            if ((result.toString() == "\"\"") && (serviceOption == '3')) {
                console.log('The Mobile Number Does Not Exist');
            }
            else {
                if (serviceOption == '3') {
                    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                }
                /*                    console.log(JSON.parse(result.toString()));
                                    console.log("--------------------------------------");
                                    var jsonResult = JSON.parse(result.toString());
                                    console.log(JSON.parse(jsonResult)['status']);
                                    var actDate = jsonResult['status'];
                                    console.log(actDate);
                                    console.log("--------------------------------------");
                */
                else {

                    console.log("Service Providers")
                    console.log("======= =========")
                    console.log("1. Airtel")
                    console.log("2. Jio")
                    console.log("3. Bsnl")
                    console.log("4. Idea")
                    console.log("5. Vadofone")
                    var option = readline.question("Select your service provider from 1 to 5 \n");
                    switch (option) {
                        case '1':
                            serviceprovider = "Airtel";
                            break;
                        case '2':
                            serviceprovider = "Jio";
                            break;
                        case '3':
                            serviceprovider = "Bsnl";
                            break;
                        case '4':
                            serviceprovider = "Idea";
                            break;
                        case '5':
                            serviceprovider = "Vadofone";
                            break;
                        default:
                            console.log("invalid option")
                            break;
                    }

                    servicearea = readline.question("Enter the Service Area: ");


                    switch (serviceOption - 1) {
                        case 0:
                            preference = "No call and SMS";
                            status = "Active";
                            activationdate = Date();
                            optedServices = "1234567";
                            break;
                        case 1:
                            preference = "partial"
                            status = "Active"
                            activationdate = Date();

                            if (result.toString() == "\"\"") {
                                var optedServices1 = "";
                            } else {
                                var optedServices1 = JSON.parse(JSON.parse(result.toString()))['optedServices'];
                            }
//                            console.log("----------------")
                            console.log(optedServices1);
                            var optedServices2 = dndPortal.serviceoptions.substring(1);
                            console.log(optedServices2);

                            var union = [...new Set([...optedServices1, ...optedServices2])];
                            console.log(union);
                            //                            optedServices = sortString(optedServices);
                            union = union.join('');
                            optedServices = sortString(union);
                            console.log('Opted Services: ' + optedServices);
                            break;
                        case 2:/*
                            preference = "checkstatus";
                            status = JSON.parse(result.toString())['status'];
                            activationdate = Date();*/
                            //                preference="checkstatus"
                            //                status=""
                            //                activationdate=Date()
                            //                var query = require('./query');
                            //                query.queryMobileNumber(mobilenumber);
                            break;
                        case 3:
                            preference = "partial"
                            status = "De-Active"
                            activationdate = Date()

                            if (result.toString() == "\"\"") {
//                                var optedServices1 = new Set(JSON.parse(""));
                                console.log("This Mobile Number is NOT Registered for DND");
                                process.exit();
                            } else {
                                var optedServices1 = new Set(JSON.parse(JSON.parse(result.toString()))['optedServices']);
                            }
//                            var optedServices1 = new Set(JSON.parse(JSON.parse(result.toString()))['optedServices']);
                            console.log(optedServices1);
                            optedServices2 = new Set(dndPortal.serviceoptions.substring(1));
                            console.log(optedServices2);

                            var difference1 = new Set([...optedServices1].filter(x => !optedServices2.has(x)));
                            var difference2 = new Set([...optedServices2].filter(x => !optedServices1.has(x)));
                            var union = [...new Set([...difference1, ...difference2])];
                            console.log(union);
                            //                            optedServices = sortString(optedServices);
                            union = union.join('');
                            console.log(union);
                            optedServices = sortString(union);
                            console.log('Opted Services: ' + optedServices);
                            break;
                        case 4:
                            break;
                        default:
                            console.log("Invalid option")
                        //                  console.log(dndPortal.serviceoptions)
                    }

                    const newPayload = {
                        //          Mobilenumber:mobilenumber,
                        Serviceprovider: serviceprovider,
                        Servicearea: servicearea,
                        Preference: preference,
                        Status: status,
                        Activationdate: activationdate,
                        Optedservices: optedServices
                    }

                    // Display user input in console log.
                    //console.log("user input "+newPayload);
                    console.log("JSON request " + JSON.stringify(newPayload));


                    var mobNum = require('./invoke');
                    mobNum.createMobileNumber(mobilenumber, serviceprovider, servicearea, preference, status, activationdate, optedServices);
                }
            }

            /*
                             console.log(result.Serviceprovider.toString());
                             serviceprovider = jsonResult.Serviceprovider;
                             servicearea = jsonResult.Servicearea;
                             status = jsonResult.Status;
            
                             const newPayload = {
                             Serviceprovider: serviceprovider,
                             Servicearea: servicearea,
                             Preference:preference,
                             Status:status,
                             Activationdate:activationdate
                             }
            
                             // Display user input in console log.
                             //console.log("user input "+newPayload);
                             console.log("----JSON request "+JSON.stringify(newPayload));
            
                             var mobNum = require('./invoke');
                             mobNum.createMobileNumber(mobilenumber, serviceprovider, servicearea, preference, status, activationdate);*/
        })
        .catch(e => console.log(`.catch(${e})` + '********************************************'));

} catch (e) {
    console.error(`try/catch(${e})`);
}

function sortString(str) {
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

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

