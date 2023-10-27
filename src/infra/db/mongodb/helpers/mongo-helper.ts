import { Collection, MongoClient } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  buildAccountFromData (accountData: AddAccountModel, insertedId: any): AccountModel {
    return { ...accountData, id: insertedId.toString() }
  }
}
