import { DynamoDB, EventBridge } from 'aws-sdk'

const eventBus = new EventBridge()
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME 


export const publishEvent = function (
    EVENT_BUS_NAME: string,
    data: any
) {
    const params = {
        Entries: [
            {
                EventBusName: EVENT_BUS_NAME,
                Source: `control.service`,
                DetailType: `something.detail`,
                Detail: JSON.stringify(data)
            },
        ],
    }

    return params
}


export const handler = async (event) => {
    if (EVENT_BUS_NAME) {
        for (let record of event.Records) {
            const unmarshalled = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
            
            console.log("Unmarshalled Data: ", unmarshalled)

            const paramsEvent = publishEvent(EVENT_BUS_NAME, unmarshalled)

            try {
                    const eventResp = await eventBus.putEvents(paramsEvent).promise()
                    console.log("EventBridge response: ", eventResp)
            } catch (err) {
                    console.error("Error writing to EventBridge: ", err)
            }
        }
    }
}
