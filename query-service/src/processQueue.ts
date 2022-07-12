import { DynamoDB } from 'aws-sdk'

const DocClient = new DynamoDB.DocumentClient()
const TABLE_NAME = process.env.TABLE_NAME 

export const handler = async (event) => {

    if(TABLE_NAME) {
        for (let record of event.Records) {
        
            console.log("Record: ", record)
    
            const recordBody = JSON.parse(record.body)
    
            console.log(recordBody)
    
            const params = {
                TableName: TABLE_NAME,
                Item: {
                    PK: `EMAIL#${recordBody.detail.email.toUpperCase()}`,
                    SK: 'PROFILE',
                    userID: recordBody.detail.userID,
                    email: recordBody.detail.email
                }
            }
    
            await DocClient.put(params).promise()
    
        }
    }
}
