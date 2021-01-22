import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Settings {
  id: number,
  name_1: string,
  name_2: string,
  ip: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  configData = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'nexgen.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http.get('assets/db/nexgen.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadConfig();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getConfig(): Observable<Settings[]> {
    return this.configData.asObservable();
  }

  addConfig(name_1, name_2, ip) {
    let data = [name_1, name_2, ip];
    return this.database.executeSql('INSERT INTO config (name_1, name_2, ip) VALUES (?, ?, ?)', data).then(data => {
      this.loadConfig();
    });
  }


  loadConfig() {
    return this.database.executeSql('SELECT * FROM config', []).then(data => {
      let config: Settings[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          config.push({
            id: data.rows.item(i).id,
            name_1: data.rows.item(i).name_1,
            name_2: data.rows.item(i).name_2,
            ip: data.rows.item(i).ip
          });
        }
      }
      console.log(config);
      this.configData.next(config);
    });
  }
}
