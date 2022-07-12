import { DynamoDB } from 'aws-sdk'

export const handler = async (event) => {

    for (let record of event.Records) {
        
        console.log("Record: ", record)

    }

}
