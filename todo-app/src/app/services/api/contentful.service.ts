import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { createClient, ContentfulClientApi, Entry } from 'contentful';
import * as contentful from 'contentful-management';
import { Space } from 'contentful-management/types';

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {
  private management_access_token = 'CFPAT-VRlxnQE0ShLZlgXGUMkSzFSn2Df24VIuwMTL1NOoqwI';

  private readonly CONFIG = {
    space: 'xrengt4bvmur',
    accessToken:
      'sOrYEpWYJt8v9fuB-2mkbKkKXyaX5hCsR2j-2G8uOQE',

    contentTypeIds: {
      todoItem: 'todoItem',
    },
  };

  private deliveryClient = createClient({
    space: this.CONFIG.space,
    accessToken: this.CONFIG.accessToken
  })

  private managementClient = contentful.createClient({
    space: this.CONFIG.space,
    accessToken: this.management_access_token
  })

   //todo set item type
  getItem(id: string): Observable<Entry<any>> {
    return fromPromise(this.deliveryClient.getEntry(id));
  }
  getItems(): Observable<Entry<any>[]> {
    return fromPromise(this.deliveryClient.getEntries(Object.assign({
      content_type: this.CONFIG.contentTypeIds.todoItem
    })).then(res => res.items));
  }
  createItem(description: string){
    return fromPromise(this.managementClient.getSpace(this.CONFIG.space)

      .then(
        (space: Space) =>  space.getEnvironment('master')
      )
      .then((environment) => environment.createEntry(this.CONFIG.contentTypeIds.todoItem,  {
        fields: {
          description: {
            'en-US': description
          }
        }
      }))
      .then((entry) => entry.publish())
      .then((entry) => console.log(entry))
      .catch(console.error))
  }
  deleteItem(id: string){
    return fromPromise(this.managementClient.getSpace(this.CONFIG.space)

      .then(
        (space: Space) =>  space.getEnvironment('master')
      )
      .then((environment) => environment.getEntry(id))
      .then((entry) => entry.unpublish())
      .then((entry) => entry.delete())
      .then((entry) => console.log(entry))
      .catch(console.error))
  }

  updateItem(id: string, description: string){
    return fromPromise(this.managementClient.getSpace(this.CONFIG.space)
      .then(
        (space: Space) =>  space.getEnvironment('master')
      )
      .then((space) => space.getEntry(id))
      .then((entry) => {
        entry.fields.description = {
          'en-US': description
        }
        return entry.update()
      })
      .then((entry) => entry.publish())
      .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
      .catch(console.error))
  }

  setItemDone(id: string, isDone: boolean){
    return fromPromise(this.managementClient.getSpace(this.CONFIG.space)
      .then(
        (space: Space) =>  space.getEnvironment('master')
      )
      .then((space) => space.getEntry(id))
      .then((entry) => {
        entry.fields.isDone = {
          'en-US': isDone
        }
        return entry.update()
      })
      .then((entry) => entry.publish())
      .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
      .catch(console.error))
  }
}
