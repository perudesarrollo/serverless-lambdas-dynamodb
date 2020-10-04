'use strict';
const dynamoDB = require('./../db/dynamodb');
const USERS_TABLE = process.env.USERS_TABLE;

class PersonaModel {
    static Listar = async item => {
        try {
            const params = {
                TableName: USERS_TABLE
            };

            const data = await dynamoDB.get(params)
            return data
        } catch (error) {
            throw error
        }
    }

    static Guardar = async item => {

        try {

            const params = {
                TableName: USERS_TABLE,
                Item: item
            };

            const existe = await PersonaModel.BuscarNombre(item.name)
            if (existe.Count <= 0) {
                await dynamoDB.set(params);
                return item
            }

            return false

        } catch (error) {
            throw error
        }
    }

    // PersonaModel.BuscarNombre("Luke Skywalker")
    static BuscarNombre = async value => {
        try {
            const params = {
                TableName: USERS_TABLE,
                FilterExpression: "#name = :nameValue",
                ExpressionAttributeNames: {
                    "#name": "name"
                },
                ExpressionAttributeValues: {
                    ":nameValue": value
                }
            }

            const data = await dynamoDB.get(params)
            return data
        } catch (error) {
            throw error
        }
    }

    // PersonaModel.BuscarId('b43c5050-063f-11eb-be0c-f7a4768fe3d8')
    static BuscarId = async value => {
        try {
            const params = {
                TableName: USERS_TABLE,
                FilterExpression: "#id = :idValue",
                ExpressionAttributeNames: {
                    "#id": "id"
                },
                ExpressionAttributeValues: {
                    ":idValue": value
                }
            }

            const data = await dynamoDB.get(params)
            return data
        } catch (error) {
            throw error
        }
    }

    static Eliminar = async value => {

        try {
            const existe = await PersonaModel.BuscarId(value);
            if (existe.Count <= 0) {
                throw 'item no se encuentra en los registros'
            }

            const params = {
                TableName: USERS_TABLE,
                Key: {
                    id: existe.Items[0].id,
                    name: existe.Items[0].name
                }
            }
            const data = await dynamoDB.del(params)
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = PersonaModel;