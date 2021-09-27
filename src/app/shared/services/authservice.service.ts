import { Injectable } from '@angular/core';
import { TableClient, AzureSASCredential } from '@azure/data-tables';
import { DefaultAzureCredential } from '@azure/identity'
import { table } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }


  account = 'testspacestorageaccount2'
  sas = '?sv=2020-08-04&ss=t&srt=sco&sp=rwdlacu&se=2021-09-24T08:45:56Z&st=2021-09-24T00:45:56Z&spr=https,http&sig=4zw7DVwr3bwLK5Ur8%2BnDbHdBriaqxpneLZUaZY%2FzAAM%3D'
  tableName = 'TestTable'

  serviceClient = new TableClient(
    `https://${this.account}.table.core.windows.net`,
    this.tableName,
    new AzureSASCredential(this.sas)
  )

  async addEntity() {
    const testEntity = {
      partitionKey: 'P2',
      rowKey: 'R2',
      name: 'Matt',
      location: 'NC',
      favoriteColor: 'blue'
    };
    await this.serviceClient.createEntity(testEntity);
  }

  async readEntities() {
    let entitiesIter = this.serviceClient.listEntities();
    let i = 1;
    for await (const entity of entitiesIter) {
      console.log(`Entity${i}: PartitionKey: ${entity.partitionKey} Row Key: ${entity.rowKey} Name: ${entity.name}`)
    }
  }
}
